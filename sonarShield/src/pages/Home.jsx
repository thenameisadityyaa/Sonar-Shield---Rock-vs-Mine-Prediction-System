import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, ShieldAlert, Radio, Activity, Lock, Globe, Target } from 'lucide-react';

const Home = () => {
  // 1. Define the text once so we can duplicate it easily
  const tickerContent = "// RESTRICTED ACCESS // LEVEL 5 SECURITY CLEARANCE REQUIRED // LIVE FEED: ATLANTIC SECTOR 7G // SYSTEM STATUS: OPERATIONAL // THREAT LEVEL: MODERATE // ENCRYPTION: AES-256 ACTIVE";

  return (
    <div className="relative z-10 w-full min-h-screen bg-deep-teal font-mono overflow-x-hidden">
      
      {/* 1. MILITARY HUD OVERLAY (Grid Lines) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10" 
           style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}>
      </div>

      {/* 2. INFINITE SCROLLING TICKER */}
      <div className="bg-black/80 border-b border-white/10 py-2 sticky top-0 z-50 backdrop-blur-md flex overflow-hidden">
        
        {/* COPY 1: Moves from 0% to -100% */}
        <div className="animate-marquee whitespace-nowrap flex items-center min-w-full shrink-0">
           <span className="text-[10px] text-accent-gold tracking-[0.2em] font-bold px-4">
             {tickerContent}
           </span>
        </div>

        {/* COPY 2: Follows immediately behind Copy 1 */}
        <div className="animate-marquee whitespace-nowrap flex items-center min-w-full shrink-0">
           <span className="text-[10px] text-accent-gold tracking-[0.2em] font-bold px-4">
             {tickerContent}
           </span>
        </div>

      </div>

      {/* 3. HERO SECTION */}
      <section className="flex flex-col justify-center min-h-[85vh] px-6 md:px-12 relative pb-20 pt-12">
        
        {/* Decorative HUD Corners */}
        <div className="absolute top-20 left-6 w-8 h-8 border-t-2 border-l-2 border-accent-gold opacity-50"></div>
        <div className="absolute top-20 right-6 w-8 h-8 border-t-2 border-r-2 border-accent-gold opacity-50"></div>
        <div className="absolute bottom-20 left-6 w-8 h-8 border-b-2 border-l-2 border-accent-gold opacity-50"></div>
        <div className="absolute bottom-20 right-6 w-8 h-8 border-b-2 border-r-2 border-accent-gold opacity-50"></div>

        <div className="w-full text-center md:text-left mt-12 mb-auto md:mb-10">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-400 text-xs tracking-[0.2em] font-bold uppercase mb-8 animate-pulse">
            <Lock size={12} /> Classified // Eyes Only
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter opacity-90 leading-none mb-6">
            TACTICAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-white">SONAR</span> ARRAY
          </h1>
          
          <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-light leading-relaxed border-l-2 border-accent-gold pl-6 ml-1 ">
            Autonomous underwater threat identification system utilizing <span className="text-white font-bold">Random Forest Classification</span> to differentiate between benign geological formations and active naval mine threats.
          </p>
        </div>

        {/* Hero Bottom Grid */}
        <div className="mt-16 md:mt-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          <div className="col-span-1 md:col-span-5 lg:col-span-4 bg-black/60 backdrop-blur-md p-8 border border-white/20 hover:border-accent-gold transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold/50 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Crosshair className="text-accent-gold" /> ENGAGE SYSTEM
            </h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed uppercase tracking-wider">
              Upload signal intelligence (SIGINT) data for immediate threat analysis.
            </p>
            <Link to="/analyze" className="w-full bg-accent-gold/10 border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-black font-bold py-3 px-4 flex items-center justify-center gap-3 transition-colors uppercase tracking-widest text-sm">
              Initialize Sequence <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hidden md:block col-span-7 pb-4">
            <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
              <div className="bg-black/40 p-6 backdrop-blur-sm text-center">
                <Target className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">98.4%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Target Accuracy</p>
              </div>
              <div className="bg-black/40 p-6 backdrop-blur-sm text-center">
                <Activity className="w-6 h-6 text-accent-gold mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">60</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Signal Bands</p>
              </div>
              <div className="bg-black/40 p-6 backdrop-blur-sm text-center">
                <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">&lt;50ms</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Latency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OPERATIONAL CAPABILITIES */}
      <section className="bg-black/80 backdrop-blur-md border-t border-white/10 py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase mb-2">Operational Capabilities</h2>
              <p className="text-accent-gold text-xs tracking-[0.3em] uppercase">System Architecture V2.4</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500">SECTOR: DEFENSE</p>
              <p className="text-xs text-gray-500">AUTHORITY: NAVAL COMMAND</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white/5 border border-white/5 hover:border-accent-gold/50 transition duration-300 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <p className="text-[100px] font-black leading-none text-white/5">01</p>
              </div>
              <div className="bg-blue-500/20 p-3 w-fit mb-6 border border-blue-500/30">
                <Radio className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Target Acquisition</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Wide-band frequency modulation (FM) sonar sweeps intercept underwater acoustic signatures. Data is normalized into 60-float vectors.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/5 hover:border-accent-gold/50 transition duration-300 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <p className="text-[100px] font-black leading-none text-white/5">02</p>
              </div>
              <div className="bg-accent-gold/20 p-3 w-fit mb-6 border border-accent-gold/30">
                <Activity className="text-accent-gold w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Algorithmic Processing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Random Forest Ensemble executes 100 concurrent decision trees to classify material density. Resistant to overfitting in noisy environments.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/5 hover:border-red-500/50 transition duration-300 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <p className="text-[100px] font-black leading-none text-white/5">03</p>
              </div>
              <div className="bg-red-500/20 p-3 w-fit mb-6 border border-red-500/30">
                <ShieldAlert className="text-red-400 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Threat Designation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Immediate IFF (Identification Friend or Foe) output. High-confidence "Mine" results trigger automated EOD (Explosive Ordnance Disposal) alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;