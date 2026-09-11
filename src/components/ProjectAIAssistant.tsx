import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Bot, Cpu, Sparkles, Database, MessageSquare, ArrowLeft, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';

interface AIAssistantProps {
  setRoute: (route: PageRoute) => void;
}

export const ProjectAIAssistant: React.FC<AIAssistantProps> = ({ setRoute }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeQuery, setActiveQuery] = useState<string>('leave-policy');
  const [pipelineState, setPipelineState] = useState<string>('IDLE');
  const [activeStage, setActiveStage] = useState<number>(0);

  // 3D Neural AI Core
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121110, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Central Cognitive Core Group
    const coreGroup = new THREE.Group();

    // Inner glowing sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 3);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1A1816,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // Glowing core nucleus
    const nucGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const nucMat = new THREE.MeshBasicMaterial({ color: 0x47949B });
    const nucleus = new THREE.Mesh(nucGeo, nucMat);
    coreGroup.add(nucleus);

    // Concentric Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(1.3, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0xB08C57, metalness: 0.9, roughness: 0.1 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.6, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xD8BE96, metalness: 0.8, roughness: 0.2 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    // Floating data particle nodes orbiting the core
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x47949B,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particles);

    scene.add(coreGroup);

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xF6F3EC, 2.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const coreLight = new THREE.PointLight(0x47949B, 3, 5);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const ambientLight = new THREE.AmbientLight(0x23201C, 1.5);
    scene.add(ambientLight);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Neural Core Rotations
      innerSphere.rotation.x = t * 0.3;
      innerSphere.rotation.y = t * 0.5;

      ring1.rotation.y = t * 0.6;
      ring1.rotation.z = Math.sin(t * 0.4) * 0.2;

      ring2.rotation.x = t * 0.4;
      ring2.rotation.y = -t * 0.5;

      particles.rotation.y = -t * 0.15;

      // Core pulse
      const pulse = Math.sin(t * 3) * 0.08;
      nucleus.scale.setScalar(1 + pulse);
      coreLight.intensity = 2.5 + pulse * 4;

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

  const queries = [
    {
      id: 'leave-policy',
      title: 'Company Medical Leave Rollover Policy',
      queryText: 'Can unused medical leaves from 2025 roll over into Q2 2026 under the new corporate health guidelines?',
      path: 'TEAMS → WINK-NLP (LOW CONFIDENCE 0.48) → GEMINI PRO FALLBACK → SYNTHESIS',
      result: 'Under Policy Section 4.2B, employees may carry forward up to 5 unused medical leave days into Q2 2026 with manager signoff.',
      intent: 'POLICY_SYNTHESIS (GEMINI LAYER)'
    },
    {
      id: 'balance',
      title: 'Personal PTO & Leave Balance Query',
      queryText: 'What is my remaining annual PTO balance for the current calendar cycle?',
      path: 'TEAMS → WINK-NLP (HIGH CONFIDENCE 0.96) → MONGODB ATLAS AGGREGATION',
      result: 'Record ID #EMP-704: 16.5 Days Annual PTO Remaining (7.5 Days Utilized in H1).',
      intent: 'DATABASE_RETRIEVAL (LOCAL INTENT)'
    },
    {
      id: 'reimbursement',
      title: 'Travel Allowance Expense Status',
      queryText: 'Check approval status on travel voucher #TR-882 submitted last Thursday.',
      path: 'TEAMS → WINK-NLP (CONFIDENCE 0.91) → MONGODB LOOKUP → STATUS NOTIFICATION',
      result: 'Voucher #TR-882: Approved by Finance on Sep 08. Disbursed in upcoming payroll cycle.',
      intent: 'WORKFLOW_CHECK (ENTERPRISE ERP)'
    }
  ];

  const currentQueryData = queries.find(q => q.id === activeQuery) || queries[0];

  const runQuerySimulation = (qId: string) => {
    labAudio.playTelemetryChime();
    setActiveQuery(qId);
    setPipelineState('PROCESSING');
    setActiveStage(1);

    setTimeout(() => setActiveStage(2), 600);
    setTimeout(() => setActiveStage(3), 1200);
    setTimeout(() => {
      setActiveStage(4);
      setPipelineState('COMPLETED');
    }, 1800);
  };

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Archival Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PROJECT 03 // ENTERPRISE AI LABORATORY
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">COGNITIVE FALLBACK INTEGRATION</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('guard-system');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: GUARD ATTENDANCE</span>
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 bg-espresso-900 text-bronze-300 font-mono text-[10px] font-bold border border-bronze-500/40">
            ENTERPRISE CONVERSATIONAL AGENT
          </span>
          <span className="font-mono text-xs text-taupe-400">
            MICROSOFT TEAMS × AZURE BOT FRAMEWORK × GEMINI AI
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          AI Employee Assistant Laboratory
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Dual-Tier Cognitive Routing & Self-Healing Natural Language Ingestion
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Developed during Prince's engineering tenure at Dixon Technologies, this AI core resolves corporate knowledge asymmetry. It blends rapid deterministic intent detection (wink-nlp) for common transactions with Google Gemini Pro as an intelligent generative fallback layer when dealing with ambiguous human queries.
        </p>
      </div>

      {/* 3D Neural Core & Live Query Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
        {/* 3D Core Viewport (7 cols) */}
        <div className="lg:col-span-7 lab-card-dark p-4 border border-bronze-500/40 shadow-panel relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-telemetry-cyan" />
              <span className="font-bold text-bronze-300">
                COGNITIVE ENGINE // DUAL-TIER NEURAL CORE
              </span>
            </div>
            <span className="text-[10px] text-telemetry-emerald font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald animate-pulse"></span>
              STATUS: {pipelineState}
            </span>
          </div>

          <div 
            ref={canvasRef} 
            className="w-full h-80 sm:h-96 relative cursor-pointer"
            onClick={() => runQuerySimulation(activeQuery)}
          />

          <div className="pt-3 border-t border-espresso-800 flex items-center justify-between font-mono text-[11px] text-taupe-300">
            <span>INTENT ENGINE: WINK-NLP TOKENIZER</span>
            <span className="text-bronze-300">FALLBACK: GEMINI PRO GENERATIVE API</span>
          </div>
        </div>

        {/* Interactive Query Dispatcher (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="lab-card-light p-5 border border-bronze-400/40">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
              <span className="font-bold text-bronze-600 uppercase">
                // SELECT TEST CONVERSATIONAL INGRESS
              </span>
              <span className="text-taupe-400 text-[10px]">CLICK TO DISPATCH</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {queries.map((q) => (
                <button
                  key={q.id}
                  onClick={() => runQuerySimulation(q.id)}
                  className={`w-full text-left p-3 border transition-all ${
                    activeQuery === q.id
                      ? 'bg-ivory-100 border-bronze-500 shadow-sm'
                      : 'bg-ivory-50 border-bronze-300/60 hover:border-bronze-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-espresso-950 text-[11px]">{q.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-bronze-500/15 text-bronze-700 font-bold border border-bronze-500/30">
                      {q.id === 'leave-policy' ? 'GEMINI FALLBACK' : 'DIRECT DB'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[10px] text-taupe-400 italic">
                    "{q.queryText}"
                  </div>
                </button>
              ))}
            </div>

            {/* Ingress Execution Result Card */}
            <div className="mt-5 p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/30 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-espresso-700/80 pb-2">
                <span className="text-bronze-300 font-bold text-[10px]">EXECUTION TRACE</span>
                <span className="text-telemetry-cyan text-[10px]">{currentQueryData.intent}</span>
              </div>

              <div>
                <span className="text-[9px] text-taupe-400 uppercase">PIPELINE TRAVERSAL:</span>
                <div className="text-[10px] text-bronze-200 mt-0.5 font-semibold">
                  {currentQueryData.path}
                </div>
              </div>

              <div>
                <span className="text-[9px] text-taupe-400 uppercase">GENERATED ADAPTIVE RESPONSE:</span>
                <div className="text-[11px] text-ivory-100 mt-0.5 font-sans leading-relaxed bg-espresso-950 p-2 border border-espresso-800">
                  {currentQueryData.result}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="lab-card-light p-4 border border-bronze-400/40 flex items-center justify-between font-mono text-xs">
        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('guard-system');
          }}
          className="text-taupe-400 hover:text-espresso-950 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS: 02. GUARD ATTENDANCE</span>
        </button>

        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('tech-layoffs');
          }}
          className="font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
        >
          <span>NEXT PROJECT: 04. TECH LAYOFFS ANALYTICS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
