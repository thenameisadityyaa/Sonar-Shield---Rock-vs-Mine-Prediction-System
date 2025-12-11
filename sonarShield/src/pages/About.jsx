import React from 'react';
import { Database, GitBranch, Shield, Code, Server, Layers } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 relative z-10 overflow-y-auto">
      
      {/* HEADER SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 animate-fade-in">
          PROJECT <span className="text-accent-gold">INTEL</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in-up">
          A deep-learning initiative developed to assist naval operations in automating the classification of underwater objects using sonar return data.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-deep-teal/40 backdrop-blur-md border-l-4 border-accent-gold p-8 rounded-r-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="text-accent-gold" /> Mission Statement
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Naval mine detection has historically relied on human operators interpreting grainy sonar images. This process is slow, fatigue-prone, and error-sensitive.
          </p>
          <p className="text-gray-300 leading-relaxed">
            **Deep Scan** utilizes a **Random Forest Classifier** to analyze 60 discrete frequency bands. By aggregating multiple decision trees, we achieve higher accuracy than single models.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Database className="text-blue-400" /> Dataset Telemetry
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Source</p>
              <p className="text-xl font-bold text-white">UCI Repository</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Samples</p>
              <p className="text-xl font-bold text-white">208 Total</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Attributes</p>
              <p className="text-xl font-bold text-white">60 Real-Valued</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Classes</p>
              <p className="text-xl font-bold text-white">Binary (M/R)</p>
            </div>
          </div>
        </div>
      </div>

      {/* TECH STACK GRID */}
      <div className="max-w-6xl mx-auto mb-20">
        <h3 className="text-xl font-bold text-white mb-8 text-center uppercase tracking-widest opacity-80">
          — System Architecture —
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-deep-teal/30 hover:bg-deep-teal/60 border border-white/5 hover:border-accent-gold/50 p-6 rounded-xl transition-all duration-300">
            <Code className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-white mb-2">Frontend Core</h4>
            <p className="text-sm text-gray-400">Built with React.js and Vite for ultra-fast rendering. Styled with Tailwind CSS for military-grade responsiveness.</p>
          </div>

          <div className="group bg-deep-teal/30 hover:bg-deep-teal/60 border border-white/5 hover:border-blue-400/50 p-6 rounded-xl transition-all duration-300">
            <Server className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-white mb-2">Processing Unit</h4>
            <p className="text-sm text-gray-400">Simulated Python backend integration. Capable of parsing CSV bitstreams and normalizing data vectors in &lt;50ms.</p>
          </div>

          <div className="group bg-deep-teal/30 hover:bg-deep-teal/60 border border-white/5 hover:border-purple-400/50 p-6 rounded-xl transition-all duration-300">
            <Layers className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-white mb-2">Random Forest</h4>
            <p className="text-sm text-gray-400">Ensemble learning method operating by constructing a multitude of decision trees. Output is the class selected by most trees.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;