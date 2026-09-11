import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Globe, Satellite, Flame, Wind, Cpu, Eye, Activity, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2, BarChart2 } from 'lucide-react';

interface VayushetraProps {
  setRoute: (route: PageRoute) => void;
}

export const ProjectVayushetra: React.FC<VayushetraProps> = ({ setRoute }) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'satellite' | 'fires' | 'grid' | 'shap'>('all');
  const [activeRegion, setActiveRegion] = useState<{ name: string; aqi: number; pm25: number; status: string }>({
    name: 'Delhi NCR',
    aqi: 176,
    pm25: 77.3,
    status: 'Moderate Advection Risk'
  });

  // 3D Earth & Satellite Orbital Visualization
  useEffect(() => {
    const container = globeRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0E0D0C, 0.05);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Earth Sphere (Procedural Sci-Fi Dark Laboratory Globe)
    const earthRadius = 1.2;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x181614,
      roughness: 0.85,
      metalness: 0.15,
      wireframe: false
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Subtle atmospheric glow shell
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.03, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x47949B,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmo);

    // Latitude & Longitude Coordinate Lines
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(earthRadius * 1.002, 24, 16));
    const wireMat = new THREE.LineBasicMaterial({ color: 0xB08C57, transparent: true, opacity: 0.18 });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    earth.add(wire);

    // India Highlight Coordinate Marker (approx latitude 28° N, longitude 77° E converted to sphere coords)
    const phi = (90 - 28.6) * (Math.PI / 180);
    const theta = (77.2 + 180) * (Math.PI / 180);
    const markerPos = new THREE.Vector3(
      -(earthRadius * 1.01 * Math.sin(phi) * Math.cos(theta)),
      earthRadius * 1.01 * Math.cos(phi),
      earthRadius * 1.01 * Math.sin(phi) * Math.sin(theta)
    );

    const markerGroup = new THREE.Group();
    markerGroup.position.copy(markerPos);

    const pinGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xC98F39 });
    const pin = new THREE.Mesh(pinGeo, pinMat);
    markerGroup.add(pin);

    // Pulsing beacon ring around Delhi/India
    const beaconGeo = new THREE.RingGeometry(0.06, 0.08, 32);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x47949B, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.lookAt(markerPos.clone().multiplyScalar(2));
    markerGroup.add(beacon);

    earth.add(markerGroup);

    // Hotspot fires (simulating Punjab/Haryana farm fires)
    const hotspotsGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const offset = new THREE.Vector3(
        markerPos.x + (Math.random() - 0.5) * 0.18,
        markerPos.y + (Math.random() - 0.5) * 0.14,
        markerPos.z + (Math.random() - 0.5) * 0.18
      ).normalize().multiplyScalar(earthRadius * 1.01);

      const fireGeo = new THREE.SphereGeometry(0.02, 12, 12);
      const fireMat = new THREE.MeshBasicMaterial({ color: 0xB8453D });
      const fire = new THREE.Mesh(fireGeo, fireMat);
      fire.position.copy(offset);
      hotspotsGroup.add(fire);
    }
    earth.add(hotspotsGroup);

    // Satellite Orbit Ring (Sentinel-5P Sun-Synchronous Orbit)
    const orbitRadius = 1.7;
    const orbitGeo = new THREE.RingGeometry(orbitRadius - 0.01, orbitRadius + 0.01, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xB08C57, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 3;
    orbit.rotation.y = Math.PI / 8;
    scene.add(orbit);

    // Orbiting Satellite Module
    const satGroup = new THREE.Group();
    const satBodyGeo = new THREE.BoxGeometry(0.08, 0.04, 0.04);
    const satBodyMat = new THREE.MeshStandardMaterial({ color: 0xD8BE96, metalness: 0.9, roughness: 0.2 });
    const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
    satGroup.add(satBody);

    // Satellite Solar Panels
    const panelGeo = new THREE.BoxGeometry(0.2, 0.005, 0.06);
    const panelMat = new THREE.MeshBasicMaterial({ color: 0x47949B });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    satGroup.add(panel);

    scene.add(satGroup);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xFDFBF7, 2.5);
    sunLight.position.set(4, 3, 5);
    scene.add(sunLight);

    const spaceLight = new THREE.AmbientLight(0x1F1D1A, 1.2);
    scene.add(spaceLight);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow realistic planetary rotation
      earth.rotation.y = elapsed * 0.08;

      // Orbiting satellite along orbit path
      const satAngle = elapsed * 0.4;
      const localX = Math.cos(satAngle) * orbitRadius;
      const localY = Math.sin(satAngle) * orbitRadius;

      // Transform along the tilted orbit plane
      satGroup.position.set(
        localX * Math.cos(Math.PI / 8) - localY * Math.sin(Math.PI / 8) * Math.cos(Math.PI / 3),
        localY * Math.sin(Math.PI / 3),
        localX * Math.sin(Math.PI / 8) + localY * Math.cos(Math.PI / 8) * Math.cos(Math.PI / 3)
      );
      satGroup.rotation.y = satAngle + Math.PI / 2;

      // Beacon pulse
      const pulse = (Math.sin(elapsed * 4) + 1) * 0.5;
      beacon.scale.setScalar(1 + pulse * 0.4);
      beaconMat.opacity = 0.8 - pulse * 0.5;

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
  }, []);

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Flagship Banner / Archival Classification */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PROJECT 01 // FLAGSHIP RESEARCH INITIATIVE
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">GEOINT ATMOSPHERIC INTELLIGENCE</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('command-center');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COMMAND CENTER</span>
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 bg-espresso-900 text-bronze-300 font-mono text-[10px] font-bold border border-bronze-500/40">
            SATELLITE AI PLATFORM
          </span>
          <span className="font-mono text-xs text-taupe-400">
            SENTINEL-5P × VIIRS × ECMWF × XGBOOST
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold text-espresso-950 tracking-tight">
          VAYUSHETRA
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          India's Atmospheric Intelligence & Stubble Fire Advection Prediction System
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Vayushetra transitions environmental governance from reactive, catastrophic city lockdowns to pre-emptive satellite intelligence. By processing Sentinel-5P tropospheric columns, NASA VIIRS 375m fire hotspots, and ECMWF atmospheric transit vectors across a 706-cell spatial partition, the system delivers 48-hour forward smoke advection projections with an empirical accuracy of R² = 0.89.
        </p>
      </div>

      {/* Interactive 3D Earth Simulation & Regional Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
        {/* Left: 3D Earth Satellite Viewport (7 cols) */}
        <div className="lg:col-span-7 lab-card-dark p-4 border border-bronze-500/40 shadow-panel relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/70 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <Satellite className="w-4 h-4 text-telemetry-cyan" />
              <span className="font-bold text-bronze-300">
                ORBITAL TELEMETRY // SENTINEL-5P TROPOMI
              </span>
            </div>
            <span className="text-[10px] text-telemetry-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald animate-pulse"></span>
              ALT: 824 KM // SUN-SYNCHRONOUS
            </span>
          </div>

          <div 
            ref={globeRef} 
            className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing"
          />

          {/* Interactive Layer Switches */}
          <div className="pt-3 border-t border-espresso-800 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <span className="text-taupe-400">DATA LAYERS:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  labAudio.playClick();
                  setActiveLayer('all');
                }}
                className={`px-2 py-1 text-[10px] border transition-all ${
                  activeLayer === 'all'
                    ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-400'
                    : 'bg-espresso-900 text-taupe-300 border-espresso-700 hover:border-bronze-500/50'
                }`}
              >
                FULL STACK
              </button>
              <button
                onClick={() => {
                  labAudio.playClick();
                  setActiveLayer('satellite');
                }}
                className={`px-2 py-1 text-[10px] border transition-all ${
                  activeLayer === 'satellite'
                    ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-400'
                    : 'bg-espresso-900 text-taupe-300 border-espresso-700 hover:border-bronze-500/50'
                }`}
              >
                SENTINEL-5P
              </button>
              <button
                onClick={() => {
                  labAudio.playClick();
                  setActiveLayer('fires');
                }}
                className={`px-2 py-1 text-[10px] border transition-all ${
                  activeLayer === 'fires'
                    ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-400'
                    : 'bg-espresso-900 text-taupe-300 border-espresso-700 hover:border-bronze-500/50'
                }`}
              >
                VIIRS HOTSPOTS
              </button>
              <button
                onClick={() => {
                  labAudio.playClick();
                  setActiveLayer('shap');
                }}
                className={`px-2 py-1 text-[10px] border transition-all ${
                  activeLayer === 'shap'
                    ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-400'
                    : 'bg-espresso-900 text-taupe-300 border-espresso-700 hover:border-bronze-500/50'
                }`}
              >
                SHAP EXPLAIN
              </button>
            </div>
          </div>
        </div>

        {/* Right: Real-time Hyperlocal Telemetry & Regional Targets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="lab-card-light p-5 border border-bronze-400/40">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
              <span className="font-bold text-bronze-600 uppercase">
                // TARGET REGION TELEMETRY
              </span>
              <span className="text-telemetry-emerald font-semibold">LIVE REFRESH</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 bg-ivory-50 border border-bronze-300/50">
                <div>
                  <span className="text-[10px] text-taupe-400 uppercase">LOCATION</span>
                  <div className="font-bold text-base text-espresso-950">{activeRegion.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-taupe-400 uppercase">PREDICTED AQI</span>
                  <div className="font-display text-2xl font-bold text-espresso-950">{activeRegion.aqi}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-ivory-50 border border-bronze-300/50">
                  <span className="text-[10px] text-taupe-400 uppercase">PM2.5 CONCENTRATION</span>
                  <div className="font-mono text-lg font-bold text-espresso-950 mt-0.5">
                    {activeRegion.pm25} <span className="text-[10px] text-taupe-400 font-normal">µg/m³</span>
                  </div>
                </div>

                <div className="p-3 bg-ivory-50 border border-bronze-300/50">
                  <span className="text-[10px] text-taupe-400 uppercase">WIND VELOCITY</span>
                  <div className="font-mono text-lg font-bold text-espresso-950 mt-0.5">
                    8.4 <span className="text-[10px] text-taupe-400 font-normal">km/h NW</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-espresso-900 text-ivory-100 border border-bronze-500/30">
                <div className="flex items-center gap-2 text-bronze-300 font-bold text-[11px] mb-1">
                  <Wind className="w-3.5 h-3.5 text-telemetry-cyan" />
                  <span>48-HOUR ADVECTION FORECAST</span>
                </div>
                <p className="text-[11px] text-taupe-300 font-sans leading-relaxed">
                  Northwesterly boundary winds transport agricultural stubble plume across the Indo-Gangetic plain. Expected peak impact window: T+36h.
                </p>
              </div>
            </div>

            {/* Quick Regional Selector */}
            <div className="mt-4 pt-3 border-t border-bronze-300/40">
              <div className="text-[10px] font-mono text-taupe-400 uppercase mb-2">
                SWITCH MONITORED ZONE:
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { name: 'Delhi NCR', aqi: 176, pm25: 77.3, status: 'Moderate Advection' },
                  { name: 'Bathinda', aqi: 122, pm25: 58.1, status: 'Hotspot Cluster' },
                  { name: 'Ludhiana', aqi: 116, pm25: 54.7, status: 'Active Inversion' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      labAudio.playClick();
                      setActiveRegion(item);
                    }}
                    className={`p-2 border text-center transition-all ${
                      activeRegion.name === item.name
                        ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-500'
                        : 'bg-ivory-50 text-espresso-900 border-bronze-300 hover:border-bronze-400'
                    }`}
                  >
                    <div className="font-semibold text-[11px] truncate">{item.name}</div>
                    <div className="text-[10px] mt-0.5">AQI {item.aqi}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production UI Evidence & Scientific Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Real Project Interface Capture 01 (6 cols) */}
        <div className="lg:col-span-6 lab-card-dark p-4 border border-bronze-500/40 shadow-panel">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/80 mb-3 text-ivory-200 font-mono text-xs">
            <span className="text-bronze-300 font-bold">PRODUCTION UI // ATMOSPHERIC OVERVIEW</span>
            <span className="text-taupe-400 text-[10px]">REAL SYSTEM ARTIFACT</span>
          </div>
          <div className="rounded overflow-hidden border border-espresso-700 group relative">
            <img
              src="/assets/vayushetra_hero.png"
              alt="Vayushetra Atmospheric Overview Interface"
              className="w-full h-auto object-cover filter contrast-105"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-taupe-300">
            Real-time environmental intelligence platform displaying pan-India satellite ingestion, active fire counts, and HCHO/PM2.5 metrics.
          </p>
        </div>

        {/* Real Project Interface Capture 02 (6 cols) */}
        <div className="lg:col-span-6 lab-card-dark p-4 border border-bronze-500/40 shadow-panel">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/80 mb-3 text-ivory-200 font-mono text-xs">
            <span className="text-bronze-300 font-bold">GEOSPATIAL MAPPING // 706-CELL PARTITION</span>
            <span className="text-taupe-400 text-[10px]">ANALYTICS ENGINE</span>
          </div>
          <div className="rounded overflow-hidden border border-espresso-700 group relative">
            <img
              src="/assets/vayushetra_map.png"
              alt="Vayushetra 706-Cell Spatial Grid and Hotspot Map"
              className="w-full h-auto object-cover filter contrast-105"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-taupe-300">
            Hyperlocal spatial grid partition covering northern agricultural belts, mapping hotspot intensity and wind advection trajectories.
          </p>
        </div>
      </div>

      {/* Machine Learning & Geospatial Specifications Matrix */}
      <div className="lab-card-light p-6 border border-bronze-400/40 mb-10">
        <div className="font-mono text-xs text-bronze-600 font-bold uppercase tracking-wider mb-4 pb-2 border-b border-bronze-300/40">
          // EMPIRICAL MACHINE LEARNING ARCHITECTURE & DATASETS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 bg-ivory-50 border border-bronze-300/40">
            <span className="text-bronze-600 font-bold text-[10px]">ALGORITHM</span>
            <div className="font-bold text-espresso-950 text-sm mt-1">XGBoost Regression</div>
            <p className="text-[11px] text-taupe-400 mt-1 leading-relaxed">
              Trained on multi-year temporal cross-validation with TreeSHAP feature attribution to prevent multicollinearity.
            </p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/40">
            <span className="text-bronze-600 font-bold text-[10px]">ACCURACY BENCHMARK</span>
            <div className="font-display text-2xl font-bold text-espresso-950 mt-1">R² = 0.89</div>
            <p className="text-[11px] text-taupe-400 mt-1 leading-relaxed">
              Mean Absolute Error (MAE) of 12.4 µg/m³ validated against ground-truth CPCB monitoring stations.
            </p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/40">
            <span className="text-bronze-600 font-bold text-[10px]">EARTH OBSERVATION</span>
            <div className="font-bold text-espresso-950 text-sm mt-1">Sentinel-5P & VIIRS</div>
            <p className="text-[11px] text-taupe-400 mt-1 leading-relaxed">
              Tropospheric NO₂ / HCHO columnar data combined with 375m high-resolution active fire brightness temperatures.
            </p>
          </div>

          <div className="p-3 bg-ivory-50 border border-bronze-300/40">
            <span className="text-bronze-600 font-bold text-[10px]">SPATIAL PARTITION</span>
            <div className="font-display text-2xl font-bold text-espresso-950 mt-1">706 Cells</div>
            <p className="text-[11px] text-taupe-400 mt-1 leading-relaxed">
              Discrete hexagonal/geodetic cells covering all high-risk stubble burn districts across Punjab and Haryana.
            </p>
          </div>
        </div>

        {/* Next Project Footer Link */}
        <div className="mt-8 pt-4 border-t border-bronze-300/40 flex items-center justify-between">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('command-center');
            }}
            className="text-xs font-mono font-medium text-taupe-400 hover:text-espresso-950 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO OVERVIEW</span>
          </button>

          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('guard-system');
            }}
            className="text-xs font-mono font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
          >
            <span>NEXT PROJECT: 02. GUARD ATTENDANCE MANAGEMENT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
