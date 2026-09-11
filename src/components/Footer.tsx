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
            <span className="font-display font-bold text-lg text-ivory-50 tracking-widest">
              PRINCE // AUTONOMOUS LAB
            </span>
          </div>
          <p className="text-taupe-300 font-sans text-xs leading-relaxed max-w-sm">
            Engineering repository and portfolio of Prince Shukla. Specializing in autonomous robotic systems, applied AI/ML architectures, and full-stack software.
          </p>
          <div className="text-[10px] text-bronze-400 space-y-0.5">
            <div>AFFILIATION: University School of Automation & Robotics (USAR), GGSIPU</div>
            <div>LOCATION: Delhi, India</div>
          </div>
        </div>

        {/* Col 2: Laboratory Index (3 cols) */}
        <div className="md:col-span-3 space-y-2">
          <div className="text-bronze-400 font-bold uppercase text-[10px] tracking-wider mb-2">
            // LABORATORY DIRECTORY
          </div>
          <ul className="space-y-1.5 text-[11px] text-taupe-300">
            <li>
              <button onClick={() => handleNav('command-center')} className="hover:text-bronze-300 transition-colors">
                Command Center
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-bronze-300 transition-colors">
                About & Research Dossier
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('experience')} className="hover:text-bronze-300 transition-colors">
                Dixon Technologies Internship
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('telemetry')} className="hover:text-bronze-300 transition-colors">
                Telemetry & Stack Matrix
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('achievements')} className="hover:text-bronze-300 transition-colors">
                Achievements & Records
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('terminal')} className="hover:text-bronze-300 transition-colors">
                Terminal / Direct Comms
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research Deployments (4 cols) */}
        <div className="md:col-span-4 space-y-2">
          <div className="text-bronze-400 font-bold uppercase text-[10px] tracking-wider mb-2">
            // RESEARCH DEPLOYMENTS
          </div>
          <ul className="space-y-1.5 text-[11px] text-taupe-300">
            <li>
              <button onClick={() => handleNav('vayushetra')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>01. Vayushetra (Atmospheric AI)</span>
                <span className="text-[9px] text-telemetry-cyan">FLAGSHIP</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('guard-system')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>02. Guard Attendance (3D Geofence)</span>
                <span className="text-[9px] text-taupe-400">LOGISTICS</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('ai-assistant')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>03. AI Employee Assistant Bot</span>
                <span className="text-[9px] text-bronze-400">DIXON / AZURE</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('tech-layoffs')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>04. Tech Layoffs Analytics</span>
                <span className="text-[9px] text-taupe-400">DATA LAB</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('11-towers')} className="hover:text-bronze-300 transition-colors flex items-center justify-between w-full">
                <span>05. 11 Towers Society System</span>
                <span className="text-[9px] text-taupe-400">FULL-STACK</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Colophon */}
      <div className="lab-container mt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] text-taupe-400">
        <div>
          ARCHIVE REFERENCE: <span className="text-ivory-200">05719052024-AR</span> • © {new Date().getFullYear()} PRINCE SHUKLA. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-telemetry-emerald flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald inline-block"></span>
            ALL SYSTEMS NOMINAL
          </span>
          <span>CURATED INDUSTRIAL PALETTE (IVORY / ESPRESSO / BRONZE)</span>
        </div>
      </div>
    </footer>
  );
};
