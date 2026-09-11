import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { ShieldCheck, MapPin, AlertTriangle, Users, Navigation, ArrowLeft, ArrowRight, Camera, Server, RefreshCw } from 'lucide-react';

interface GuardSystemProps {
  setRoute: (route: PageRoute) => void;
}

export const ProjectGuardSystem: React.FC<GuardSystemProps> = ({ setRoute }) => {
  const mapCanvasRef = useRef<HTMLDivElement>(null);
  const [selectedGuard, setSelectedGuard] = useState<number>(1);
  const [alertTriggered, setAlertTriggered] = useState<boolean>(false);

  // 3D City & Geo-fence Operational Map
  useEffect(() => {
    const container = mapCanvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121110, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ground Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0xB08C57, 0x2A2723);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Procedural Low-Poly 3D City Buildings
    const cityGroup = new THREE.Group();
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x1A1816,
      metalness: 0.8,
      roughness: 0.3
    });

    const buildingCoords = [
      [-1.5, -1.5, 0.8, 1.4],
      [1.5, -1.5, 1.0, 2.0],
      [-1.5, 1.5, 1.2, 1.8],
      [1.8, 1.2, 0.9, 1.5],
      [-2.8, 0, 0.7, 1.2],
      [2.8, 0, 0.8, 1.6],
    ];

    buildingCoords.forEach(([x, z, w, h]) => {
      const bGeo = new THREE.BoxGeometry(w, h, w);
      const bMesh = new THREE.Mesh(bGeo, buildingMat);
      bMesh.position.set(x, h / 2, z);
      cityGroup.add(bMesh);

      // Rooftop edge line
      const edges = new THREE.EdgesGeometry(bGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xB08C57, transparent: true, opacity: 0.3 });
      const wire = new THREE.LineSegments(edges, lineMat);
      wire.position.copy(bMesh.position);
      cityGroup.add(wire);
    });

    scene.add(cityGroup);

    // 3D Geo-Fence Boundary (Luminous Cylindrical Barrier)
    const fenceRadius = 2.2;
    const fenceGeo = new THREE.CylinderGeometry(fenceRadius, fenceRadius, 0.8, 32, 1, true);
    const fenceMat = new THREE.MeshBasicMaterial({
      color: 0x47949B,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const fence = new THREE.Mesh(fenceGeo, fenceMat);
    fence.position.y = 0.4;
    scene.add(fence);

    // Top ring of geofence
    const ringGeo = new THREE.RingGeometry(fenceRadius - 0.02, fenceRadius + 0.02, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x47949B, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.8;
    scene.add(ring);

    // Dynamic Guard Markers (3 Guards patrolling)
    const guards: { mesh: THREE.Mesh; angle: number; speed: number; radius: number }[] = [];
    const guardColors = [0x3F8A65, 0x47949B, 0xC98F39];

    for (let i = 0; i < 3; i++) {
      const gGroup = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: guardColors[i] })
      );
      scene.add(gGroup);
      guards.push({
        mesh: gGroup,
        angle: (i * Math.PI * 2) / 3,
        speed: 0.3 + i * 0.1,
        radius: 0.8 + i * 0.5
      });
    }

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xFDFBF7, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0x1F1D1A, 1.5);
    scene.add(ambLight);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Patrol guards in realistic loops
      guards.forEach((g, idx) => {
        const curAngle = g.angle + t * g.speed * 0.4;
        const x = Math.cos(curAngle) * g.radius;
        const z = Math.sin(curAngle) * g.radius;
        g.mesh.position.set(x, 0.2 + Math.sin(t * 3 + idx) * 0.03, z);
      });

      // Camera slow orbit
      camera.position.x = Math.sin(t * 0.08) * 6;
      camera.position.z = Math.cos(t * 0.08) * 6;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PROJECT 02 // WORKFORCE TELEMETRY SYSTEM
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">HAVERSINE GEO-FENCING</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('vayushetra');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: VAYUSHETRA</span>
          </button>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 bg-espresso-900 text-bronze-300 font-mono text-[10px] font-bold border border-bronze-500/40">
            SECURITY WORKFORCE LOGISTICS
          </span>
          <span className="font-mono text-xs text-taupe-400">
            FLUTTER × NODE.JS × POSTGRESQL × REACT
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          Guard Attendance Management System
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Production-Grade Geofenced Workforce Verification & Patrol Telemetry
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Engineered for high-compliance security agencies, this system guarantees zero-proxy attendance and verifiable site coverage. Mobile field officers verify shifts using sub-meter Haversine GPS geo-fencing combined with timestamped facial camera authentication, streamed directly into a centralized React command dashboard.
        </p>
      </div>

      {/* 3D Operational Environment & Real-time Patrol Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
        {/* Left: 3D City Map Viewport (7 cols) */}
        <div className="lg:col-span-7 lab-card-dark p-4 border border-bronze-500/40 shadow-panel relative">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-bronze-400" />
              <span className="font-bold text-bronze-300">
                3D OPERATIONAL RADAR // ZONE ALPHA-04
              </span>
            </div>
            <span className="text-[10px] text-telemetry-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald animate-pulse"></span>
              3 UNITS ACTIVE IN PERIMETER
            </span>
          </div>

          <div 
            ref={mapCanvasRef} 
            className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing"
          />

          <div className="pt-3 border-t border-espresso-800 flex items-center justify-between font-mono text-[11px] text-taupe-300">
            <span>GEO-FENCE RADIUS: 250 METERS</span>
            <span className="text-telemetry-cyan font-bold">HAVERSINE RESOLUTION: ±1.2M</span>
          </div>
        </div>

        {/* Right: Operational Roster & Telemetry Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="lab-card-light p-5 border border-bronze-400/40">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
              <span className="font-bold text-bronze-600 uppercase">
                // PATROL UNIT STATUS
              </span>
              <span className="text-telemetry-emerald font-semibold">ALL GEOFENCED</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { id: 1, name: 'Officer Vikram Singh', tag: 'SECTOR A - GATE 1', status: 'VERIFIED ON-SITE', dist: '14m to hub', ping: '1s ago' },
                { id: 2, name: 'Officer Rajesh Kumar', tag: 'SECTOR B - WAREHOUSE', status: 'PATROL IN PROGRESS', dist: '68m to hub', ping: '3s ago' },
                { id: 3, name: 'Officer Amit Verma', tag: 'SECTOR C - PERIMETER', status: 'CAMERA VERIFIED', dist: '112m to hub', ping: '5s ago' },
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => {
                    labAudio.playClick();
                    setSelectedGuard(g.id);
                  }}
                  className={`p-3 border transition-all cursor-pointer ${
                    selectedGuard === g.id
                      ? 'bg-ivory-100 border-bronze-500 shadow-sm'
                      : 'bg-ivory-50 border-bronze-300/60 hover:border-bronze-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-espresso-950">{g.name}</div>
                      <div className="text-[10px] text-taupe-400 mt-0.5">{g.tag}</div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-telemetry-emerald/15 text-telemetry-emerald font-bold border border-telemetry-emerald/30">
                      {g.status}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-bronze-200/60 flex justify-between text-[10px] text-taupe-400">
                    <span>DISTANCE: {g.dist}</span>
                    <span>LAST TELEMETRY: {g.ping}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-espresso-900 text-ivory-100 border border-bronze-500/30 font-mono text-xs">
              <div className="text-bronze-300 font-bold text-[10px] uppercase mb-1">
                BREACH PROTOCOL & ENFORCEMENT
              </div>
              <p className="text-[11px] text-taupe-300 leading-relaxed font-sans">
                If an officer breaches the 250m perimeter without authorized relief, an automated WebSocket escalation alerts the dispatch manager within 400ms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-End Architectural Flow Diagram */}
      <div className="lab-card-light p-6 border border-bronze-400/40 mb-10">
        <div className="font-mono text-xs text-bronze-600 font-bold uppercase tracking-wider mb-6 pb-2 border-b border-bronze-300/40">
          // END-TO-END PIPELINE ARCHITECTURE
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
          <div className="p-3 bg-ivory-50 border border-bronze-300/60 flex flex-col justify-between">
            <span className="text-[10px] text-bronze-600 font-bold">STAGE 01</span>
            <div className="font-bold text-espresso-950 my-2">Flutter Mobile App</div>
            <p className="text-[10px] text-taupe-400">GPS geodetic telemetry + facial camera snap</p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/60 flex flex-col justify-between">
            <span className="text-[10px] text-bronze-600 font-bold">STAGE 02</span>
            <div className="font-bold text-espresso-950 my-2">Node.js API Gateway</div>
            <p className="text-[10px] text-taupe-400">Express routing, JWT security & rate limiter</p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/60 flex flex-col justify-between">
            <span className="text-[10px] text-bronze-600 font-bold">STAGE 03</span>
            <div className="font-bold text-espresso-950 my-2">Haversine Engine</div>
            <p className="text-[10px] text-taupe-400">Calculates great-circle distance to geofence hub</p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/60 flex flex-col justify-between">
            <span className="text-[10px] text-bronze-600 font-bold">STAGE 04</span>
            <div className="font-bold text-espresso-950 my-2">PostgreSQL Database</div>
            <p className="text-[10px] text-taupe-400">Indexed geo-coords, shifts & audit tamper logs</p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/60 flex flex-col justify-between">
            <span className="text-[10px] text-bronze-600 font-bold">STAGE 05</span>
            <div className="font-bold text-espresso-950 my-2">React Manager Hub</div>
            <p className="text-[10px] text-taupe-400">Live roster processing & breach notifications</p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-bronze-300/40 flex items-center justify-between">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('vayushetra');
            }}
            className="text-xs font-mono font-medium text-taupe-400 hover:text-espresso-950 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: 01. VAYUSHETRA</span>
          </button>

          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('ai-assistant');
            }}
            className="text-xs font-mono font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
          >
            <span>NEXT PROJECT: 03. AI EMPLOYEE ASSISTANT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
