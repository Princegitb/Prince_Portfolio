import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Network, Cpu, Compass, Database, BarChart2, Cloud, Wrench, ArrowRight, ArrowLeft, Layers, ExternalLink } from 'lucide-react';

interface TelemetryStackProps {
  setRoute: (route: PageRoute) => void;
}

interface TechNode {
  id: string;
  name: string;
  category: 'AI/ML' | 'Geospatial' | 'Full Stack' | 'Data Science' | 'Cloud & DevOps';
  level: string;
  description: string;
  projects: string[];
  color: number;
}

export const TelemetryStack: React.FC<TelemetryStackProps> = ({ setRoute }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);

  const techList: TechNode[] = [
    {
      id: 'xgboost',
      name: 'XGBoost & SHAP',
      category: 'AI/ML',
      level: 'Advanced Empirical',
      description: 'Gradient boosted decision trees trained on multi-spectral satellite columns and ground station AQI. Uses TreeSHAP for explainable feature attribution (R² = 0.89).',
      projects: ['Vayushetra Atmospheric Intelligence'],
      color: 0xC5A472
    },
    {
      id: 'gemini',
      name: 'Google Gemini Pro',
      category: 'AI/ML',
      level: 'Production Integration',
      description: 'Generative fallback layer for enterprise Microsoft Teams bot, resolving complex human policy queries that exceed local intent confidence thresholds.',
      projects: ['AI Employee Assistant (Dixon)'],
      color: 0x47949B
    },
    {
      id: 'wink-nlp',
      name: 'wink-nlp & Tokenizer',
      category: 'AI/ML',
      level: 'Low-Latency Local',
      description: 'Ultra-fast in-memory POS tagging, entity extraction, and intent classification running on Node.js without external cloud latency.',
      projects: ['AI Employee Assistant (Dixon)'],
      color: 0xB08C57
    },
    {
      id: 'sentinel',
      name: 'Sentinel-5P TROPOMI',
      category: 'Geospatial',
      level: 'Satellite Earth Observation',
      description: 'Ingestion of level-2 tropospheric NO₂, HCHO, and CO total columns to measure atmospheric boundary layer pollution vectors across northern India.',
      projects: ['Vayushetra Atmospheric Intelligence'],
      color: 0x47949B
    },
    {
      id: 'viirs',
      name: 'NASA VIIRS (375m)',
      category: 'Geospatial',
      level: 'Thermal Hotspot Sensor',
      description: 'Processing active fire brightness temperature data to pinpoint agricultural crop residue burning hotspots with sub-kilometer fidelity.',
      projects: ['Vayushetra Atmospheric Intelligence'],
      color: 0xB8453D
    },
    {
      id: 'haversine',
      name: 'Haversine Geodesy Engine',
      category: 'Geospatial',
      level: 'Sub-Meter Telemetry',
      description: 'Great-circle spherical trigonometry calculating field security guard distance from pre-configured site geofence vertices in real-time.',
      projects: ['Guard Attendance Management System'],
      color: 0x3F8A65
    },
    {
      id: 'react',
      name: 'React.js & Vite',
      category: 'Full Stack',
      level: 'Production Architecture',
      description: 'Component-driven state architecture, custom hooks, WebGL / Three.js canvas integration, and high-performance SPA routing.',
      projects: ['11 Towers', 'Guard Attendance', 'Vayushetra Dashboard', 'Autonomous Lab'],
      color: 0xC5A472
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      category: 'Full Stack',
      level: 'Enterprise Backend',
      description: 'Asynchronous event-driven REST APIs, Azure Bot activity turn pipelines, JWT verification, and automated microservice controllers.',
      projects: ['Dixon Teams Bot', '11 Towers', 'Guard Attendance API'],
      color: 0x3F8A65
    },
    {
      id: 'mongodb',
      name: 'MongoDB Atlas',
      category: 'Full Stack',
      level: 'Document Datastore',
      description: 'Aggregations, schema validation, and replica set deployment for enterprise personnel records and high-velocity conversation audit logs.',
      projects: ['Dixon Teams Bot'],
      color: 0x47949B
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Full Stack',
      level: 'Relational & Spatial',
      description: 'ACID-compliant relational storage for security officer shifts, roster schedules, and indexed geofence coordinates.',
      projects: ['Guard Attendance Management System'],
      color: 0xB08C57
    },
    {
      id: 'python-data',
      name: 'Python, Pandas & NumPy',
      category: 'Data Science',
      level: 'Scientific Computing',
      description: 'Matrix manipulation, statistical cleaning, time-series decomposition, and data normalization across 1,140+ tech company layoff datasets.',
      projects: ['Tech Layoffs Analytics', 'Vayushetra ML Pipeline'],
      color: 0xC5A472
    },
    {
      id: 'plotly-dash',
      name: 'Plotly Express & Dash',
      category: 'Data Science',
      level: 'Interactive Analytics',
      description: 'Reactive macroeconomic analytical dashboards with multi-dimensional filtering, KPI metric cards, and time-series plotting.',
      projects: ['Tech Layoffs Analytics'],
      color: 0x47949B
    },
    {
      id: 'azure-bot',
      name: 'Azure Bot Framework',
      category: 'Cloud & DevOps',
      level: 'Enterprise Microsoft Cloud',
      description: 'Turn context adapters, dialog states, Adaptive Card JSON schemas, and multi-tenant security configuration for Microsoft Teams bots.',
      projects: ['Dixon Teams Bot'],
      color: 0x47949B
    },
    {
      id: 'github-actions',
      name: 'GitHub Actions (CI/CD)',
      category: 'Cloud & DevOps',
      level: 'Automated Delivery',
      description: 'Multi-stage CI/CD pipelines executing linting, unit test suites, container builds, and zero-downtime deployment slots to Azure and cloud hosts.',
      projects: ['Dixon Bot Release', '11 Towers Platform'],
      color: 0xB08C57
    }
  ];

  // 3D Technical Constellation Canvas
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121110, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const constellationGroup = new THREE.Group();

    // Create 3D nodes for each tech item
    const nodeMeshes: { mesh: THREE.Mesh; tech: TechNode; pos: THREE.Vector3 }[] = [];
    const techCount = techList.length;

    techList.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / techCount);
      const theta = Math.sqrt(techCount * Math.PI) * phi;
      const radius = 3.2;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      const pos = new THREE.Vector3(x, y, z);

      const sphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        metalness: 0.8,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.copy(pos);
      constellationGroup.add(mesh);

      nodeMeshes.push({ mesh, tech, pos });
    });

    // Create inter-connecting constellation lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0xB08C57, transparent: true, opacity: 0.22 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodeMeshes.length; i++) {
      for (let j = i + 1; j < nodeMeshes.length; j++) {
        // Connect nodes in the same or complementary categories
        const dist = nodeMeshes[i].pos.distanceTo(nodeMeshes[j].pos);
        if (dist < 2.5) {
          linePositions.push(
            nodeMeshes[i].pos.x, nodeMeshes[i].pos.y, nodeMeshes[i].pos.z,
            nodeMeshes[j].pos.x, nodeMeshes[j].pos.y, nodeMeshes[j].pos.z
          );
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    constellationGroup.add(lines);

    scene.add(constellationGroup);

    // Central anchor core
    const anchorGeo = new THREE.IcosahedronGeometry(0.6, 2);
    const anchorMat = new THREE.MeshBasicMaterial({ color: 0x1A1816, wireframe: true });
    const anchor = new THREE.Mesh(anchorGeo, anchorMat);
    constellationGroup.add(anchor);

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xF6F3EC, 2.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const ambLight = new THREE.AmbientLight(0x2A2723, 1.5);
    scene.add(ambLight);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle autonomous constellation rotation
      constellationGroup.rotation.y = t * 0.12;
      constellationGroup.rotation.x = Math.sin(t * 0.08) * 0.15;

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

  const filteredTech = activeCategory === 'ALL' 
    ? techList 
    : techList.filter(t => t.category === activeCategory);

  const categories = ['ALL', 'AI/ML', 'Geospatial', 'Full Stack', 'Data Science', 'Cloud & DevOps'];

  const handleSelectTech = (tech: TechNode) => {
    labAudio.playClick();
    setSelectedTech(tech);
  };

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Archival Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            TECHNICAL MATRIX // CAPABILITY CONSTELLATION
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">INTERACTIVE 3D SYSTEM TOPOLOGY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-espresso-900 font-medium">TOTAL ACTIVE CAPABILITIES: 15</span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-emerald font-semibold">VERIFIED PRODUCTION USE</span>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-8">
        <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
          // ENGINEERING ARCHIVE
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          Telemetry & Stack Topology
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Relational Constellation Connecting Core Tooling Directly to Shipped Systems
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Technologies are not abstract badges; they are specific computational choices integrated to solve physical-digital constraints. Hover or click any node to trace how algorithms, satellite pipelines, and backend architectures synthesize into operational platforms.
        </p>
      </div>

      {/* 3D Constellation & Interactive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
        {/* Left: 3D Constellation Orbit (7 cols) */}
        <div className="lg:col-span-7 lab-card-dark p-4 border border-bronze-500/40 shadow-panel relative">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-bronze-400" />
              <span className="font-bold text-bronze-300">
                3D CAPABILITY TOPOLOGY // SPHERICAL EMBEDDING
              </span>
            </div>
            <span className="text-[10px] text-telemetry-cyan font-semibold">
              3-AXIS GYROSCOPIC ORBIT
            </span>
          </div>

          <div 
            ref={canvasRef} 
            className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing"
          />

          <div className="pt-3 border-t border-espresso-800 flex items-center justify-between font-mono text-[10px] text-taupe-400">
            <span>NODES: 15 SPECIALIZED ENGINEERING DOMAINS</span>
            <span className="text-bronze-300">INTER-NODE DISTANCE: RELATIONAL COHESION</span>
          </div>
        </div>

        {/* Right: Selected Node Telemetry Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedTech ? (
            <div className="lab-card-light p-6 border border-bronze-400/50 shadow-md">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
                <span className="px-2 py-0.5 bg-bronze-500/15 text-bronze-700 font-bold border border-bronze-500/30 text-[10px]">
                  {selectedTech.category}
                </span>
                <span className="text-telemetry-cyan font-bold">{selectedTech.level}</span>
              </div>

              <h2 className="font-display font-bold text-2xl text-espresso-950">
                {selectedTech.name}
              </h2>

              <p className="mt-3 font-sans text-xs sm:text-sm text-espresso-800 leading-relaxed">
                {selectedTech.description}
              </p>

              <div className="mt-5 pt-4 border-t border-bronze-300/40 font-mono text-xs">
                <div className="text-[10px] text-bronze-600 font-bold uppercase mb-2">
                  // CONNECTED PRODUCTION DEPLOYMENTS
                </div>
                <div className="space-y-1.5">
                  {selectedTech.projects.map((proj) => (
                    <div 
                      key={proj}
                      className="p-2 bg-ivory-50 border border-bronze-300/60 font-medium text-espresso-950 flex items-center justify-between"
                    >
                      <span>{proj}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-bronze-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="lab-card-light p-6 border border-bronze-400/40 text-center font-mono text-xs text-taupe-400 py-16">
              <Network className="w-10 h-10 text-bronze-500 mx-auto mb-3 opacity-60" />
              <div className="font-bold text-espresso-900 text-sm">SELECT ANY NODE FROM THE MATRIX</div>
              <p className="mt-1 text-[11px] max-w-xs mx-auto">
                Click a technology below to inspect its production context, mathematical application, and associated projects.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Pills & Technology Card Grid */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bronze-500/30 pb-3">
          <div className="font-mono text-xs text-bronze-600 font-bold uppercase tracking-wider">
            // FILTER BY DISCIPLINARY MATRIX:
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  labAudio.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1 text-xs border transition-all ${
                  activeCategory === cat
                    ? 'bg-espresso-900 text-bronze-300 font-bold border-bronze-500'
                    : 'bg-ivory-50 text-espresso-800 border-bronze-300 hover:border-bronze-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTech.map((tech) => (
            <div
              key={tech.id}
              onClick={() => handleSelectTech(tech)}
              className={`lab-card-light p-4 border transition-all cursor-pointer hover:border-bronze-500 ${
                selectedTech?.id === tech.id
                  ? 'border-bronze-500 bg-ivory-100 shadow-md ring-1 ring-bronze-400'
                  : 'border-bronze-300/60 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                <span className="text-bronze-600 font-bold uppercase">{tech.category}</span>
                <span className="text-taupe-400">{tech.level}</span>
              </div>

              <div className="font-display font-bold text-base text-espresso-950">
                {tech.name}
              </div>

              <p className="mt-2 text-xs font-sans text-espresso-800 line-clamp-2 leading-relaxed">
                {tech.description}
              </p>

              <div className="mt-3 pt-2 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                <span className="text-taupe-400">{tech.projects.length} System Link{tech.projects.length > 1 ? 's' : ''}</span>
                <span className="text-bronze-600 font-bold flex items-center gap-0.5">
                  INSPECT <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="lab-card-light p-4 border border-bronze-400/40 flex items-center justify-between font-mono text-xs">
        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('11-towers');
          }}
          className="text-taupe-400 hover:text-espresso-950 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS: 05. 11 TOWERS</span>
        </button>

        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('achievements');
          }}
          className="font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
        >
          <span>NEXT: ARCHIVAL ACHIEVEMENTS & RECORDS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
