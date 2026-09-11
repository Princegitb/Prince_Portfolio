import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Briefcase, GitBranch, Terminal, CheckCircle2, ArrowRight, Play, RefreshCw, Cpu, Server, Database, Globe, MessageSquare } from 'lucide-react';

interface ExperienceProps {
  setRoute: (route: PageRoute) => void;
}

interface ArchNode {
  id: string;
  name: string;
  category: string;
  tech: string;
  description: string;
  latency: string;
  samplePayload: string;
}

export const ExperienceDixon: React.FC<ExperienceProps> = ({ setRoute }) => {
  const [activeNode, setActiveNode] = useState<string>('node-nlp');
  const [packetStep, setPacketStep] = useState<number>(0);
  const [simulating, setSimulating] = useState<boolean>(true);
  const [logs, setLogs] = useState<string[]>([
    '[08:14:02] TEAMS_GATEWAY: Received query payload from User_Emp_704',
    '[08:14:02] BOT_ADAPTER: TurnContext initialized. Session auth verified.',
    '[08:14:03] WINK_NLP: Intent identified: query_leave_balance (Confidence: 0.94)',
    '[08:14:03] MONGO_ATLAS: Aggregation query executed. Match: emp_id=704 (Latency: 18ms)',
    '[08:14:04] APP_SERVICE: HTTP 200 OK — Adaptive Card payload dispatched to Teams'
  ]);

  const nodes: ArchNode[] = [
    {
      id: 'node-teams',
      name: 'MICROSOFT TEAMS',
      category: 'CLIENT UI LAYER',
      tech: 'Adaptive Cards v1.4 / Teams SDK',
      description: 'End-user conversational interface inside enterprise Microsoft Teams tenant. Renders interactive Adaptive Cards for leave balance, policy queries, and payroll access.',
      latency: '< 12ms',
      samplePayload: '{\n  "type": "message",\n  "text": "Check remaining annual PTO",\n  "from": { "id": "emp_704@dixon.in" }\n}'
    },
    {
      id: 'node-express',
      name: 'NODE.JS / EXPRESS',
      category: 'GATEWAY & ROUTING',
      tech: 'Node.js v20 LTS / Express Router',
      description: 'High-throughput asynchronous REST gateway handling webhook ingress, request throttling, JWT verification, and telemetry dispatch.',
      latency: '4.2ms',
      samplePayload: '{\n  "route": "/api/messages",\n  "method": "POST",\n  "auth": "Bearer eyJhbGciOi...",\n  "timestamp": "2026-07-20T08:14:02Z"\n}'
    },
    {
      id: 'node-azure-bot',
      name: 'AZURE BOT FRAMEWORK',
      category: 'DIALOG STATE ENGINE',
      tech: 'BotFramework-SDK / ActivityHandler',
      description: 'Manages conversational turns, user conversation references, multi-turn state stores, and middleware pipelines across enterprise tenants.',
      latency: '8.5ms',
      samplePayload: '{\n  "conversation": { "id": "conv_9921" },\n  "activity": "message",\n  "channelId": "msteams"\n}'
    },
    {
      id: 'node-nlp',
      name: 'NLP / INTENT DETECTION',
      category: 'LOCAL COGNITIVE ENGINE',
      tech: 'wink-nlp / Tokenizer & Custom Regex',
      description: 'Rapid client-side natural language processing pipeline. Performs POS tagging, named entity recognition (NER), and intent classification without external API roundtrips.',
      latency: '1.8ms',
      samplePayload: '{\n  "intent": "check_leave_balance",\n  "entities": { "leaveType": "annual", "period": "2026" },\n  "confidence": 0.942\n}'
    },
    {
      id: 'node-mongo',
      name: 'MONGODB ATLAS',
      category: 'PERSISTENT REPOSITORY',
      tech: 'MongoDB M10 Cluster / Mongoose ODM',
      description: 'Enterprise operational database hosting employee personnel schemas, attendance logs, leave balances, and indexed institutional knowledge articles.',
      latency: '14.6ms',
      samplePayload: '{\n  "_id": "6699a721",\n  "emp_id": 704,\n  "leaves_allocated": 24,\n  "leaves_remaining": 16.5,\n  "department": "Robotics"\n}'
    },
    {
      id: 'node-gemini',
      name: 'GEMINI AI FALLBACK',
      category: 'GENERATIVE COGNITIVE LAYER',
      tech: 'Google Gemini Pro API',
      description: 'Secondary generative intelligence layer invoked whenever intent confidence falls below 0.70. Parses ambiguous free-form natural language queries against company guidelines.',
      latency: '420ms',
      samplePayload: '{\n  "model": "gemini-pro",\n  "prompt": "Synthesize company leave policy regarding maternity and sick rollover...",\n  "temperature": 0.2\n}'
    },
    {
      id: 'node-app-service',
      name: 'AZURE APP SERVICE',
      category: 'DEPLOYMENT & HOSTING',
      tech: 'Azure Linux Container / B1 Tier',
      description: 'Production containerized runtime with continuous health probes, automated horizontal scaling, and secure environment variable management.',
      latency: '99.9% Uptime',
      samplePayload: '{\n  "status": "HEALTHY",\n  "memoryUsage": "142MB",\n  "activeConnections": 64,\n  "region": "Central India"\n}'
    }
  ];

  // Auto-cycle data packet animation
  useEffect(() => {
    if (!simulating) return;
    const interval = setInterval(() => {
      setPacketStep((prev) => (prev + 1) % nodes.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [simulating, nodes.length]);

  const currentNodeData = nodes.find((n) => n.id === activeNode) || nodes[0];

  const triggerManualSimulation = () => {
    labAudio.playTelemetryChime();
    setPacketStep(0);
    const newLog = `[${new Date().toLocaleTimeString('en-GB')}] MANUAL_TEST: Diagnostic transaction initiated across all 7 pipeline nodes`;
    setLogs((prev) => [newLog, ...prev.slice(0, 6)]);
  };

  return (
    <div className="py-10 lab-container archival-bg-grid min-h-[90vh]">
      {/* Top Archival Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            INDUSTRY APPOINTMENT // DIXON TECHNOLOGIES (INDIA) LTD.
          </span>
          <span className="text-bronze-400">|</span>
          <span>ENTERPRISE AI ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-espresso-900 font-medium">ROLE: SOFTWARE DEVELOPER INTERN</span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-cyan font-bold">19 JUN 2026 – 31 JUL 2026</span>
        </div>
      </div>

      {/* Main Title & Executive Summary */}
      <div className="mb-10">
        <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
          // PRODUCTION CASE STUDY
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-espresso-950 mt-1">
          AI Employee Assistant Bot for Microsoft Teams
        </h1>
        <p className="mt-3 font-sans text-base text-espresso-800 max-w-4xl leading-relaxed">
          Architected and shipped an enterprise-grade AI employee assistant integrated directly into Microsoft Teams. The system streamlines organizational workflows, performs low-latency NLP intent classification on employee queries, retrieves operational records from MongoDB Atlas, and engages Google Gemini as an autonomous AI fallback layer for complex natural-language synthesis.
        </p>
      </div>

      {/* Interactive System Architecture Pipeline Visualizer */}
      <div className="lab-card-dark p-6 border border-bronze-500/40 shadow-panel mb-10 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-espresso-700/80 font-mono text-xs text-ivory-200">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-bronze-400" />
            <span className="font-bold text-bronze-300">
              SYSTEM ARCHITECTURE // 7-STAGE PIPELINE FLOW
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerManualSimulation}
              className="px-3 py-1 bg-bronze-500 text-espresso-950 font-bold text-[11px] hover:bg-bronze-400 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>DISPATCH TEST PACKET</span>
            </button>
            <span className="text-[11px] text-taupe-400">
              CLICK ANY NODE TO INSPECT PAYLOAD
            </span>
          </div>
        </div>

        {/* The 7 Nodes Linear & Responsive Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8 relative">
          {nodes.map((node, index) => {
            const isCurrentPacket = packetStep === index;
            const isSelected = activeNode === node.id;

            return (
              <div
                key={node.id}
                onClick={() => {
                  labAudio.playClick();
                  setActiveNode(node.id);
                }}
                className={`cursor-pointer p-3 border rounded-sm transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-espresso-800 border-bronze-400 shadow-md ring-1 ring-bronze-400'
                    : 'bg-espresso-900/90 border-espresso-700 hover:border-bronze-600/60'
                }`}
              >
                {/* Active packet marker */}
                {isCurrentPacket && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-telemetry-cyan animate-ping"></span>
                )}

                <div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-taupe-400 mb-1">
                    <span>STAGE 0{index + 1}</span>
                    <span className="text-telemetry-cyan font-semibold">{node.latency}</span>
                  </div>
                  <div className="font-display font-bold text-xs text-ivory-100 leading-tight">
                    {node.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-espresso-700/60 font-mono text-[9px] text-bronze-300 truncate">
                  {node.tech}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Node Deep-Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-espresso-950/80 p-5 border border-bronze-700/40">
          {/* Left: Node Description & Role (7 cols) */}
          <div className="lg:col-span-7 space-y-3 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-bronze-500/20 text-bronze-300 border border-bronze-500/40 font-bold">
                {currentNodeData.category}
              </span>
              <span className="text-taupe-400 text-[11px] font-semibold">
                TECH: <span className="text-ivory-100">{currentNodeData.tech}</span>
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-ivory-50">
              {currentNodeData.name}
            </h3>

            <p className="font-sans text-sm text-taupe-300 leading-relaxed">
              {currentNodeData.description}
            </p>

            <div className="pt-2 flex items-center gap-4 text-[11px]">
              <div>
                <span className="text-taupe-400">BENCHMARK LATENCY: </span>
                <span className="text-telemetry-cyan font-bold">{currentNodeData.latency}</span>
              </div>
              <div>
                <span className="text-taupe-400">STATUS: </span>
                <span className="text-telemetry-emerald font-bold">PRODUCTION READY</span>
              </div>
            </div>
          </div>

          {/* Right: Live JSON Payload Inspector (5 cols) */}
          <div className="lg:col-span-5 bg-espresso-900 border border-bronze-700/30 p-3.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px] text-bronze-400 pb-2 border-b border-espresso-800 mb-2">
              <span>ACTIVE DATA BUFFER // INSPECT</span>
              <span className="text-telemetry-cyan">JSON VALIDATED</span>
            </div>
            <pre className="text-ivory-200 overflow-x-auto text-[10px] leading-relaxed p-1">
              {currentNodeData.samplePayload}
            </pre>
          </div>
        </div>
      </div>

      {/* Lower Row: System Logs Terminal & CI/CD Pipeline Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Real-time System Logs Terminal (6 cols) */}
        <div className="lg:col-span-6 lab-card-dark p-5 border border-bronze-500/30 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/80 mb-3 text-ivory-100">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-telemetry-cyan" />
              <span className="font-bold text-bronze-300">DIXON BOT TELEMETRY CONSOLE</span>
            </div>
            <span className="text-[10px] text-telemetry-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-telemetry-emerald animate-pulse"></span>
              STREAMING
            </span>
          </div>

          <div className="space-y-2 text-[11px] text-taupe-300 bg-espresso-950 p-3 border border-espresso-800 max-h-56 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="leading-tight flex items-start gap-2">
                <span className="text-bronze-400 select-none">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[10px] text-taupe-400 flex items-center justify-between">
            <span>THREAD POOL: 8 WORKERS</span>
            <span>MEMORY FOOTPRINT: 142MB</span>
          </div>
        </div>

        {/* GitHub Actions CI/CD & Deployment Architecture (6 cols) */}
        <div className="lg:col-span-6 lab-card-light p-6 border border-bronze-400/40">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-bronze-300/40">
            <GitBranch className="w-5 h-5 text-bronze-600" />
            <h2 className="font-display font-bold text-lg text-espresso-950">
              CI/CD Pipeline & Enterprise Release
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-ivory-50 border border-bronze-300/50 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-telemetry-emerald flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-espresso-950">
                  GitHub Actions Automated Workflow
                </div>
                <div className="text-[11px] text-espresso-800 mt-1 leading-relaxed">
                  Every commit triggers automated linting (ESLint), secret scanning, unit testing with mock Teams turn contexts, and npm packaging before artifact staging.
                </div>
              </div>
            </div>

            <div className="p-3 bg-ivory-50 border border-bronze-300/50 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-telemetry-emerald flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-espresso-950">
                  Zero-Downtime Azure App Service Deployment
                </div>
                <div className="text-[11px] text-espresso-800 mt-1 leading-relaxed">
                  Direct deployment via Azure WebApp deployment slots ensuring continuous availability with automated rollback triggers if health probes fail.
                </div>
              </div>
            </div>

            <div className="p-3 bg-ivory-50 border border-bronze-300/50 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-telemetry-emerald flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-espresso-950">
                  Stakeholder Technical Documentation
                </div>
                <div className="text-[11px] text-espresso-800 mt-1 leading-relaxed">
                  Produced comprehensive architectural schematics, sequence diagrams, and maintenance playbooks for Dixon Technologies engineering leadership review.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-bronze-300/40 flex justify-end">
            <button
              onClick={() => {
                labAudio.playClick();
                setRoute('vayushetra');
              }}
              className="text-xs font-mono font-bold text-bronze-600 hover:text-espresso-950 flex items-center gap-1.5"
            >
              <span>NEXT: EXPLORE FLAGSHIP PROJECT — VAYUSHETRA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
