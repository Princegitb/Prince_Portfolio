import React from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Building, Droplets, Users, Shield, ArrowLeft, ArrowRight, CheckCircle2, Server, Globe } from 'lucide-react';

interface TowersProps {
  setRoute: (route: PageRoute) => void;
}

export const Project11Towers: React.FC<TowersProps> = ({ setRoute }) => {
  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PROJECT 05 // INFRASTRUCTURE PLATFORM
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">PRODUCTION FULL-STACK SYSTEM</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('tech-layoffs');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: LAYOFFS ANALYTICS</span>
          </button>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 bg-espresso-900 text-bronze-300 font-mono text-[10px] font-bold border border-bronze-500/40">
            FULL-STACK SYSTEM
          </span>
          <span className="font-mono text-xs text-taupe-400">
            REACT (VITE) × NODE.JS × EXPRESS × CI/CD
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          11 Towers — Society Management System
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Production Multi-Tenant Residential Operations Platform with Dynamic Resource Scheduling
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Independently architected, designed, and deployed for high-density apartment complexes. Features role-based Admin and Resident dashboards, real-time institutional notice management, and an automated water allocation scheduling engine, maintaining 99%+ production uptime.
        </p>
      </div>

      {/* Feature Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="w-10 h-10 bg-ivory-50 border border-bronze-300/60 flex items-center justify-center mb-4">
            <Droplets className="w-5 h-5 text-telemetry-cyan" />
          </div>
          <h2 className="font-display font-bold text-base text-espresso-950">
            Dynamic Water Scheduling
          </h2>
          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Algorithmic supply scheduling prevents reservoir depletion during peak municipal pressure drops. Dispatches automated resident SMS/push alerts.
          </p>
          <div className="mt-4 pt-3 border-t border-bronze-300/40 font-mono text-[10px] text-bronze-600 font-bold">
            RESOURCE OPTIMIZATION: 32% EFFICIENCY GAIN
          </div>
        </div>

        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="w-10 h-10 bg-ivory-50 border border-bronze-300/60 flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-bronze-600" />
          </div>
          <h2 className="font-display font-bold text-base text-espresso-950">
            Dual Role-Based Dashboards
          </h2>
          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Distinct authorization scopes for Management Committee Administrators (billing, maintenance, tenant audits) and Residents (visitor approvals, dues, complaints).
          </p>
          <div className="mt-4 pt-3 border-t border-bronze-300/40 font-mono text-[10px] text-bronze-600 font-bold">
            JWT AUTHENTICATION & SECURE COOKIES
          </div>
        </div>

        <div className="lab-card-light p-6 border border-bronze-400/40">
          <div className="w-10 h-10 bg-ivory-50 border border-bronze-300/60 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-telemetry-emerald" />
          </div>
          <h2 className="font-display font-bold text-base text-espresso-950">
            Automated CI/CD & Reliability
          </h2>
          <p className="mt-2 text-xs font-sans text-espresso-800 leading-relaxed">
            Deployed on cloud container infrastructure with automated GitHub Actions pipeline executing integration tests and zero-downtime rolling updates.
          </p>
          <div className="mt-4 pt-3 border-t border-bronze-300/40 font-mono text-[10px] text-telemetry-emerald font-bold">
            AVAILABILITY: 99%+ VERIFIED UPTIME
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="lab-card-light p-4 border border-bronze-400/40 flex items-center justify-between font-mono text-xs">
        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('tech-layoffs');
          }}
          className="text-taupe-400 hover:text-espresso-950 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS: 04. LAYOFFS ANALYTICS</span>
        </button>

        <button
          onClick={() => {
            labAudio.playClick();
            setRoute('telemetry');
          }}
          className="font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
        >
          <span>NEXT: TELEMETRY & STACK MATRIX</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
