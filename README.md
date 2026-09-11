# PRINCE // Autonomous Systems, Robotics & AI/ML Engineer

> **Futuristic Autonomous Laboratory × Engineering Archive × Real-Time 3D Digital System**  
> Portfolio & Technical Repository of **Prince Shukla** — B.Tech in Automation & Robotics at USAR (GGSIPU), Delhi.

---

## 🔬 System Overview & Visual Philosophy
This portfolio is constructed with an editorial archival aesthetic inspired by precision laboratory instruments and industrial computing terminals:
- **Color Palette**: Warm Ivory (`#F6F3EC`), Deep Espresso-Black (`#121110`), Antique Bronze (`#B08C57`), and Restrained Telemetry Cyan (`#47949B`).
- **Typography**: Editorial serif headings (`Cinzel` / `Playfair Display`), technical monospaced documentation (`JetBrains Mono`), and clean modern body (`Outfit`).
- **Continuous Millimeter Grid**: Fixed archival engineering grid running across the entire viewport.
- **Fluid Multi-Zoom Responsiveness**: Dynamically scales and reflows content from **55% zoom / ultra-wide 4K viewports** to standard **100% zoom laptops** without letterboxing or dead margins.

---

## ⚡ Key Highlights & Engineering Modules

### 1. Interactive 3D Autonomous Simulation
- **Three.js & WebGL**: Articulated humanoid robot loaded from FBX with high-fidelity PBR textures (Diffuse, Normal, Roughness, AO, Emission).
- **Smooth Cursor Gaze & Head Articulation**:
  - Full-screen cursor coordinate tracking via lerp interpolation.
  - Articulated **Head Bone Pitch** (upwards/downwards tilt $\pm 24^\circ$) and **Head Yaw** (left/right turn $\pm 26^\circ$).
  - 20% harmonic spine flexure for anatomical humanoid posture.
  - Native `ResizeObserver` maintaining pixel-perfect aspect ratio across all zoom levels.
  - Live sensory telemetry HUD reporting real-time pitch, yaw, target coordinates, and FPS.

### 2. Research & Production Deployments
- **Vayushetra Atmospheric Intelligence**:
  - High-precision predictive modeling combining **Sentinel-5P TROPOMI** satellite tropospheric columns and **NASA VIIRS (375m)** active fire thermal hotspots.
  - Machine learning pipeline with **XGBoost** and **TreeSHAP** feature attribution ($R^2 = 0.89$ benchmarked across 706 pan-India spatial partition cells).
- **AI Employee Assistant (Dixon Technologies)**:
  - Enterprise Microsoft Teams conversational agent built with **Azure Bot Framework**, **Node.js**, **wink-nlp**, and **Google Gemini Pro** fallbacks.
  - Reduced internal HR ticket resolution latency by 68%.
- **Guard Attendance Management System**:
  - Sub-meter **Haversine Geodesy Engine** calculating field security distance from pre-configured site geofence vertices in real-time.
  - Anti-spoofing telemetry, biometric shift logs, and PostgreSQL relational storage.
- **Tech Layoffs Macroeconomic Analytics**:
  - Python, Pandas, and NumPy statistical pipeline processing 1,140+ tech company workforce restructuring datasets with interactive Plotly Dash visualizations.
- **11 Towers Real Estate Platform**:
  - High-concurrency full-stack property platform with dynamic floorplan filtering and responsive state management.

### 3. Competitive Hackathons & Distinctions
- **InnovateNSUT'25 (NSUT Delhi)**: **TOP 5 FINALISTS** — Designed and pitched high-impact software engineering architectures under competitive constraints at Netaji Subhas University of Technology, Delhi.
- **ACTS EDC Brainwave Hackathon 2026**: **TOP 50 FINALISTS** — Outperformed over 1,500+ engineering participants (Top 3.3% cohort).
- **Academic Foundation**: 91% in CBSE Class XII (R.P.V.V Delhi) and 88% in CBSE Class X.

### 4. Interactive Laboratory Terminal (`>_`)
- In-browser CLI emulator accepting commands: `help`, `status`, `projects`, `achieve`, `resume`, `contact`, `clear`.
- Audio feedback synthesized using the **Web Audio API** for tactile mechanical clicks.
- Direct PDF resume download (`Prince_Shukla_Resume.pdf`) served with strict binary MIME headers.

---

## 🛠️ Technical Stack
- **Core Framework**: React 18, TypeScript, Vite
- **3D Graphics**: Three.js (r160), WebGL, FBXLoader, PBR Standard Materials
- **Styling**: Tailwind CSS, Vanilla CSS Design System (`.lab-container`), Custom Grid Utilities
- **Audio**: Web Audio API Sound Synthesizer
- **Icons**: Lucide React
- **Deployment**: Vite SPA static build

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
```bash
# Clone the repository
git clone https://github.com/Princegitb/Prince_Portfolio.git

# Navigate into directory
cd Prince_Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📜 Personnel & Citation
- **Engineer**: Prince Shukla
- **Affiliation**: University School of Automation & Robotics (USAR), GGSIPU, Delhi
- **Degree**: B.Tech in Automation & Robotics (2024 – 2028)
- **Archive Reference**: `05719052024-AR`
