import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-deep-teal font-sans overflow-hidden text-white">
        
        {/* GLOBAL BACKGROUND: Persists across all pages */}
        <div 
          className="fixed inset-0 bg-split-level bg-cover bg-center bg-no-repeat z-0 scale-105"
          style={{ filter: 'brightness(0.7) contrast(1.1)' }} 
        />
        {/* Overlay for readability */}
        <div className="fixed inset-0 bg-gradient-to-t from-deep-teal/95 via-deep-teal/50 to-black/30 z-0 pointer-events-none" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          {/* Routes handle switching the main content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyzer />} />
            <Route path="/about" element={<About />} />
          </Routes>

          {/* Optional Footer */}
          <footer className="bg-black py-8 border-t border-white/10 text-center">
        <p className="text-red-500/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
          Warning: Unauthorized access to this system is a federal offense
        </p>
        <p className="text-gray-600 text-xs font-mono">
          © 2025 DEPT OF DEFENSE • PROJECT DEEP SCAN • SECURE CONNECTION ESTABLISHED
        </p>
      </footer>
      
        </div>

      </div>
    </Router>
  );
};

export default App;