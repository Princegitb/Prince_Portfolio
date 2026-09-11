import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Crosshair, Eye, Cpu, Zap, Activity } from 'lucide-react';

interface RobotViewerProps {
  onRobotClick?: () => void;
}

export const RobotViewer: React.FC<RobotViewerProps> = ({ onRobotClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [telemetry, setTelemetry] = useState({
    cursorX: 0,
    cursorY: 0,
    headPitch: '0.00°',
    headYaw: '0.00°',
    fps: 60,
    status: 'TRACKING'
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    // Warm espresso-black fog for cinematic depth
    scene.fog = new THREE.FogExp2(0x121110, 0.08);

    // 2. Camera setup - Positioned to frame the robot standing upright from feet to head
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 3.2);
    camera.lookAt(0, 1.0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting (Sophisticated warm industrial palette)
    // Key Light: Warm ivory directional light
    const keyLight = new THREE.DirectionalLight(0xF7F2E7, 2.4);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Rim Light: Antique bronze / warm gold backlight for silhouette edge definition
    const rimLight = new THREE.DirectionalLight(0xD8BE96, 3.2);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Fill Light: Soft neutral taupe fill
    const fillLight = new THREE.DirectionalLight(0x7D7265, 1.0);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    // Subtle technical cyan point light (emulating sensor/telemetry diagnostic emitter)
    const sensorLight = new THREE.PointLight(0x47949B, 2.0, 4);
    sensorLight.position.set(0, 1.6, 0.6);
    scene.add(sensorLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x23201C, 1.5);
    scene.add(ambientLight);

    // Ground platform / shadow receiver with technical laboratory ring
    const groundGeo = new THREE.PlaneGeometry(6, 6);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x121110,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle circular calibration ring on ground
    const ringGeo = new THREE.RingGeometry(0.7, 0.72, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xB08C57, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Secondary dashed calibration ring
    const ringGeo2 = new THREE.RingGeometry(1.2, 1.21, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x47949B, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.01;
    scene.add(ring2);

    // 5. Model Loading & Skeletal Tracking Variables
    let robotRoot: THREE.Group | null = null;
    let headBone: THREE.Object3D | null = null;
    let spineBone: THREE.Object3D | null = null;
    let initialHeadRot: THREE.Euler | null = null;
    let initialSpineRot: THREE.Euler | null = null;

    // Mouse coordinates in normalized space [-1, 1]
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const currentRot = { headX: 0, headY: 0, rootX: 0, rootY: 0 };

    // Texture Loader for PBR textures
    const textureLoader = new THREE.TextureLoader();
    const diffuseMap = textureLoader.load('/model/textures/diffuse.jpg');
    const normalMap = textureLoader.load('/model/textures/Normal.jpg');
    const roughnessMap = textureLoader.load('/model/textures/Roughness.jpg');
    const aoMap = textureLoader.load('/model/textures/AO.jpg');
    const emissionMap = textureLoader.load('/model/textures/emission.jpg');

    diffuseMap.colorSpace = THREE.SRGBColorSpace;
    emissionMap.colorSpace = THREE.SRGBColorSpace;

    // Outer Robot Wrapper Group for smooth upright orientation & gaze tracking
    const robotWrapper = new THREE.Group();
    scene.add(robotWrapper);
    robotRoot = robotWrapper;

    // Load FBX Model
    const loader = new FBXLoader();
    loader.load(
      '/model/Robot.fbx',
      (fbx) => {
        // Traverse meshes and bones
        fbx.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.material = new THREE.MeshStandardMaterial({
              map: diffuseMap,
              normalMap: normalMap,
              roughnessMap: roughnessMap,
              aoMap: aoMap,
              emissiveMap: emissionMap,
              emissive: new THREE.Color(0xD8BE96),
              emissiveIntensity: 0.85,
              metalness: 0.8,
              roughness: 0.35,
              envMapIntensity: 1.2,
            });
          }

          // Locate articulated joints
          const nameLower = child.name.toLowerCase();
          console.log('[FBX Node]', child.name, child.type, 'rot:', child.rotation.x.toFixed(2), child.rotation.y.toFixed(2), child.rotation.z.toFixed(2));
          if (nameLower.includes('head') && !headBone) {
            headBone = child;
            initialHeadRot = child.rotation.clone();
            console.log('[HEAD BONE FOUND]', child.name, child.type);
          } else if ((nameLower.includes('spina') || nameLower.includes('spine')) && !spineBone) {
            spineBone = child;
            initialSpineRot = child.rotation.clone();
          }
        });

        (window as any).__robotFbx = fbx;
        (window as any).__headBone = headBone;

        // Turn robot so front chest and visor face directly towards the screen (+Z)
        fbx.rotation.y = -Math.PI / 2;
        fbx.updateMatrixWorld(true);

        // Compute Bounding Box of the oriented model
        const box = new THREE.Box3().setFromObject(fbx);
        const size = new THREE.Vector3();
        box.getSize(size);

        // Scale robot so total height is ~2.0 units to gracefully frame viewport
        const targetHeight = 2.0;
        const scale = targetHeight / (size.y || 1);
        fbx.scale.setScalar(scale);
        fbx.updateMatrixWorld(true);

        // Recompute bounding box after scale
        box.setFromObject(fbx);
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center FBX precisely inside wrapper: centered on X and Z, feet resting flat at y = 0
        fbx.position.set(-center.x, -box.min.y, -center.z);

        robotWrapper.add(fbx);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.warn('FBX load failed, activating procedural laboratory kinematic robot:', error);
        // Build procedural articulated research robot if FBX fails
        const procGroup = new THREE.Group();
        
        const torsoMat = new THREE.MeshStandardMaterial({ color: 0x22201D, metalness: 0.85, roughness: 0.3 });
        const bronzeJointMat = new THREE.MeshStandardMaterial({ color: 0xB08C57, metalness: 0.9, roughness: 0.25 });
        const sensorMat = new THREE.MeshBasicMaterial({ color: 0x47949B });

        const torsoGeo = new THREE.CylinderGeometry(0.35, 0.28, 0.8, 12);
        const torso = new THREE.Mesh(torsoGeo, torsoMat);
        torso.position.y = 0.9;
        torso.castShadow = true;
        procGroup.add(torso);

        const spineGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
        const spine = new THREE.Mesh(spineGeo, bronzeJointMat);
        spine.position.y = 1.35;
        procGroup.add(spine);

        const headGeo = new THREE.BoxGeometry(0.4, 0.32, 0.38);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x1A1816, metalness: 0.8, roughness: 0.35 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.6;
        head.castShadow = true;

        const eyeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
        const eye = new THREE.Mesh(eyeGeo, sensorMat);
        eye.rotation.x = Math.PI / 2;
        eye.position.set(0, 0.02, 0.2);
        head.add(eye);

        procGroup.add(head);

        const baseGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.2, 24);
        const base = new THREE.Mesh(baseGeo, torsoMat);
        base.position.y = 0.1;
        base.castShadow = true;
        procGroup.add(base);

        robotWrapper.add(procGroup);
        setLoading(false);
      }
    );

    // Mouse Move Handler (tracks globally across full window for seamless gaze interaction)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);

      mouse.targetX = THREE.MathUtils.clamp(x, -1.0, 1.0);
      mouse.targetY = THREE.MathUtils.clamp(y, -1.0, 1.0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth, responsive interpolation towards cursor
      mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.1);
      mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.1);

      // Idle Kinematics & Subtle breathing motion
      const breathing = Math.sin(elapsed * 1.8) * 0.008;
      const scanSweep = Math.sin(elapsed * 0.3) * 0.015;

      // 1. Dynamic Head / Face Gaze Tracking (Upwards/Downwards Pitch & Left/Right Yaw)
      const targetHeadPitch = mouse.y * 0.42 + breathing;
      const targetHeadYaw = mouse.x * 0.45 + scanSweep;

      // 2. Subtle Body & Pedestal Alignment (Stays grounded & upright)
      const targetBodyYaw = mouse.x * 0.15;
      const targetBodyPitch = mouse.y * 0.04;

      currentRot.headX = THREE.MathUtils.lerp(currentRot.headX, targetHeadPitch, 0.12);
      currentRot.headY = THREE.MathUtils.lerp(currentRot.headY, targetHeadYaw, 0.12);
      currentRot.rootY = THREE.MathUtils.lerp(currentRot.rootY, targetBodyYaw, 0.08);
      currentRot.rootX = THREE.MathUtils.lerp(currentRot.rootX, targetBodyPitch, 0.08);

      // Articulate the robot's Head Bone (Face moves upwards & downwards, left & right)
      if (headBone) {
        headBone.rotation.x = currentRot.headX;
        headBone.rotation.y = currentRot.headY;
      }

      // Articulate Spine Bone for subtle natural spinal curvature
      if (spineBone) {
        spineBone.rotation.x = currentRot.headX * 0.2;
        spineBone.rotation.y = currentRot.headY * 0.2;
      }

      // Robot Wrapper: Stays standing upright on its pedestal
      if (robotWrapper) {
        robotWrapper.rotation.y = currentRot.rootY;
        robotWrapper.rotation.x = currentRot.rootX;
        robotWrapper.position.y = Math.sin(elapsed * 1.5) * 0.004;
      }

      // Rotate ground calibration rings
      ring.rotation.z = elapsed * 0.05;
      ring2.rotation.z = -elapsed * 0.03;

      // Dynamic light intensity flutter
      sensorLight.intensity = 1.8 + Math.sin(elapsed * 4) * 0.4;

      renderer.render(scene, camera);

      // Periodic Telemetry State Update
      frameCount++;
      if (frameCount % 10 === 0) {
        const now = performance.now();
        const delta = (now - lastFpsUpdate) / 1000;
        const currentFps = Math.round(10 / delta);
        lastFpsUpdate = now;

        setTelemetry({
          cursorX: parseFloat(mouse.x.toFixed(2)),
          cursorY: parseFloat(mouse.y.toFixed(2)),
          headPitch: `${(currentRot.headX * (180 / Math.PI)).toFixed(1)}°`,
          headYaw: `${(currentRot.headY * (180 / Math.PI)).toFixed(1)}°`,
          fps: Math.min(60, Math.max(30, currentFps)),
          status: Math.abs(mouse.targetX - mouse.x) > 0.08 || Math.abs(mouse.targetY - mouse.y) > 0.08 ? 'ACQUIRING' : 'LOCKED'
        });
      }
    };

    animate();

    // Responsive dynamic resize handler that tracks zoom level changes (55% to 100%+)
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      width = newWidth;
      height = newHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ResizeObserver catches zoom in/out, grid shifts, and CSS container changes instantly
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[700px] 2xl:h-[780px] 3xl:h-[860px] flex-grow bg-[#121110] border border-bronze-500/30 overflow-hidden shadow-2xl rounded-sm">
      {/* Simulation Grid Background */}
      <div className="absolute inset-0 dark-lab-grid opacity-30 pointer-events-none"></div>

      {/* Laboratory Calibration Reticle Overlays */}
      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between text-[10px] font-mono text-taupe-300 border-b border-bronze-700/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-telemetry-cyan animate-ping"></span>
            <span className="text-bronze-300 font-semibold tracking-wider">
              SIMULATION 01 // AUTONOMOUS GAZE TRACKING
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-taupe-400">KINEMATICS: <span className="text-ivory-100 font-medium">6-DOF ACTIVE</span></span>
            <span className="text-bronze-500">|</span>
            <span className="text-telemetry-cyan font-semibold">{telemetry.fps} FPS</span>
          </div>
        </div>

        {/* Center Crosshair & Calibration Targets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Subtle central target */}
          <div className="w-48 h-48 rounded-full border border-bronze-600/10 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-bronze-500/15 border-dashed animate-spin" style={{ animationDuration: '30s' }}></div>
          </div>
        </div>

        {/* Left Side Telemetry Annotations (Printed engineering style) */}
        <div className="absolute left-4 top-16 space-y-3 font-mono text-[10px] text-taupe-300 bg-espresso-950/70 p-3 border-l-2 border-bronze-500 backdrop-blur-sm pointer-events-none">
          <div className="text-bronze-400 text-[9px] uppercase tracking-widest font-bold">
            // SENSORY TELEMETRY
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">SYS STATE:</span>
              <span className="text-telemetry-cyan font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">GAZE TRACK:</span>
              <span className={`font-semibold ${telemetry.status === 'LOCKED' ? 'text-telemetry-cyan' : 'text-bronze-300'}`}>
                {telemetry.status}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">NEURAL LOAD:</span>
              <span className="text-ivory-200">38.4% NOMINAL</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">CORE TEMP:</span>
              <span className="text-ivory-200">36.8°C NORMAL</span>
            </div>
          </div>
        </div>

        {/* Right Side Kinematic Annotations */}
        <div className="absolute right-4 top-16 space-y-3 font-mono text-[10px] text-taupe-300 bg-espresso-950/70 p-3 border-r-2 border-bronze-500 backdrop-blur-sm pointer-events-none">
          <div className="text-bronze-400 text-[9px] uppercase tracking-widest font-bold">
            // JOINT KINEMATICS
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">HEAD PITCH:</span>
              <span className="text-ivory-200">{telemetry.headPitch}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">HEAD YAW:</span>
              <span className="text-ivory-200">{telemetry.headYaw}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">TARGET X/Y:</span>
              <span className="text-bronze-300">{telemetry.cursorX} / {telemetry.cursorY}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-taupe-400">SERVO LATENCY:</span>
              <span className="text-telemetry-cyan">4.2ms</span>
            </div>
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-taupe-400 border-t border-bronze-700/30 pt-2 bg-gradient-to-t from-espresso-950/90 to-transparent">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-bronze-400" />
            <span>OPTICAL VECTOR: DYNAMIC 3D POSE INTERPOLATION</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-bronze-400">
            <span>MODEL: PROTOTYPE K-VRC // 05719052024</span>
            <span>|</span>
            <span className="text-taupe-300">INTERACTION: MOUSE-GAZE SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* Loading Screen Indicator */}
      {loading && (
        <div className="absolute inset-0 bg-espresso-950 flex flex-col items-center justify-center gap-3 text-ivory-100 font-mono z-20">
          <div className="w-12 h-12 border-2 border-bronze-500/30 border-t-bronze-400 rounded-full animate-spin"></div>
          <div className="text-xs text-bronze-300 tracking-widest uppercase">
            INITIALIZING 3D KINEMATICS MATRIX... {loadProgress > 0 ? `${loadProgress}%` : ''}
          </div>
          <div className="text-[10px] text-taupe-400">
            COMPUTING PBR METALLIC SHADERS & RIGGED JOINT HIERARCHY
          </div>
        </div>
      )}

      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        onClick={onRobotClick}
        className="w-full h-full cursor-crosshair"
      />
    </div>
  );
};
