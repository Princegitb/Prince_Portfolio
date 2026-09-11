import React, { useState } from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { BarChart3, TrendingDown, Filter, Calendar, Building2, ArrowLeft, ArrowRight, Table, Activity } from 'lucide-react';

interface TechLayoffsProps {
  setRoute: (route: PageRoute) => void;
}

export const ProjectTechLayoffs: React.FC<TechLayoffsProps> = ({ setRoute }) => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [activeCompanyHover, setActiveCompanyHover] = useState<string | null>(null);

  // Time-series trend data
  const dataPoints = [
    { month: 'Jan 22', count: 18, layoffs: 12000 },
    { month: 'Jun 22', count: 42, layoffs: 28000 },
    { month: 'Nov 22', count: 85, layoffs: 53000 },
    { month: 'Jan 23', count: 120, layoffs: 89000 },
    { month: 'Jun 23', count: 64, layoffs: 42000 },
    { month: 'Jan 24', count: 72, layoffs: 34000 },
    { month: 'Jun 24', count: 38, layoffs: 18000 },
    { month: 'Jan 25', count: 28, layoffs: 14000 },
    { month: 'Jun 25', count: 22, layoffs: 9500 },
    { month: 'Jan 26', count: 16, layoffs: 7200 },
  ];

  const companies = [
    { name: 'Amazon Inc.', layoffs: '27,000', sector: 'E-Commerce / Cloud', period: '2023-2024' },
    { name: 'Meta Platforms', layoffs: '21,000', sector: 'Social / Metaverse', period: '2022-2023' },
    { name: 'Google (Alphabet)', layoffs: '12,000', sector: 'Search / AI / Cloud', period: '2023-2024' },
    { name: 'Microsoft Corp.', layoffs: '10,000', sector: 'Enterprise / Gaming', period: '2023-2024' },
    { name: 'Salesforce', layoffs: '8,000', sector: 'CRM / SaaS', period: '2023' },
  ];

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Archival Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            PROJECT 04 // EMPIRICAL DATA LABORATORY
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-semibold">GLOBAL MACROECONOMIC DYNAMICS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('ai-assistant');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: AI ASSISTANT</span>
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 bg-espresso-900 text-bronze-300 font-mono text-[10px] font-bold border border-bronze-500/40">
            TIME-SERIES ANALYTICS
          </span>
          <span className="font-mono text-xs text-taupe-400">
            PYTHON × DASH × PLOTLY EXPRESS × PANDAS
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 tracking-tight">
          Tech Layoffs Analytics Dashboard
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-1">
          Quantitative Workforce Contraction Modeling Across 1,140+ Technology Firms
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Built to interrogate global tech sector workforce contractions during the post-pandemic macro realignment. The pipeline combines automated data ingestion, pandas time-series decomposition, dynamic year filtering, and high-density KPI reporting to track attrition velocity and sectoral concentrations.
        </p>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-ivory-50 border border-bronze-400/40 shadow-sm">
          <div className="font-mono text-[10px] text-bronze-600 font-bold uppercase">
            TOTAL TRACKED REDUCTIONS
          </div>
          <div className="font-display text-3xl font-bold text-espresso-950 mt-1">
            428,000+
          </div>
          <div className="font-mono text-[10px] text-taupe-400 mt-0.5">
            Verified across public disclosures
          </div>
        </div>

        <div className="p-4 bg-ivory-50 border border-bronze-400/40 shadow-sm">
          <div className="font-mono text-[10px] text-bronze-600 font-bold uppercase">
            MONITORED TECH FIRMS
          </div>
          <div className="font-display text-3xl font-bold text-espresso-950 mt-1">
            1,140+
          </div>
          <div className="font-mono text-[10px] text-taupe-400 mt-0.5">
            FAANG + High-growth unicorns
          </div>
        </div>

        <div className="p-4 bg-ivory-50 border border-bronze-400/40 shadow-sm">
          <div className="font-mono text-[10px] text-bronze-600 font-bold uppercase">
            PEAK CONTRACTION MONTH
          </div>
          <div className="font-display text-3xl font-bold text-espresso-950 mt-1">
            JAN 2023
          </div>
          <div className="font-mono text-[10px] text-taupe-400 mt-0.5">
            89,000+ headcount reduced in 30 days
          </div>
        </div>

        <div className="p-4 bg-ivory-50 border border-bronze-400/40 shadow-sm">
          <div className="font-mono text-[10px] text-bronze-600 font-bold uppercase">
            PRIMARY SECTOR HIT
          </div>
          <div className="font-display text-3xl font-bold text-espresso-950 mt-1">
            SaaS / Cloud
          </div>
          <div className="font-mono text-[10px] text-taupe-400 mt-0.5">
            Enterprise software realignment
          </div>
        </div>
      </div>

      {/* Interactive Time-Series Chart Viewport */}
      <div className="lab-card-dark p-6 border border-bronze-500/40 shadow-panel mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-espresso-700/80 font-mono text-xs text-ivory-200">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-telemetry-alert" />
            <span className="font-bold text-bronze-300">
              TEMPORAL DECOMPOSITION // GLOBAL TECH HEADCOUNT REDUCTIONS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-taupe-400" />
            <div className="flex gap-1">
              {['ALL', '2022', '2023', '2024', '2025/2026'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    labAudio.playClick();
                    setSelectedYear(yr);
                  }}
                  className={`px-2.5 py-0.5 text-[10px] border transition-all ${
                    selectedYear === yr
                      ? 'bg-bronze-500 text-espresso-950 font-bold border-bronze-400'
                      : 'bg-espresso-900 text-taupe-300 border-espresso-700 hover:border-bronze-500/50'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom SVG Time-Series Chart */}
        <div className="relative w-full h-64 sm:h-72">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 900 240" preserveAspectRatio="none">
            {/* Horizontal Grid lines */}
            {[0, 60, 120, 180, 240].map((y) => (
              <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="#2A2723" strokeDasharray="4 4" strokeWidth="1" />
            ))}

            {/* Shaded Area Under Curve */}
            <path
              d={`M 0 240 
                  ${dataPoints.map((pt, i) => `L ${(i * 900) / (dataPoints.length - 1)} ${240 - (pt.layoffs / 90000) * 200}`).join(' ')} 
                  L 900 240 Z`}
              fill="url(#bronzeGradient)"
              opacity="0.25"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="bronzeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C5A472" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#121110" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Trajectory Polyline */}
            <polyline
              fill="none"
              stroke="#B08C57"
              strokeWidth="3"
              points={dataPoints.map((pt, i) => `${(i * 900) / (dataPoints.length - 1)},${240 - (pt.layoffs / 90000) * 200}`).join(' ')}
            />

            {/* Individual Data Marker Points */}
            {dataPoints.map((pt, i) => {
              const cx = (i * 900) / (dataPoints.length - 1);
              const cy = 240 - (pt.layoffs / 90000) * 200;
              return (
                <g key={pt.month} className="cursor-pointer group">
                  <circle cx={cx} cy={cy} r="5" fill="#47949B" stroke="#F6F3EC" strokeWidth="2" />
                  <text
                    x={cx}
                    y={cy - 12}
                    fill="#F6F3EC"
                    fontSize="11"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {pt.layoffs.toLocaleString()}
                  </text>
                  <text
                    x={cx}
                    y={235}
                    fill="#B5A992"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                  >
                    {pt.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="pt-3 border-t border-espresso-800 flex items-center justify-between font-mono text-[10px] text-taupe-400">
          <span>Y-AXIS: AGGREGATE MONTHLY LAYOFFS (0 – 90,000)</span>
          <span className="text-telemetry-cyan">SOURCE: AGGREGATED SEC FILINGS & WARN NOTICES</span>
        </div>
      </div>

      {/* Enterprise Impact Breakdown Table */}
      <div className="lab-card-light p-6 border border-bronze-400/40 mb-10">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-bronze-300/40 font-mono text-xs">
          <Building2 className="w-4 h-4 text-bronze-600" />
          <span className="font-bold text-espresso-950 uppercase tracking-wider">
            HIGH-PROFILE RESTRUCTURING CORPUS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs text-left">
            <thead>
              <tr className="border-b border-bronze-300/50 text-[10px] text-bronze-600 uppercase">
                <th className="py-2.5 px-3">ORGANIZATION</th>
                <th className="py-2.5 px-3">HEADCOUNT IMPACT</th>
                <th className="py-2.5 px-3">PRIMARY SECTOR</th>
                <th className="py-2.5 px-3">CONTRACTION WINDOW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bronze-200/50">
              {companies.map((c) => (
                <tr key={c.name} className="hover:bg-ivory-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-espresso-950">{c.name}</td>
                  <td className="py-3 px-3 text-telemetry-alert font-bold">{c.layoffs}</td>
                  <td className="py-3 px-3 text-taupe-400">{c.sector}</td>
                  <td className="py-3 px-3 text-espresso-900">{c.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-bronze-300/40 flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('ai-assistant');
            }}
            className="text-taupe-400 hover:text-espresso-950 flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS: 03. AI ASSISTANT</span>
          </button>

          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('11-towers');
            }}
            className="font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
          >
            <span>NEXT PROJECT: 05. 11 TOWERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
