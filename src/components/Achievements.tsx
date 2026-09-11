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
          <span className="text-espresso-900 font-medium">RECORD COUNT: 05 VERIFIED ENTRIES</span>
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
          Documented empirical benchmarks reflecting high-pressure algorithmic problem solving, collegiate competitive hackathon standing, academic excellence within national examination frameworks, and autonomous project ownership.
        </p>
      </div>

      {/* Competitive Hackathons Section Header */}
      <div className="space-y-6 mb-10">
        <div className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-bold flex items-center gap-2">
          <Trophy className="w-4 h-4 text-bronze-600" />
          <span>// COLLEGIATE COMPETITIVE HACKATHON RECORDS</span>
        </div>

        {/* 2-Column Grid: InnovateNSUT'25 (Top 5) & Brainwave 2026 (Top 50) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 01: InnovateNSUT'25 - TOP 5 FINALISTS AT NSUT DELHI */}
          <div className="lg:col-span-6 lab-card-light p-6 sm:p-7 border border-bronze-400/50 shadow-archival relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 archival-stamp px-2.5 py-0.5 text-[9px] font-mono font-bold text-bronze-600 border border-bronze-500/50 rotate-1">
              NSUT DELHI // 2025
            </div>

            <div className="space-y-3 font-mono">
              <div className="text-[10px] text-bronze-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-telemetry-cyan" />
                <span>OFFICIAL HACKATHON CITATION</span>
              </div>

              <div className="font-display text-5xl sm:text-6xl font-bold text-espresso-950 leading-tight flex items-baseline gap-2">
                <span>TOP 5</span>
                <span className="text-xs font-mono text-telemetry-emerald font-semibold uppercase tracking-wider">
                  ★ FINALISTS
                </span>
              </div>

              <div className="text-lg font-bold text-espresso-900 font-sans">
                InnovateNSUT'25 Hackathon
              </div>

              <div className="text-xs text-bronze-700 font-semibold font-mono flex items-center gap-1.5">
                <span>Netaji Subhas University of Technology (NSUT), Delhi</span>
              </div>

              <p className="text-xs text-espresso-800 font-sans leading-relaxed pt-1">
                Clinched a premier <strong>Top 5 Standing</strong> at NSUT Delhi in their flagship hackathon, <em>InnovateNSUT'25</em>. Architected, coded, and demonstrated innovative software engineering solutions under intense competitive offline constraints, thoroughly evaluated and commended by senior jury panels and university faculty.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-bronze-200/60 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-ivory-50 border border-bronze-300/60">
                <span className="text-[10px] text-taupe-400">VENUE:</span>
                <div className="font-bold text-espresso-950 text-xs mt-0.5">NSUT, Dwarka, Delhi</div>
              </div>
              <div className="p-2.5 bg-ivory-50 border border-bronze-300/60">
                <span className="text-[10px] text-taupe-400">RECORD BRACKET:</span>
                <div className="font-bold text-telemetry-emerald text-xs mt-0.5">Top 5 Finalists</div>
              </div>
            </div>
          </div>

          {/* Card 02: ACTS EDC Brainwave Hackathon 2026 - TOP 50 with Authentic Photo */}
          <div className="lg:col-span-6 lab-card-light p-6 sm:p-7 border border-bronze-400/50 shadow-archival relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 archival-stamp px-2.5 py-0.5 text-[9px] font-mono font-bold text-bronze-600 border border-bronze-500/50 rotate-1">
              FINALS // 2026
            </div>

            <div className="space-y-3 font-mono">
              <div className="text-[10px] text-bronze-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-bronze-600" />
                <span>COMPETITIVE HACKATHON STANDING</span>
              </div>

              <div className="font-display text-5xl sm:text-6xl font-bold text-espresso-950 leading-tight flex items-baseline gap-2">
                <span>TOP 50</span>
                <span className="text-xs font-mono text-telemetry-cyan font-semibold uppercase tracking-wider">
                  / 1,500+ TEAMS
                </span>
              </div>

              <div className="text-lg font-bold text-espresso-900 font-sans">
                ACTS EDC Brainwave Hackathon 2026
              </div>

              <div className="text-xs text-bronze-700 font-semibold font-mono">
                ACTS Auditorium // Pan-India Finals
              </div>

              <p className="text-xs text-espresso-800 font-sans leading-relaxed pt-1">
                Outperformed over 1,500+ participants across tertiary engineering institutions. Architected and pitched high-impact software solutions under 36-hour hackathon constraints evaluated by senior industry panels.
              </p>
            </div>

            {/* Authentic Photograph from Brainwave Auditorium */}
            <div className="mt-3 rounded border border-espresso-800 overflow-hidden shadow-sm bg-espresso-900 relative group">
              <img
                src="/assets/brainwave_hackathon.jpg"
                alt="Brainwave 2026 Hackathon Finalists Auditorium"
                className="w-full h-32 sm:h-36 object-cover object-center filter contrast-105 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between font-mono text-[9px] text-ivory-200">
                <span>ACTS EDC BRAINWAVE AUDITORIUM</span>
                <span className="text-bronze-300">TOP 3.3% BRACKET</span>
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
