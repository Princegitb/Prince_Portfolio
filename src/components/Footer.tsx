import React from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';

interface FooterProps {
  setRoute: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ setRoute }) => {
  const handleNav = (r: PageRoute) => {
    labAudio.playClick();
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121110] text-ivory-200 border-t border-bronze-600/30 pt-12 pb-8 font-mono text-xs">
      <div className="lab-container grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-espresso-800">
        {/* Col 1: Identity & Description (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-ivory-50 tracking-wide">
              PRINCE SHUKLA
            </span>
          </div>
          <p className="text-taupe-300 font-sans text-xs leading-relaxed max-w-sm">
            B.Tech student in Automation & Robotics at USAR, GGSIPU, Delhi. Experienced in building practical machine learning models, analytics tools, and full-stack web software.
          </p>
          <div className="text-[11px] text-bronze-400 space-y-0.5">
            <div>USAR, GGSIPU • New Delhi, India</div>
          </div>
        </div>

        {/* Col 2: Navigation (3 cols) */}
        <div className="md:col-span-3 space-y-2">
          <div className="text-bronze-400 font-bold uppercase text-[10px] tracking-wider mb-2">
            NAVIGATION
          </div>
          <ul className="space-y-1.5 text-[11px] text-taupe-300">
            <li>
              <button onClick={() => handleNav('command-center')} className="hover:text-bronze-300 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-bronze-300 transition-colors">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('experience')} className="hover:text-bronze-300 transition-colors">
                Experience
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('telemetry')} className="hover:text-bronze-300 transition-colors">
                Skills & Stack
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('achievements')} className="hover:text-bronze-300 transition-colors">
                Achievements
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('terminal')} className="hover:text-bronze-300 transition-colors">
                Contact & Terminal
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Projects (4 cols) */}
        <div className="md:col-span-4 space-y-2">
          <div className="text-bronze-400 font-bold uppercase text-[10px] tracking-wider mb-2">
            PROJECTS
          </div>
          <ul className="space-y-1.5 text-[11px] text-taupe-300">
            <li>
              <button onClick={() => handleNav('vayushetra')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>01. Vayushetra</span>
                <span className="text-[9px] text-telemetry-cyan">SATELLITE ML</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('guard-system')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>02. Guard Attendance</span>
                <span className="text-[9px] text-taupe-400">MOBILE APP</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('ai-assistant')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>03. AI Employee Bot</span>
                <span className="text-[9px] text-bronze-400">DIXON / NLP</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('tech-layoffs')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>04. Tech Layoffs Analytics</span>
                <span className="text-[9px] text-taupe-400">DATA SCIENCE</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('11-towers')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>05. 11 Towers Society</span>
                <span className="text-[9px] text-taupe-400">FULL-STACK</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="lab-container mt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-taupe-400">
        <div>
          © {new Date().getFullYear()} Prince Shukla. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-bronze-300">
          <span>Built with React, TypeScript & Three.js</span>
        </div>
      </div>
    </footer>
  );
};
