import React from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Award, Trophy, GraduationCap, CheckCircle, ArrowRight, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';

interface AchievementsProps {
  setRoute: (route: PageRoute) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ setRoute }) => {
  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Archival Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            ARCHIVAL REGISTRY // DISTINCTIONS & MILESTONES
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">VERIFIED RECORD CORPUS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-espresso-900 font-medium">RECORD COUNT: 04 VERIFIED ENTRIES</span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-emerald font-semibold">AUTHENTICATED</span>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-10">
        <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
          // PERFORMANCE METRICS
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          Engineering Records & Distinctions
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Competitive Hackathons, Academic Rigor & Full-Stack Deployment Authorship
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Documented empirical benchmarks reflecting high-pressure algorithmic problem solving, academic excellence within national examination frameworks, and autonomous project ownership.
        </p>
      </div>

      {/* Major Highlight 01: Brainwave Hackathon TOP 50 with Authentic Photo */}
      <div className="lab-card-light p-6 sm:p-8 border border-bronze-400/50 shadow-archival mb-10 relative overflow-hidden">
        <div className="absolute top-4 right-4 archival-stamp px-3 py-1 text-[10px] font-mono font-bold text-bronze-600 border border-bronze-500/50 rotate-2 hidden sm:block">
          OFFICIAL CITATION // 2026
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Typographic Metric (6 cols) */}
          <div className="lg:col-span-6 space-y-4 font-mono">
            <div className="text-[10px] text-bronze-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-bronze-600" />
              <span>COMPETITIVE HACKATHON STANDING</span>
            </div>

            <div className="font-display text-5xl sm:text-6xl font-bold text-espresso-950 leading-tight">
              TOP 50
            </div>

            <div className="text-base font-bold text-espresso-900 font-sans">
              ACTS EDC Brainwave Hackathon 2026
            </div>

            <p className="text-xs sm:text-sm text-espresso-800 font-sans leading-relaxed">
              Outperformed over 1,500+ participants across tertiary engineering institutions. Architected and pitched high-impact software solutions under rigorous 36-hour hackathon constraints evaluated by senior industry engineering panels.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-ivory-50 border border-bronze-300/60">
                <span className="text-[10px] text-taupe-400">PARTICIPANT POOL:</span>
                <div className="font-bold text-espresso-950 text-sm mt-0.5">1,500+ Engineers</div>
              </div>
              <div className="p-2.5 bg-ivory-50 border border-bronze-300/60">
                <span className="text-[10px] text-taupe-400">FINALS COHORT:</span>
                <div className="font-bold text-telemetry-emerald text-sm mt-0.5">Top 3.3% Bracket</div>
              </div>
            </div>
          </div>

          {/* Right: Authentic Photograph from Brainwave Hackathon (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded border-2 border-espresso-800 overflow-hidden shadow-panel bg-espresso-900 group relative">
              <img
                src="/assets/brainwave_hackathon.jpg"
                alt="Brainwave 2026 Hackathon Finalists Auditorium"
                className="w-full h-64 sm:h-72 object-cover object-center filter contrast-105 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-ivory-200">
                <span>ACTS EDC BRAINWAVE AUDITORIUM</span>
                <span className="text-bronze-300">AUTHENTIC EVENT RECORD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Milestones Grid (Class XII, Class X, Autonomous Authorship) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Class XII */}
        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
            <span className="text-bronze-600 font-bold uppercase">ACADEMIC DISTINCTION</span>
            <span className="text-taupe-400">CBSE BOARD</span>
          </div>

          <div className="font-display text-5xl font-bold text-espresso-950">
            91%
          </div>

          <h2 className="font-display font-bold text-base text-espresso-950 mt-2">
            Senior Secondary Examination (Class XII)
          </h2>

          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Rajkiya Pratibha Vikas Vidyalaya (R.P.V.V), Delhi (2024). Maintained consistent top-tier academic rigor across Mathematics, Physics, and Technical Computer Science.
          </p>

          <div className="mt-4 pt-3 border-t border-bronze-200/60 font-mono text-[10px] text-telemetry-emerald font-bold">
            STATUS: HIGH MERIT DISTINCTION
          </div>
        </div>

        {/* Class X */}
        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
            <span className="text-bronze-600 font-bold uppercase">FOUNDATIONAL STEM</span>
            <span className="text-taupe-400">CBSE BOARD</span>
          </div>

          <div className="font-display text-5xl font-bold text-espresso-950">
            88%
          </div>

          <h2 className="font-display font-bold text-base text-espresso-950 mt-2">
            Secondary School Examination (Class X)
          </h2>

          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Exemplary performance establishing fundamental proficiency in computational logic, science, and analytic reasoning.
          </p>

          <div className="mt-4 pt-3 border-t border-bronze-200/60 font-mono text-[10px] text-telemetry-emerald font-bold">
            STATUS: FIRST DIVISION WITH DISTINCTION
          </div>
        </div>

        {/* End-to-End Ownership */}
        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
            <span className="text-bronze-600 font-bold uppercase">ENGINEERING ETHOS</span>
            <span className="text-taupe-400">AUTONOMOUS</span>
          </div>

          <div className="font-display text-4xl font-bold text-espresso-950">
            100%
          </div>

          <h2 className="font-display font-bold text-base text-espresso-950 mt-2">
            Autonomous Project Authorship
          </h2>

          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Independently conceptualized, designed, built, and shipped complex web applications (11 Towers, Vayushetra, Guard Attendance) from blank repositories to cloud-hosted production.
          </p>

          <div className="mt-4 pt-3 border-t border-bronze-200/60 font-mono text-[10px] text-bronze-600 font-bold">
            FULL LIFECYCLE ARCHITECT
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="lab-card-light p-4 border border-bronze-400/40 flex items-center justify-between font-mono text-xs">
        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('telemetry');
          }}
          className="text-taupe-400 hover:text-espresso-950 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS: TELEMETRY & STACK</span>
        </button>

        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('terminal');
          }}
          className="font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
        >
          <span>NEXT: LABORATORY TERMINAL & DIRECT COMMS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
