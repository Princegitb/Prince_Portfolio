import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Volume2, VolumeX, FileDown, Terminal, Radio, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  setRoute: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [time, setTime] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [worksOpen, setWorksOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', { 
        hour12: false, 
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setTime(`${timeStr} IST`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (route: PageRoute) => {
    labAudio.playClick();
    setRoute(route);
    setWorksOpen(false);
  };

  const toggleSound = () => {
    const state = labAudio.toggleSound();
    setSoundEnabled(state);
  };

  const isProjectActive = ['vayushetra', 'guard-system', 'ai-assistant', 'tech-layoffs', '11-towers'].includes(currentRoute);

  return (
    <header className="sticky top-0 z-50 bg-[#161412] text-ivory-100 border-b border-bronze-600/30 backdrop-blur-md">
      {/* Top Technical Metadata Bar */}
      <div className="hidden lg:block border-b border-bronze-700/20 py-1 text-[11px] font-mono text-taupe-300 tracking-wider">
        <div className="lab-container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-telemetry-cyan font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-cyan animate-pulse"></span>
              SYS: DUAL-CORE KINEMATICS NOMINAL
            </span>
            <span className="text-bronze-400">|</span>
            <span>EST. 2024 • B.TECH ROBOTICS & AI (USAR, GGSIPU)</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-bronze-300">ARCHIVE REF: <span className="text-ivory-100 font-semibold">05719052024-AR</span></span>
            <span className="text-bronze-400">|</span>
            <span className="text-ivory-200">{time || '00:00:00 IST'}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="lab-container py-3.5 flex items-center justify-between">
        {/* Brand / Laboratory Identity */}
        <div 
          onClick={() => handleNav('command-center')}
          className="cursor-pointer group flex items-center gap-3"
        >
          <div className="w-9 h-9 border border-bronze-500/40 bg-espresso-900 flex items-center justify-center relative overflow-hidden transition-all group-hover:border-bronze-400">
            <div className="absolute inset-0 bg-bronze-500/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <span className="font-display font-bold text-bronze-300 text-sm tracking-widest relative z-10">Ψ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display tracking-[0.2em] text-base font-bold text-ivory-50 group-hover:text-bronze-300 transition-colors">
                PRINCE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bronze-500/15 text-bronze-300 border border-bronze-500/30">
                AUTONOMOUS LAB
              </span>
            </div>
            <p className="text-[10px] font-mono text-taupe-400 tracking-wider hidden sm:block">
              ENGINEERING ARCHIVE & PHYSICAL-DIGITAL SYSTEMS
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => handleNav('command-center')}
            className={`px-3 py-1.5 transition-all relative ${
              currentRoute === 'command-center'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            COMMAND CENTER
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`px-3 py-1.5 transition-all ${
              currentRoute === 'about'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            ABOUT & RESEARCH
          </button>

          <button
            onClick={() => handleNav('experience')}
            className={`px-3 py-1.5 transition-all ${
              currentRoute === 'experience'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            EXPERIENCE
          </button>

          {/* Selected Works Dropdown */}
          <div className="relative">
            <button
              onClick={() => setWorksOpen(!worksOpen)}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-all ${
                isProjectActive
                  ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                  : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
              }`}
            >
              <span>SELECTED WORKS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${worksOpen ? 'rotate-180 text-bronze-400' : ''}`} />
            </button>

            {worksOpen && (
              <div 
                className="absolute left-0 mt-2 w-64 bg-espresso-900 border border-bronze-500/40 shadow-2xl py-1 z-50 font-mono text-[11px]"
                onMouseLeave={() => setWorksOpen(false)}
              >
                <div className="px-3 py-1.5 text-[9px] text-bronze-400 uppercase tracking-widest border-b border-espresso-700/60">
                  // RESEARCH & OPERATIONAL PROJECTS
                </div>
                <button
                  onClick={() => handleNav('vayushetra')}
                  className="w-full text-left px-3 py-2 hover:bg-espresso-800 flex items-center justify-between text-ivory-200 hover:text-bronze-300 group"
                >
                  <span className="font-semibold">01. VAYUSHETRA</span>
                  <span className="text-[9px] text-telemetry-cyan bg-telemetry-teal/20 px-1.5 py-0.5 rounded">FLAGSHIP GEOINT</span>
                </button>
                <button
                  onClick={() => handleNav('guard-system')}
                  className="w-full text-left px-3 py-2 hover:bg-espresso-800 flex items-center justify-between text-ivory-200 hover:text-bronze-300"
                >
                  <span>02. GUARD ATTENDANCE</span>
                  <span className="text-[9px] text-taupe-400">3D HAVERSINE</span>
                </button>
                <button
                  onClick={() => handleNav('ai-assistant')}
                  className="w-full text-left px-3 py-2 hover:bg-espresso-800 flex items-center justify-between text-ivory-200 hover:text-bronze-300"
                >
                  <span>03. AI EMPLOYEE BOT</span>
                  <span className="text-[9px] text-bronze-400">DIXON / AZURE</span>
                </button>
                <button
                  onClick={() => handleNav('tech-layoffs')}
                  className="w-full text-left px-3 py-2 hover:bg-espresso-800 flex items-center justify-between text-ivory-200 hover:text-bronze-300"
                >
                  <span>04. LAYOFFS ANALYTICS</span>
                  <span className="text-[9px] text-taupe-400">DATA LAB</span>
                </button>
                <button
                  onClick={() => handleNav('11-towers')}
                  className="w-full text-left px-3 py-2 hover:bg-espresso-800 flex items-center justify-between text-ivory-200 hover:text-bronze-300"
                >
                  <span>05. 11 TOWERS</span>
                  <span className="text-[9px] text-taupe-400">FULL-STACK</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('telemetry')}
            className={`px-3 py-1.5 transition-all ${
              currentRoute === 'telemetry'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            TELEMETRY & STACK
          </button>

          <button
            onClick={() => handleNav('achievements')}
            className={`px-3 py-1.5 transition-all ${
              currentRoute === 'achievements'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            ACHIEVEMENTS
          </button>

          <button
            onClick={() => handleNav('terminal')}
            className={`px-3 py-1.5 transition-all flex items-center gap-1.5 ${
              currentRoute === 'terminal'
                ? 'text-bronze-300 bg-espresso-800/80 border-b-2 border-bronze-400 font-medium'
                : 'text-taupe-300 hover:text-ivory-100 hover:bg-espresso-800/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-bronze-400" />
            <span>TERMINAL</span>
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Laboratory Feedback" : "Enable Tactile Laboratory Acoustic Feedback"}
            className="p-1.5 rounded border border-bronze-700/40 text-taupe-400 hover:text-bronze-300 hover:border-bronze-500 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-telemetry-cyan" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-70" />
            )}
          </button>

          {/* Download Resume Button */}
          <a
            href="/Prince_Shukla_Resume.pdf"
            download="Prince_Shukla_Resume.pdf"
            onClick={() => labAudio.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-bronze-500/60 bg-bronze-500/10 text-bronze-200 hover:bg-bronze-500/20 hover:border-bronze-400 transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-bronze-300" />
            <span>RESUME (PDF)</span>
          </a>

          {/* Contact Dispatch */}
          <button
            onClick={() => handleNav('terminal')}
            className="px-3.5 py-1.5 text-xs font-mono font-semibold bg-bronze-500 text-espresso-950 hover:bg-bronze-400 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around py-2 px-2 border-t border-espresso-800 bg-espresso-950/90 text-[11px] font-mono overflow-x-auto">
        <button 
          onClick={() => handleNav('command-center')} 
          className={`px-2 py-1 ${currentRoute === 'command-center' ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          COMMAND
        </button>
        <button 
          onClick={() => handleNav('about')} 
          className={`px-2 py-1 ${currentRoute === 'about' ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          ABOUT
        </button>
        <button 
          onClick={() => handleNav('experience')} 
          className={`px-2 py-1 ${currentRoute === 'experience' ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          EXPERIENCE
        </button>
        <button 
          onClick={() => handleNav('vayushetra')} 
          className={`px-2 py-1 ${isProjectActive ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          WORKS
        </button>
        <button 
          onClick={() => handleNav('telemetry')} 
          className={`px-2 py-1 ${currentRoute === 'telemetry' ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          STACK
        </button>
        <button 
          onClick={() => handleNav('terminal')} 
          className={`px-2 py-1 ${currentRoute === 'terminal' ? 'text-bronze-300 font-bold' : 'text-taupe-400'}`}
        >
          TERMINAL
        </button>
      </div>
    </header>
  );
};
