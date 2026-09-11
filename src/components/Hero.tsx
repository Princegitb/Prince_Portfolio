import React from 'react';
import { RobotViewer } from './RobotViewer';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { ShieldCheck, Cpu, ArrowUpRight, Compass, Database, Fingerprint, Award, Binary } from 'lucide-react';

interface HeroProps {
  setRoute: (route: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ setRoute }) => {
  const handleAction = (route: PageRoute) => {
    labAudio.playClick();
    setRoute(route);
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 lab-container">
      {/* Background Archival Grid Marker */}
      <div className="absolute inset-0 archival-bg-grid opacity-60 pointer-events-none"></div>

      {/* Hero Headline Section with Clean Editorial Typography */}
      <div className="relative z-10 mb-10 border-b border-bronze-500/25 pb-8">
        {/* Status Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-espresso-900 text-bronze-300 font-mono text-[11px] border border-bronze-500/40 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-telemetry-emerald"></span>
            <span>OPEN TO WORK • DELHI, INDIA</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-taupe-400">
            <span>USAR, GGSIPU (2024–2028)</span>
            <span className="text-bronze-500">•</span>
            <span>EX-INTERN AT DIXON TECHNOLOGIES</span>
          </div>
        </div>

        {/* Major Architectural Serif Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold tracking-tight text-espresso-950 leading-[0.95]">
              PRINCE
            </h1>
            <p className="mt-3 font-mono text-xs sm:text-sm 2xl:text-base tracking-[0.15em] text-bronze-600 uppercase font-semibold">
              FULL-STACK DEVELOPER × MACHINE LEARNING × DATA SCIENCE
            </p>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 font-sans text-sm 2xl:text-base text-espresso-800 leading-relaxed border-l-2 border-bronze-400/40 pl-5 py-1">
            <p className="font-medium text-espresso-900">
              Building practical machine learning systems, data platforms, and full-stack web applications.
            </p>
            <p className="mt-2 text-xs 2xl:text-sm text-taupe-400 font-sans">
              B.Tech student in Automation & Robotics at USAR, GGSIPU. Experienced in building enterprise AI tools and data analytics systems.
            </p>
          </div>
        </div>
      </div>

      {/* The Two Major Modules: Profile Card & 3D Interactive Model */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Module: Developer Profile Card */}
        <div className="lg:col-span-5 flex flex-col justify-between lab-card-light p-6 sm:p-7 xl:p-8 relative overflow-hidden border border-bronze-400/50 shadow-archival rounded-sm">
          {/* Subtle Status Stamp */}
          <div className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-mono font-bold text-bronze-700 bg-bronze-500/10 border border-bronze-500/40">
            AVAILABLE
          </div>

          {/* Profile Header */}
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-bronze-400/30">
            <Fingerprint className="w-5 h-5 text-bronze-600" />
            <div>
              <div className="font-mono text-[10px] text-bronze-600 font-bold uppercase tracking-wider">
                DEVELOPER PROFILE
              </div>
              <h2 className="font-display font-bold text-lg text-espresso-950 tracking-wide">
                Prince Shukla
              </h2>
            </div>
          </div>

          {/* Photo & Primary Bio Container */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-6">
            {/* Prince's Authentic Photograph */}
            <div className="relative group flex-shrink-0">
              <div className="w-36 h-44 sm:w-32 sm:h-40 rounded-sm overflow-hidden border-2 border-espresso-800 shadow-md bg-espresso-900 relative">
                <img
                  src="/assets/prince_photo.jpg"
                  alt="Prince Shukla"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 sepia-[0.15] transition-all duration-500 group-hover:grayscale-0 group-hover:sepia-0"
                />
              </div>
            </div>

            {/* Personnel Specs */}
            <div className="flex-1 font-mono text-xs space-y-2 w-full">
              <div className="flex justify-between border-b border-bronze-300/40 pb-1">
                <span className="text-taupe-400">NAME:</span>
                <span className="font-bold text-espresso-950">PRINCE SHUKLA</span>
              </div>
              <div className="flex justify-between border-b border-bronze-300/40 pb-1">
                <span className="text-taupe-400">DEGREE:</span>
                <span className="text-espresso-900 font-medium">B.TECH AUTOMATION & ROBOTICS</span>
              </div>
              <div className="flex justify-between border-b border-bronze-300/40 pb-1">
                <span className="text-taupe-400">COLLEGE:</span>
                <span className="text-espresso-900">USAR, GGSIPU (DELHI)</span>
              </div>
              <div className="flex justify-between border-b border-bronze-300/40 pb-1">
                <span className="text-taupe-400">BATCH:</span>
                <span className="text-espresso-900">2024 – 2028</span>
              </div>
              <div className="flex justify-between border-b border-bronze-300/40 pb-1">
                <span className="text-taupe-400">STATUS:</span>
                <span className="text-telemetry-emerald font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald inline-block"></span>
                  OPEN FOR INTERNSHIPS
                </span>
              </div>
            </div>
          </div>

          {/* Primary Specializations */}
          <div className="space-y-3 font-mono text-xs mb-6">
            <div className="text-[10px] text-bronze-600 font-bold uppercase tracking-wider">
              PRIMARY FOCUS & STACK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 bg-ivory-50 border border-bronze-400/30">
                <div className="font-bold text-espresso-950 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-bronze-600" />
                  AI & ML
                </div>
                <div className="text-[10px] text-taupe-400 mt-1">
                  Python, XGBoost, Scikit-Learn, Gemini API
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border border-bronze-400/30">
                <div className="font-bold text-espresso-950 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-bronze-600" />
                  FULL-STACK
                </div>
                <div className="text-[10px] text-taupe-400 mt-1">
                  React, Node.js, Express, MongoDB, PostgreSQL
                </div>
              </div>

              <div className="p-2.5 bg-ivory-50 border border-bronze-400/30">
                <div className="font-bold text-espresso-950 flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5 text-telemetry-cyan" />
                  DATA SCIENCE
                </div>
                <div className="text-[10px] text-taupe-400 mt-1">
                  Pandas, NumPy, Dash, Plotly, SQL
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => handleAction('about')}
              className="flex-1 py-2.5 px-4 bg-espresso-900 text-ivory-50 font-mono text-xs font-semibold hover:bg-espresso-800 transition-all flex items-center justify-center gap-2 border border-bronze-500/40"
            >
              <span>ABOUT ME</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-bronze-300" />
            </button>

            <button
              onClick={() => handleAction('experience')}
              className="flex-1 py-2.5 px-4 bg-ivory-200 text-espresso-950 font-mono text-xs font-semibold hover:bg-ivory-300 transition-all flex items-center justify-center gap-2 border border-bronze-400/40"
            >
              <span>EXPERIENCE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-espresso-800" />
            </button>
          </div>
        </div>

        {/* Right Module: 3D Interactive Model */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <RobotViewer onRobotClick={() => handleAction('telemetry')} />

          {/* Sub-Panel Legend */}
          <div className="mt-3.5 p-3.5 bg-espresso-900/95 border border-bronze-600/30 text-ivory-200 font-mono text-xs flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-telemetry-cyan"></span>
              <span className="text-taupe-300">3D INTERACTIVE MODEL:</span>
              <span className="text-bronze-300 font-semibold">MOVE YOUR CURSOR TO LOOK AROUND</span>
            </div>
            <button
              onClick={() => handleAction('telemetry')}
              className="text-xs text-bronze-300 hover:text-ivory-50 underline flex items-center gap-1 font-medium"
            >
              <span>VIEW SKILLS & TECH</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
