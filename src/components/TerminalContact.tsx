import React, { useState, useRef, useEffect } from 'react';
import { PageRoute } from '../types';
import { labAudio } from '../utils/audio';
import { Terminal, Mail, Phone, Linkedin, Github, FileDown, Send, Check, Copy, Radio, ArrowLeft } from 'lucide-react';

interface TerminalContactProps {
  setRoute: (route: PageRoute) => void;
}

export const TerminalContact: React.FC<TerminalContactProps> = ({ setRoute }) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [cliHistory, setCliHistory] = useState<string[]>([
    'PRINCE AUTONOMOUS LAB // TERMINAL PROTOCOL V4.2',
    'TYPE "help" TO LIST AVAILABLE DIAGNOSTIC INSTRUCTIONS',
    'DIRECT COMMS CHANNELS: READY FOR TRANSMISSION',
  ]);

  const historyEndRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, isPhone = false) => {
    labAudio.playClick();
    navigator.clipboard.writeText(text);
    if (isPhone) {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    labAudio.playKey();
    const newHistory = [...cliHistory, `> ${inputVal}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'AVAILABLE COMMANDS:',
          '  about       - Inspect academic and engineering philosophy',
          '  projects    - List major operational projects',
          '  achieve     - View competitive hackathon & academic honors',
          '  status      - Query current autonomous lab kinematics',
          '  resume      - Trigger Prince Shukla resume download',
          '  contact     - Display direct contact channels',
          '  clear       - Purge terminal buffer'
        );
        break;
      case 'achieve':
      case 'achievements':
        newHistory.push(
          'ENGINEERING RECORDS & COMPETITIVE HONORS:',
          '  ★ TOP 5: InnovateNSUT\'25 Hackathon (NSUT Delhi, 2025)',
          '  ★ TOP 50: ACTS EDC Brainwave Hackathon (1,500+ participants, 2026)',
          '  ★ 91% CBSE Class XII: Senior Secondary (R.P.V.V, 2024)',
          '  ★ 88% CBSE Class X: Secondary School Examination'
        );
        break;
      case 'about':
        newHistory.push('ROUTING TO: ABOUT & RESEARCH ARCHIVE...');
        setTimeout(() => setRoute('about'), 500);
        break;
      case 'projects':
        newHistory.push(
          'PROJECT DIRECTORY:',
          '  01. Vayushetra (Satellite AQI ML Intelligence)',
          '  02. Guard Attendance (Haversine 3D Geofence)',
          '  03. AI Employee Assistant (Dixon Teams Bot)',
          '  04. Tech Layoffs Analytics (Quantitative Data Lab)',
          '  05. 11 Towers (Society Management Platform)'
        );
        break;
      case 'status':
        newHistory.push(
          'TELEMETRY CHECK: [NOMINAL]',
          '  KINEMATICS: 6-DOF Active // Gaze synchronized',
          '  NEURAL LOAD: 38.4% Nominal',
          '  LOCATION: Delhi, India',
          '  AVAILABILITY: OPEN FOR SOFTWARE / AI / ROBOTICS ROLES'
        );
        break;
      case 'resume':
        newHistory.push('INITIATING RESUME DOWNLOAD PROTOCOL: Prince_Shukla_Resume.pdf');
        const link = document.createElement('a');
        link.href = '/Prince_Shukla_Resume.pdf';
        link.download = 'Prince_Shukla_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'contact':
        newHistory.push(
          'DIRECT CONTACT INFORMATION:',
          '  EMAIL: shukla8331@gmail.com',
          '  PHONE: +91-8595640363',
          '  LINKEDIN: linkedin.com/in/prince-shukla',
          '  GITHUB: github.com'
        );
        break;
      case 'clear':
        setCliHistory(['BUFFER PURGED. READY.']);
        setInputVal('');
        return;
      default:
        newHistory.push(`UNKNOWN COMMAND: "${cmd}". TYPE "help" FOR PROTOCOL COMMANDS.`);
    }

    setCliHistory(newHistory);
    setInputVal('');
  };

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliHistory]);

  return (
    <div className="py-10 lab-container min-h-[90vh]">
      {/* Top Header Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-bronze-500/30 pb-4 mb-8 font-mono text-xs text-taupe-400">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-bronze-600" />
          <span className="text-bronze-600 font-bold tracking-wider">
            COMMUNICATIONS TERMINAL // COMM-PORT-443
          </span>
          <span className="text-bronze-400">|</span>
          <span className="text-telemetry-emerald font-semibold">ALL CHANNELS SECURE & LISTENING</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              labAudio.playClick();
              setRoute('command-center');
            }}
            className="hover:text-espresso-950 flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COMMAND CENTER</span>
          </button>
        </div>
      </div>

      {/* Hero Invitation Statement */}
      <div className="mb-10">
        <span className="font-mono text-xs text-bronze-600 uppercase tracking-widest font-semibold">
          // INITIATE TRANSMISSION
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-espresso-950 tracking-tight mt-1">
          READY TO BUILD SOMETHING INTELLIGENT?
        </h1>
        <p className="font-mono text-sm sm:text-base text-bronze-600 font-semibold mt-2">
          Software Development • Applied AI/ML • Geospatial Intelligence • Robotics
        </p>
        <p className="mt-4 font-sans text-base text-espresso-800 max-w-3xl leading-relaxed">
          Whether you are exploring production AI integrations, full-stack architectural builds, autonomous robotics telemetry, or engineering collaborations — the laboratory communication channels are open.
        </p>
      </div>

      {/* Dual Column: Interactive CLI Terminal + Direct Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: The Laboratory CLI Terminal Console (7 cols) */}
        <div className="lg:col-span-7 lab-card-dark p-5 border border-bronze-500/40 shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 border-b border-espresso-700/80 mb-4 font-mono text-xs text-ivory-200">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-bronze-400" />
              <span className="font-bold text-bronze-300">LABORATORY CONSOLE // BASH-EMULATOR</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-taupe-400">
              <span className="w-2 h-2 rounded-full bg-telemetry-emerald"></span>
              <span>PORT: 443/TLS</span>
            </div>
          </div>

          {/* Terminal Output Window */}
          <div className="bg-espresso-950 p-4 border border-espresso-800 font-mono text-xs text-ivory-100 h-80 overflow-y-auto space-y-1.5 shadow-inner">
            {cliHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={`${line.startsWith('>') ? 'text-bronze-300 font-bold' : 'text-taupe-300'}`}
              >
                {line}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* Interactive Command Input */}
          <form onSubmit={handleCommandSubmit} className="mt-3 flex items-center gap-2 font-mono text-xs">
            <span className="text-bronze-400 font-bold select-none">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder='Type "help", "projects", "resume", "status"...'
              className="flex-1 bg-espresso-950 border border-espresso-700 px-3 py-2 text-ivory-100 placeholder-taupe-400 focus:outline-none focus:border-bronze-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-bronze-500 text-espresso-950 font-bold hover:bg-bronze-400 transition-all flex items-center gap-1"
            >
              <span>SEND</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

          <div className="mt-2 text-[10px] font-mono text-taupe-400 flex items-center justify-between">
            <span>INPUT: INTERACTIVE LABORATORY DIRECTORY</span>
            <span className="text-bronze-400">TRY: "resume" OR "projects"</span>
          </div>
        </div>

        {/* Right: Direct Communications Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Action Card */}
          <div className="lab-card-light p-5 border border-bronze-400/50 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-bronze-300/40 font-mono text-xs">
              <span className="text-bronze-600 font-bold uppercase">// PRIMARY EMAIL DISPATCH</span>
              <span className="text-taupe-400 text-[10px]">DIRECT INBOX</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ivory-50 border border-bronze-300/60 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-bronze-600" />
                </div>
                <div>
                  <div className="font-mono text-xs text-taupe-400">ELECTRONIC MAIL</div>
                  <a 
                    href="mailto:shukla8331@gmail.com"
                    className="font-mono text-sm font-bold text-espresso-950 hover:text-bronze-600 transition-colors"
                  >
                    shukla8331@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('shukla8331@gmail.com')}
                className="p-2 border border-bronze-300 bg-ivory-50 hover:bg-bronze-500 hover:text-espresso-950 transition-all"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-telemetry-emerald" /> : <Copy className="w-4 h-4 text-espresso-800" />}
              </button>
            </div>
          </div>

          {/* Telephone & Cellular */}
          <div className="lab-card-light p-5 border border-bronze-400/50 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-bronze-300/40 font-mono text-xs">
              <span className="text-bronze-600 font-bold uppercase">// VOICE & CELLULAR LINK</span>
              <span className="text-taupe-400 text-[10px]">DELHI, INDIA</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ivory-50 border border-bronze-300/60 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-telemetry-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-taupe-400">TELEPHONE / WHATSAPP</div>
                  <a 
                    href="tel:+918595640363"
                    className="font-mono text-sm font-bold text-espresso-950 hover:text-bronze-600 transition-colors"
                  >
                    +91-8595640363
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard('+918595640363', true)}
                className="p-2 border border-bronze-300 bg-ivory-50 hover:bg-bronze-500 hover:text-espresso-950 transition-all"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-telemetry-emerald" /> : <Copy className="w-4 h-4 text-espresso-800" />}
              </button>
            </div>
          </div>

          {/* Professional Network Links */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://www.linkedin.com/in/prince-shukla-315183313/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => labAudio.playClick()}
              className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/40 hover:bg-espresso-800 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Linkedin className="w-5 h-5 text-bronze-300" />
                <span className="text-[9px] font-mono text-taupe-400">EXTERNAL</span>
              </div>
              <div className="mt-3">
                <div className="font-mono text-[10px] text-taupe-400 uppercase">PROFESSIONAL</div>
                <div className="font-display font-bold text-sm text-ivory-50">LinkedIn Profile</div>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => labAudio.playClick()}
              className="p-4 bg-espresso-900 text-ivory-100 border border-bronze-500/40 hover:bg-espresso-800 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <Github className="w-5 h-5 text-bronze-300" />
                <span className="text-[9px] font-mono text-taupe-400">REPOSITORIES</span>
              </div>
              <div className="mt-3">
                <div className="font-mono text-[10px] text-taupe-400 uppercase">SOURCE CODE</div>
                <div className="font-display font-bold text-sm text-ivory-50">GitHub Account</div>
              </div>
            </a>
          </div>

          {/* Download Official Resume Action */}
          <a
            href="/Prince_Shukla_Resume.pdf"
            download="Prince_Shukla_Resume.pdf"
            onClick={() => labAudio.playClick()}
            className="w-full py-3.5 px-4 bg-bronze-500 text-espresso-950 font-mono text-xs font-bold hover:bg-bronze-400 transition-all flex items-center justify-center gap-2 border border-bronze-600 shadow-md block text-center"
          >
            <FileDown className="w-4 h-4" />
            <span>DOWNLOAD OFFICIAL RESUME [PDF]</span>
          </a>
        </div>
      </div>
    </div>
  );
};
