import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { BookOpen, GraduationCap, Compass, Cpu, Wrench, Shield, ArrowRight, Layers, FileText } from 'lucide-react';

interface AboutResearchProps {
  setRoute: (route: PageRoute) => void;
}

export const AboutResearch: React.FC<AboutResearchProps> = ({ setRoute }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(true);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Build interactive 3D mechanical gimbal / robotic joint schematic
    const gimbalGroup = new THREE.Group();

    // Outer Ring
    const outerTorusGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 100);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xB08C57,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: wireframe
    });
    const outerRing = new THREE.Mesh(outerTorusGeo, outerMat);
    gimbalGroup.add(outerRing);

    // Middle Ring
    const midTorusGeo = new THREE.TorusGeometry(1.2, 0.03, 16, 80);
    const midMat = new THREE.MeshStandardMaterial({
      color: 0x47949B,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: wireframe
    });
    const midRing = new THREE.Mesh(midTorusGeo, midMat);
    gimbalGroup.add(midRing);

    // Inner Core / Kinematic Hub
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1F1D1A,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: wireframe
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    gimbalGroup.add(core);

    // Articulated Axis Shafts
    const axisGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 16);
    const axisMat = new THREE.MeshStandardMaterial({ color: 0xD8BE96, metalness: 0.9, roughness: 0.2 });
    const axisX = new THREE.Mesh(axisGeo, axisMat);
    axisX.rotation.z = Math.PI / 2;
    gimbalGroup.add(axisX);

    const axisY = new THREE.Mesh(axisGeo, axisMat);
    gimbalGroup.add(axisY);

    scene.add(gimbalGroup);

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xF6F3EC, 2.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xB08C57, 2.5);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x2A2723, 1.2);
    scene.add(ambientLight);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      outerRing.rotation.x = t * 0.4;
      outerRing.rotation.y = t * 0.2;

      midRing.rotation.y = t * 0.6;
      midRing.rotation.z = t * 0.3;

      core.rotation.x = -t * 0.5;
      core.rotation.y = t * 0.8;

      gimbalGroup.rotation.y = Math.sin(t * 0.2) * 0.2;

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
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [wireframe]);

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Archive Document Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            ARCHIVAL RECORD // 05719052024-DOC
          </span>
          <span className="text-bronze-400">|</span>
          <span>CURRICULUM & RESEARCH ORIENTATION</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-espresso-900 font-medium">DISCIPLINE: AUTOMATION & ROBOTICS</span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-bold">STATUS: FILED & VERIFIED</span>
        </div>
      </div>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic Credentials & Philosophy (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
              // ENGINEERING PROFILE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mt-1">
              Autonomous Systems & Applied Intelligence
            </h1>
            <p className="mt-4 font-sans text-base text-espresso-800 leading-relaxed">
              Prince is an engineering scholar at the University School of Automation and Robotics (GGSIPU), Delhi. His work operates at the confluence of machine learning model architectures, data science analytics, and high-performance distributed software platforms.
            </p>
          </div>

          {/* Academic Dossier Card */}
          <div className="lab-card-light p-6 border border-bronze-400/40">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-bronze-300/40">
              <GraduationCap className="w-5 h-5 text-bronze-600" />
              <h2 className="font-display font-bold text-lg text-espresso-950">
                Formal Academic Foundation
              </h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-ivory-50 border border-bronze-300/50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-espresso-950 text-sm">
                      B.Tech in Automation & Robotics
                    </div>
                    <div className="text-taupe-400 text-[11px] mt-0.5">
                      University School of Automation and Robotics (USAR), GGSIPU, Delhi
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-bronze-500/15 text-bronze-700 font-semibold border border-bronze-500/30 text-[10px]">
                    2024 – 2028
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-espresso-800">
                  Focus: Machine Learning Architectures, Data Science, Statistical Modeling, and Scalable Full-Stack Systems.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-ivory-50 border border-bronze-300/50">
                  <div className="text-[10px] text-bronze-600 font-bold uppercase">
                    SENIOR SECONDARY (CLASS XII)
                  </div>
                  <div className="font-display text-2xl font-bold text-espresso-950 mt-1">
                    91% <span className="text-xs font-mono text-taupe-400">CBSE</span>
                  </div>
                  <div className="text-[10px] text-taupe-400 mt-1">
                    Rajkiya Pratibha Vikas Vidyalaya (R.P.V.V), Delhi • 2024
                  </div>
                </div>

                <div className="p-3 bg-ivory-50 border border-bronze-300/50">
                  <div className="text-[10px] text-bronze-600 font-bold uppercase">
                    SECONDARY SCHOOL (CLASS X)
                  </div>
                  <div className="font-display text-2xl font-bold text-espresso-950 mt-1">
                    88% <span className="text-xs font-mono text-taupe-400">CBSE</span>
                  </div>
                  <div className="text-[10px] text-taupe-400 mt-1">
                    CBSE Board Delhi • Strong STEM Core
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Philosophy Cards */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-bold">
              // CORE ENGINEERING PHILOSOPHY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">01 // SYNTHESIS</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Physical-Digital Convergence
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Algorithms without physical actuators remain theoretical; robotics without cognitive neural perception is mechanical repetition.
                </p>
              </div>

              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">02 // EMPIRICISM</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Empirical Validation
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Mathematical proof verified through ground sensors and satellite telemetry (R² = 0.89 model benchmarking across 706 cells).
                </p>
              </div>

              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">03 // STABILITY</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Autonomous Reliability
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Systems engineered to sustain continuous telemetry, self-healing fallbacks (Gemini AI fallback), and 99%+ production uptime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Kinematic Gimbal & Technical Focus (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3D Interactive Mechanical Schematic */}
          <div className="lab-card-dark p-4 relative overflow-hidden border border-bronze-500/40 shadow-panel">
            <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-bronze-400" />
                <span className="font-bold text-bronze-300">KINEMATIC SCHEMATIC // 3-AXIS GIMBAL</span>
              </div>
              <button
                onClick={() => {
                  labAudio.playClick();
                  setWireframe(!wireframe);
                }}
                className="px-2 py-0.5 bg-espresso-800 border border-bronze-500/30 text-[10px] text-taupe-300 hover:text-ivory-100"
              >
                {wireframe ? 'SOLID' : 'WIREFRAME'}
              </button>
            </div>

            <div 
              ref={canvasRef} 
              className="w-full h-72 sm:h-80 cursor-grab active:cursor-grabbing"
            />

            <div className="pt-2 border-t border-espresso-800 text-[10px] font-mono text-taupe-400 flex items-center justify-between">
              <span>REAL-TIME 3D KINEMATICS ENGINE</span>
              <span className="text-telemetry-cyan font-medium">ORIENTATION: AUTONOMOUS ROTATION</span>
            </div>
          </div>

          {/* Research Focus Matrix */}
          <div className="lab-card-light p-5 border border-bronze-400/40">
            <div className="font-mono text-xs text-bronze-600 font-bold uppercase tracking-wider mb-3">
              // ACTIVE RESEARCH THRUSTS
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-2.5 bg-ivory-50 border-l-2 border-bronze-500">
                <div className="font-bold text-espresso-950">
                  GEOSPATIAL SATELLITE ML
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Integrating Sentinel-5P tropospheric column data, NASA VIIRS active thermal hotspots, and ECMWF meteorological vectors into gradient-boosted spatial forecast grids.
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border-l-2 border-telemetry-teal">
                <div className="font-bold text-espresso-950">
                  ENTERPRISE CONVERSATIONAL AUTOMATION
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Dual-tier natural language processing: rapid local intent detection via tokenization coupled with cloud-hosted generative fallback models for unconstrained queries.
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border-l-2 border-espresso-800">
                <div className="font-bold text-espresso-950">
                  HAVERSINE GEODETIC TELEMETRY
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Sub-meter boundary computation for real-time field guard verification, tamper-evident GPS telemetry, and automated operational alerting.
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-bronze-300/40 flex items-center justify-between">
              <button
                onClick={() => {
                  labAudio.playClick();
                  setRoute('experience');
                }}
                className="text-xs font-mono font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
              >
                <span>NEXT: EXPLORE DIXON EXPERIENCE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
