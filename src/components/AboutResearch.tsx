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
      {/* Document Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PRINCE SHUKLA
          </span>
          <span className="text-bronze-400">•</span>
          <span>BACKGROUND & EDUCATION</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-espresso-900 font-medium">B.TECH AUTOMATION & ROBOTICS</span>
          <span className="text-bronze-400">•</span>
          <span className="text-telemetry-emerald font-bold">DELHI, INDIA</span>
        </div>
      </div>

      {/* Main Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Academic Credentials & Principles (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
              ABOUT ME
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mt-1">
              Hi, I'm Prince Shukla
            </h1>
            <p className="mt-2 font-mono text-sm text-bronze-600 font-semibold">
              Engineering Student in Automation & Robotics • USAR, GGSIPU
            </p>
            <p className="mt-4 font-sans text-base text-espresso-800 leading-relaxed">
              I am an engineering student pursuing my B.Tech in Automation & Robotics at the University School of Automation and Robotics (USAR), GGSIPU, New Delhi. I love software engineering and problem solving — whether that's training machine learning models on satellite data, developing enterprise chatbots, or building responsive full-stack web applications.
            </p>
            <p className="mt-2 font-sans text-sm text-espresso-700 leading-relaxed">
              Outside the classroom, I've worked as an intern at Dixon Technologies, built production applications like Vayushetra and 11 Towers, and competed in hackathons including BuildX Hackathon at NSUT (Top 5 Finalist) and Brainwave Hackathon (Top 50 nationwide).
            </p>
          </div>

          {/* Academic Card */}
          <div className="lab-card-light p-6 border border-bronze-400/40">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-bronze-300/40">
              <GraduationCap className="w-5 h-5 text-bronze-600" />
              <h2 className="font-display font-bold text-lg text-espresso-950">
                Education
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
                  Coursework & Focus: Machine Learning, Data Structures, Statistical Modeling, and Full-Stack Web Development.
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
                    CBSE Board Delhi • Science & Mathematics
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Principles Cards */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-bold">
              ENGINEERING PRINCIPLES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">01 • PRACTICAL ML</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Real-World Impact
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Building machine learning models that solve practical problems, verified against tangible data and real user needs.
                </p>
              </div>

              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">02 • CLEAN CODE</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Maintainability
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Writing clean, modular, and maintainable software with clear architecture and reliable performance under load.
                </p>
              </div>

              <div className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="text-bronze-300 font-mono text-xs font-bold">03 • RELIABILITY</div>
                <div className="font-display text-sm font-bold mt-1 text-ivory-50">
                  Resilient Systems
                </div>
                <p className="mt-2 text-xs text-taupe-300 leading-relaxed">
                  Designing responsive interfaces and robust backend pipelines with proper error handling and fallback strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Gimbal & Focus (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3D Interactive Mechanical Schematic */}
          <div className="lab-card-dark p-4 relative overflow-hidden border border-bronze-500/40 shadow-panel">
            <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-bronze-400" />
                <span className="font-bold text-bronze-300">INTERACTIVE 3D GIMBAL</span>
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
              <span>Three.js Mechanical Rig</span>
              <span className="text-telemetry-cyan font-medium">Drag to inspect</span>
            </div>
          </div>

          {/* Core Areas */}
          <div className="lab-card-light p-5 border border-bronze-400/40">
            <div className="font-mono text-xs text-bronze-600 font-bold uppercase tracking-wider mb-3">
              AREAS OF INTEREST
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-2.5 bg-ivory-50 border-l-2 border-bronze-500">
                <div className="font-bold text-espresso-950">
                  MACHINE LEARNING & DATA SCIENCE
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Predictive modeling, gradient boosting, and interactive analytics dashboards using Python, XGBoost, Pandas, and Plotly.
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border-l-2 border-telemetry-teal">
                <div className="font-bold text-espresso-950">
                  APPLIED AI & ENTERPRISE BOTS
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Conversational agents combining local NLP intent classification with Google Gemini generative models for internal workflows.
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border-l-2 border-espresso-800">
                <div className="font-bold text-espresso-950">
                  FULL-STACK WEB DEVELOPMENT
                </div>
                <div className="text-[11px] text-espresso-800 mt-1">
                  Modern React frontends, scalable Node/Express REST APIs, and database integration across MongoDB and PostgreSQL.
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
                <span>NEXT: WORK EXPERIENCE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
