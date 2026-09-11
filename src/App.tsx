import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutResearch } from './components/AboutResearch';
import { ExperienceDixon } from './components/ExperienceDixon';
import { ProjectVayushetra } from './components/ProjectVayushetra';
import { ProjectGuardSystem } from './components/ProjectGuardSystem';
import { ProjectAIAssistant } from './components/ProjectAIAssistant';
import { ProjectTechLayoffs } from './components/ProjectTechLayoffs';
import { Project11Towers } from './components/Project11Towers';
import { TelemetryStack } from './components/TelemetryStack';
import { Achievements } from './components/Achievements';
import { TerminalContact } from './components/TerminalContact';
import { Footer } from './components/Footer';
import { labAudio } from './utils/audio';
import { Globe, ShieldCheck, Bot, BarChart3, Building, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('command-center');

  // Synchronize with URL hash for navigation & bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validRoutes: PageRoute[] = [
        'command-center', 'about', 'experience', 'vayushetra', 
        'guard-system', 'ai-assistant', 'tech-layoffs', '11-towers', 
        'telemetry', 'achievements', 'terminal'
      ];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetRoute = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-espresso-950 font-sans selection:bg-bronze-300 selection:text-espresso-950">
      {/* Top Laboratory Navigation Bar */}
      <Navbar currentRoute={currentRoute} setRoute={handleSetRoute} />

      {/* Main Content Viewport */}
      <main className="flex-grow">
        {currentRoute === 'command-center' && (
          <div>
            <Hero setRoute={handleSetRoute} />

            {/* Works Launchpad Section on Command Center */}
            <section className="py-14 lab-container border-t border-bronze-500/25">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
                    // SELECTED WORKS & RESEARCH
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso-950 mt-1">
                    Autonomous Deployments & Systems
                  </h2>
                </div>
                <div className="text-xs font-mono text-taupe-400">
                  EACH PROJECT INCLUDES A DEDICATED 3D INTERACTIVE ENVIRONMENT
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 01. Vayushetra */}
                <div 
                  onClick={() => handleSetRoute('vayushetra')}
                  className="lab-card-light p-5 border border-bronze-400/50 hover:border-bronze-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 bg-bronze-500/15 text-bronze-700 font-bold border border-bronze-500/30">
                        01. FLAGSHIP
                      </span>
                      <span className="text-telemetry-cyan font-bold">R² = 0.89</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="w-4 h-4 text-bronze-600 group-hover:text-bronze-500 transition-colors" />
                      <h3 className="font-display font-bold text-lg text-espresso-950">
                        Vayushetra
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-espresso-800 line-clamp-3 leading-relaxed">
                      3D Earth and atmospheric intelligence platform synthesizing Sentinel-5P satellite tropospheric data, NASA VIIRS fire hotspots, and XGBoost smoke transit modeling.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-taupe-400">GEOINT / ML GLOBE</span>
                    <span className="font-bold text-bronze-600 group-hover:text-espresso-950 flex items-center gap-1">
                      ENTER ENVIRONMENT <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 02. Guard Attendance */}
                <div 
                  onClick={() => handleSetRoute('guard-system')}
                  className="lab-card-light p-5 border border-bronze-400/50 hover:border-bronze-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 bg-espresso-900 text-bronze-300 font-bold border border-bronze-500/30">
                        02. WORKFORCE
                      </span>
                      <span className="text-telemetry-emerald font-bold">HAVERSINE</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <ShieldCheck className="w-4 h-4 text-bronze-600 group-hover:text-bronze-500 transition-colors" />
                      <h3 className="font-display font-bold text-lg text-espresso-950">
                        Guard Attendance System
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-espresso-800 line-clamp-3 leading-relaxed">
                      3D isometric operations map with sub-meter Haversine GPS geo-fencing, facial camera verification, breach triggers, and manager dispatch analytics.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-taupe-400">FLUTTER / NODE / POSTGRES</span>
                    <span className="font-bold text-bronze-600 group-hover:text-espresso-950 flex items-center gap-1">
                      ENTER ENVIRONMENT <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 03. AI Employee Bot */}
                <div 
                  onClick={() => handleSetRoute('ai-assistant')}
                  className="lab-card-light p-5 border border-bronze-400/50 hover:border-bronze-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 bg-bronze-500/15 text-bronze-700 font-bold border border-bronze-500/30">
                        03. DIXON ENTERPRISE
                      </span>
                      <span className="text-telemetry-cyan font-bold">TEAMS / GEMINI</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Bot className="w-4 h-4 text-bronze-600 group-hover:text-bronze-500 transition-colors" />
                      <h3 className="font-display font-bold text-lg text-espresso-950">
                        AI Employee Assistant
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-espresso-800 line-clamp-3 leading-relaxed">
                      3D neural cognitive core with dual-tier intent routing: local wink-nlp tokenization + Google Gemini generative fallback for enterprise workforce workflows.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-taupe-400">AZURE BOT / MONGODB</span>
                    <span className="font-bold text-bronze-600 group-hover:text-espresso-950 flex items-center gap-1">
                      ENTER ENVIRONMENT <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 04. Tech Layoffs Analytics */}
                <div 
                  onClick={() => handleSetRoute('tech-layoffs')}
                  className="lab-card-light p-5 border border-bronze-400/50 hover:border-bronze-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 bg-ivory-200 text-espresso-900 font-bold border border-bronze-300">
                        04. DATA LAB
                      </span>
                      <span className="text-taupe-400">1,140+ FIRMS</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <BarChart3 className="w-4 h-4 text-bronze-600 group-hover:text-bronze-500 transition-colors" />
                      <h3 className="font-display font-bold text-lg text-espresso-950">
                        Tech Layoffs Analytics
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-espresso-800 line-clamp-3 leading-relaxed">
                      Quantitative macroeconomic laboratory analyzing 428,000+ headcount contractions using Python, Dash, Plotly Express, and time-series decomposition.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-taupe-400">PYTHON / DASH / PANDAS</span>
                    <span className="font-bold text-bronze-600 group-hover:text-espresso-950 flex items-center gap-1">
                      ENTER ENVIRONMENT <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 05. 11 Towers Platform */}
                <div 
                  onClick={() => handleSetRoute('11-towers')}
                  className="lab-card-light p-5 border border-bronze-400/50 hover:border-bronze-500 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 bg-ivory-200 text-espresso-900 font-bold border border-bronze-300">
                        05. INFRASTRUCTURE
                      </span>
                      <span className="text-telemetry-emerald font-bold">99%+ UPTIME</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4 text-bronze-600 group-hover:text-bronze-500 transition-colors" />
                      <h3 className="font-display font-bold text-lg text-espresso-950">
                        11 Towers Management
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-espresso-800 line-clamp-3 leading-relaxed">
                      Production multi-tenant residential software with dual Admin/Resident dashboards, automated water pressure scheduling, and continuous CI/CD delivery.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bronze-200/60 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-taupe-400">REACT / EXPRESS / NODE</span>
                    <span className="font-bold text-bronze-600 group-hover:text-espresso-950 flex items-center gap-1">
                      ENTER ENVIRONMENT <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Direct Comms CTA Card */}
                <div 
                  onClick={() => handleSetRoute('terminal')}
                  className="lab-card-dark p-6 border border-bronze-500/50 hover:border-bronze-400 transition-all cursor-pointer group flex flex-col justify-between text-ivory-100 shadow-panel"
                >
                  <div>
                    <div className="font-mono text-[10px] text-bronze-400 uppercase tracking-widest">
                      // DIRECT INVOCATION
                    </div>
                    <h3 className="font-display font-bold text-xl text-ivory-50 mt-2">
                      Terminal & Direct Comms
                    </h3>
                    <p className="mt-2 text-xs text-taupe-300 leading-relaxed font-sans">
                      Connect directly via interactive laboratory command prompt, email transmission, or download Prince's certified engineering resume.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-espresso-700 font-mono text-xs text-bronze-300 font-bold flex items-center justify-between">
                    <span>DISPATCH TRANSMISSION</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentRoute === 'about' && <AboutResearch setRoute={handleSetRoute} />}
        {currentRoute === 'experience' && <ExperienceDixon setRoute={handleSetRoute} />}
        {currentRoute === 'vayushetra' && <ProjectVayushetra setRoute={handleSetRoute} />}
        {currentRoute === 'guard-system' && <ProjectGuardSystem setRoute={handleSetRoute} />}
        {currentRoute === 'ai-assistant' && <ProjectAIAssistant setRoute={handleSetRoute} />}
        {currentRoute === 'tech-layoffs' && <ProjectTechLayoffs setRoute={handleSetRoute} />}
        {currentRoute === '11-towers' && <Project11Towers setRoute={handleSetRoute} />}
        {currentRoute === 'telemetry' && <TelemetryStack setRoute={handleSetRoute} />}
        {currentRoute === 'achievements' && <Achievements setRoute={handleSetRoute} />}
        {currentRoute === 'terminal' && <TerminalContact setRoute={handleSetRoute} />}
      </main>

      {/* Laboratory Engineering Archive Footer */}
      <Footer setRoute={handleSetRoute} />
    </div>
  );
};
export default App;
