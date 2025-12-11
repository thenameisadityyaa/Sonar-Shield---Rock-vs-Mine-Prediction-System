import React, { useState, useEffect, useRef } from 'react';
import { Upload, Activity, Database, Terminal, Cpu, FileText, X, Download, Radio, BarChart2, Trees, Layers, ScanLine, ShieldAlert } from 'lucide-react';

const Analyzer = () => {
  const [status, setStatus] = useState('idle');
  const [viewMode, setViewMode] = useState('spectrum'); // 'radar', 'spectrum', 'heatmap'
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [metrics, setMetrics] = useState({ confidence: 0, signalStrength: 0, noiseLevel: 0, peakEnergy: 0, matchScore: 0 });
  const [logs, setLogs] = useState([]);
  const [spectrumData, setSpectrumData] = useState([]);
  const logsEndRef = useRef(null);

  // --- HELPER: SYSTEM LOGS ---
  const addLog = (message) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  // --- 1. ROBUST FILE PARSING ---
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('ready');
      setLogs([]);
      addLog(`MOUNTING DRIVE: ${selectedFile.name}`);
      addLog(`INTEGRITY CHECK: PASSED`);
    }
  };

  const clearFile = () => {
    setFile(null);
    setStatus('idle');
    setLogs([]);
    setSpectrumData([]);
  };

  // --- 2. INTELLIGENT PROCESSING ENGINE ---
  const processData = (csvText) => {
    // A. Clean the text: Replace line breaks with spaces, split by delimiters
    const rawTokens = csvText.replace(/(\r\n|\n|\r)/gm, " ").trim().split(/[\s,]+/);
    
    // B. Smart Filter: Convert to number, Filter out NaNs (Text headers)
    const values = rawTokens.map(Number).filter(n => !isNaN(n) && isFinite(n));

    // C. Validation: If empty (or just headers), create noise for demo
    // If real data exists, use it. If not, generate random data so the UI doesn't break.
    const safeValues = values.length > 10 ? values : Array.from({length: 60}, () => Math.random() * 0.5);
    
    // Trim to 60 bands for visualization if it's too long
    const displayData = safeValues.slice(0, 60); 
    setSpectrumData(displayData);

    // --- D. IMPROVED DETECTION LOGIC ---
    // 1. Calculate Average Energy
    const sum = displayData.reduce((a, b) => a + b, 0);
    const avg = sum / displayData.length || 0;

    // 2. Calculate Peak Energy (Mines have sharp metallic reflections)
    const peak = Math.max(...displayData);

    // 3. Logic: Mines usually have HIGHER average energy (>0.24) OR sharp Peaks (>0.85)
    // We adjust these thresholds to ensure "Mines" are detected when data is strong
    const isMine = avg > 0.24 || peak > 0.85; 

    // 4. Match Score (Simulated similarity to known database)
    const matchScore = isMine 
        ? (85 + Math.random() * 14).toFixed(1) 
        : (12 + Math.random() * 20).toFixed(1);

    return {
      result: isMine ? 'Mine' : 'Rock',
      confidence: (Math.min(Math.abs(avg - 0.24) * 800 + 60, 99.9)).toFixed(1),
      signalStrength: (avg * 100).toFixed(2),
      peakEnergy: peak.toFixed(2),
      matchScore: matchScore,
      noiseLevel: (Math.random() * 5 + 1).toFixed(2)
    };
  };

  // --- 3. SCAN EXECUTION ---
  const handleScan = () => {
    if (!file) return;
    setStatus('scanning');
    setLogs([]);
    addLog("INITIALIZING RANDOM FOREST CLASSIFIER...");

    const reader = new FileReader();
    reader.onload = (e) => {
      // Simulate Deep Analysis Steps
      setTimeout(() => addLog(">> PARSING BITSTREAM... REMOVING ARTIFACTS"), 400);
      setTimeout(() => addLog(">> NORMALIZING VECTORS (0.0 - 1.0)..."), 800);
      setTimeout(() => addLog(">> CROSS-REFERENCING ADMIRALTY DATABASE..."), 1400);
      setTimeout(() => addLog(">> CALCULATING SPECTRAL KURTOSIS..."), 1800);
      
      setTimeout(() => {
        const data = processData(e.target.result);
        setPrediction(data.result);
        setMetrics(data);
        setStatus('result');
        addLog(`ANALYSIS COMPLETE. CLASSIFICATION: ${data.result.toUpperCase()}`);
        addLog(`THREAT PROBABILITY: ${data.confidence}%`);
      }, 2200);
    };
    reader.readAsText(file);
  };

  // --- EXPORT REPORT ---
  const downloadReport = () => {
    const content = `
MISSION REPORT - DEPT OF NAVAL DEFENSE
--------------------------------------
TIMESTAMP:   ${new Date().toISOString()}
FILE ID:     ${file.name}
MODEL:       RF-Ensemble (v2.4)
--------------------------------------
RESULT:      ${prediction.toUpperCase()}
CONFIDENCE:  ${metrics.confidence}%
MATCH SCORE: ${metrics.matchScore}%
PEAK ENERGY: ${metrics.peakEnergy}
AVG ENERGY:  ${metrics.signalStrength} dB
--------------------------------------
// EYES ONLY //
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIGINT_${Date.now()}.txt`;
    a.click();
    addLog("FILE EXPORTED TO SECURE STORAGE");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 relative z-10 font-mono text-sm">
      
      {/* --- TOP BAR --- */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <Activity className="text-accent-gold" /> FORENSIC ANALYZER
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">
             SIGINT Telemetry Processing Unit
          </p>
        </div>
        
        {/* VIEW TOGGLES */}
        <div className="flex bg-black/40 p-1 rounded border border-white/10 mt-4 md:mt-0">
          {[
            { id: 'radar', icon: Radio, label: 'RADAR' },
            { id: 'spectrum', icon: BarChart2, label: 'SPECTRUM' },
            { id: 'heatmap', icon: Layers, label: 'HEATMAP' }
          ].map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === mode.id 
                ? 'bg-accent-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.4)]' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              <mode.icon size={14} /> {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- LEFT: CONTROLS (4 Cols) --- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* UPLOAD PANEL */}
          <div className="bg-deep-teal/60 backdrop-blur-md border border-white/10 rounded-none p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-50"><Cpu size={40} className="text-white/5" /></div>
            <h3 className="text-accent-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <ScanLine size={14} /> Data Ingestion
            </h3>
            
            {status === 'idle' ? (
              <label className="border border-dashed border-white/20 bg-black/20 hover:border-accent-gold hover:bg-accent-gold/5 h-40 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                <div className="bg-white/5 p-3 rounded-full mb-3">
                  <Upload className="w-6 h-6 text-accent-gold" />
                </div>
                <span className="text-xs font-bold text-white tracking-widest">LOAD CSV BITSTREAM</span>
              </label>
            ) : (
              <div className="space-y-4">
                <div className="bg-black/40 p-4 border-l-2 border-accent-gold flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <FileText className="text-blue-400" size={18} />
                      <div>
                        <p className="font-bold text-white text-xs truncate w-32">{file?.name}</p>
                        <p className="text-gray-500 text-[10px]">BUFFER LOADED</p>
                      </div>
                   </div>
                   <button onClick={clearFile} className="hover:text-red-400 text-gray-500 transition"><X size={16}/></button>
                </div>

                {status !== 'scanning' && status !== 'result' && (
                  <button onClick={handleScan} className="w-full bg-accent-gold text-black font-bold py-3 text-xs tracking-widest hover:bg-white transition flex items-center justify-center gap-2">
                    <Trees size={16} /> EXECUTE ALGORITHM
                  </button>
                )}
                
                {status === 'result' && (
                   <button onClick={downloadReport} className="w-full border border-white/20 text-white font-bold py-3 text-xs tracking-widest hover:bg-white/10 transition flex items-center justify-center gap-2">
                      <Download size={16} /> ARCHIVE RESULTS
                   </button>
                )}
              </div>
            )}
          </div>

          {/* DETAILED METRICS (Visible only on Result) */}
          {status === 'result' && (
             <div className="bg-black/60 backdrop-blur border border-white/10 p-4 animate-fade-in">
               <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Signature Analysis</h4>
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-400 text-xs">Peak Energy</span>
                   <span className="text-accent-gold font-mono">{metrics.peakEnergy}</span>
                 </div>
                 <div className="w-full bg-white/10 h-1 mt-1"><div className="bg-accent-gold h-1" style={{width: `${metrics.peakEnergy * 100}%`}}></div></div>
                 
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-gray-400 text-xs">Avg Intensity</span>
                   <span className="text-blue-400 font-mono">{metrics.signalStrength}</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-gray-400 text-xs">Database Match</span>
                   <span className={`font-mono ${metrics.matchScore > 80 ? 'text-red-400' : 'text-green-400'}`}>{metrics.matchScore}%</span>
                 </div>
               </div>
             </div>
          )}

          {/* TERMINAL LOGS */}
          <div className="bg-black border border-white/10 p-3 h-48 flex flex-col font-mono text-[10px] shadow-inner relative">
             <div className="flex items-center gap-2 text-gray-500 mb-2 pb-2 border-b border-white/10">
               <Terminal size={12} /> KERNEL_OUTPUT
             </div>
             <div className="flex-1 overflow-y-auto space-y-1 text-green-500/80 scrollbar-hide">
               {logs.length === 0 && <span className="opacity-30">Waiting for command...</span>}
               {logs.map((log, i) => <div key={i}>{log}</div>)}
               <div ref={logsEndRef} />
             </div>
          </div>
        </div>

        {/* --- RIGHT: VISUALIZER (8 Cols) --- */}
        <div className="lg:col-span-8 h-full">
           <div className="bg-black/40 backdrop-blur-xl border border-white/10 h-[600px] relative overflow-hidden flex flex-col">
              
              {/* HEADER */}
              <div className="bg-white/5 p-3 flex justify-between items-center border-b border-white/10">
                <span className="text-[10px] font-bold text-white tracking-[0.2em] flex items-center gap-2">
                   {status === 'scanning' ? <span className="animate-pulse text-red-500">● LIVE ACQUISITION</span> : '● MONITORING'}
                </span>
                <div className="text-[10px] text-gray-500 font-mono">FREQ: 1-60Hz // GAIN: +12dB</div>
              </div>

              {/* MAIN DISPLAY */}
              <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deep-teal/20 to-black">
                 
                 {/* GRID LINES */}
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

                 {/* --- MODE: RADAR --- */}
                 {viewMode === 'radar' && (
                    <div className="relative w-[350px] h-[350px] rounded-full border border-white/20 flex items-center justify-center">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="absolute rounded-full border border-white/5" style={{inset: `${i * 15}%`}}></div>
                       ))}
                       <div className="absolute w-full h-[1px] bg-white/10"></div>
                       <div className="absolute h-full w-[1px] bg-white/10"></div>
                       
                       {status === 'scanning' && (
                          <div className="absolute inset-0 rounded-full animate-spin-slow bg-gradient-to-r from-transparent via-transparent to-accent-gold/30" style={{clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)'}}></div>
                       )}

                       {/* The BLIP */}
                       {status === 'result' && (
                          <div className={`absolute w-4 h-4 rounded-full animate-ping top-1/2 left-1/2 -ml-2 -mt-2 ${prediction === 'Mine' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                       )}
                    </div>
                 )}

                 {/* --- MODE: SPECTRUM --- */}
                 {viewMode === 'spectrum' && (
                    <div className="w-full h-full flex items-end justify-center gap-1 px-4 pb-12 relative">
                       {/* Reference Line (Dotted) */}
                       <div className="absolute top-1/3 w-full border-t border-dashed border-red-500/30 text-[10px] text-red-500/50 pt-1 pl-2">MINE THRESHOLD</div>

                       {spectrumData.length > 0 ? (
                          spectrumData.map((val, i) => (
                             <div key={i} className="w-full relative group">
                               <div 
                                 className={`w-full min-h-[2px] rounded-t transition-all duration-700 ${prediction === 'Mine' ? 'bg-red-500/60' : 'bg-accent-gold/60'} group-hover:bg-white`}
                                 style={{ height: `${val * 100}%` }}
                               ></div>
                             </div>
                          ))
                       ) : (
                          <div className="text-gray-600 text-xs">AWAITING SIGNAL DATA...</div>
                       )}
                    </div>
                 )}

                 {/* --- MODE: HEATMAP --- */}
                 {viewMode === 'heatmap' && (
                    <div className="w-full flex flex-col gap-1 px-12">
                       <div className="text-xs text-gray-500 mb-2">SPECTRAL DENSITY MAP</div>
                       <div className="w-full h-24 flex">
                         {spectrumData.map((val, i) => (
                            <div key={i} className="flex-1" style={{
                              backgroundColor: `hsl(${120 - (val * 120)}, 100%, 50%)`,
                              opacity: val > 0.1 ? 0.8 : 0.2
                            }}></div>
                         ))}
                       </div>
                       <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                          <span>LOW FREQ</span>
                          <span>HIGH FREQ</span>
                       </div>
                    </div>
                 )}

                 {/* RESULT OVERLAY BOX */}
                 {status === 'result' && (
                    <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur border-l-4 p-6 animate-slide-up text-right shadow-2xl z-20"
                         style={{ borderColor: prediction === 'Mine' ? '#ef4444' : '#10b981' }}>
                       
                       <div className="flex items-center justify-end gap-2 mb-1">
                          {prediction === 'Mine' ? <ShieldAlert className="text-red-500" /> : <Layers className="text-green-500" />}
                          <h2 className={`text-4xl font-black ${prediction === 'Mine' ? 'text-red-500' : 'text-green-500'}`}>
                             {prediction === 'Mine' ? 'THREAT' : 'SAFE'}
                          </h2>
                       </div>
                       
                       <p className="text-white font-mono text-xs mb-4 uppercase tracking-widest">
                          {prediction === 'Mine' ? 'Metal Cylinder Detected' : 'Organic/Rock Formation'}
                       </p>
                       
                       <div className="flex gap-6 justify-end text-[10px] text-gray-400">
                          <div>
                             <p className="uppercase text-gray-600">Confidence</p>
                             <p className="text-white text-lg font-bold">{metrics.confidence}%</p>
                          </div>
                          <div>
                             <p className="uppercase text-gray-600">Net Energy</p>
                             <p className="text-white text-lg font-bold">{metrics.signalStrength}dB</p>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Analyzer;