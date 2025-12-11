import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Anchor } from 'lucide-react'; // Added icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? "text-accent-gold" : "text-gray-200";
  
  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="relative z-50 px-6 py-6 md:px-12 backdrop-blur-sm bg-deep-teal/20 border-b border-white/5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white hover:opacity-80 transition flex items-center gap-2">
           SONAR
        </Link>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link to="/" className={`${isActive('/')} hover:text-accent-gold transition-colors`}>Home</Link>
          <Link to="/analyze" className={`${isActive('/analyze')} hover:text-accent-gold transition-colors`}>Analyzer</Link>
          <Link to="/about" className={`${isActive('/about')} hover:text-accent-gold transition-colors`}>About Project</Link>
          
          <Link to="/analyze">
            <button className="border border-white px-6 py-2 text-sm font-medium hover:bg-white hover:text-deep-teal transition-all duration-300">
              Launch System
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button (Visible only on Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white hover:text-accent-gold transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-deep-teal/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fade-in-down">
          <div className="flex flex-col py-8 px-6 space-y-6 text-center">
            <Link onClick={closeMenu} to="/" className="text-lg font-medium text-white hover:text-accent-gold">Home</Link>
            <Link onClick={closeMenu} to="/analyze" className="text-lg font-medium text-white hover:text-accent-gold">Analyzer</Link>
            <Link onClick={closeMenu} to="/about" className="text-lg font-medium text-white hover:text-accent-gold">About</Link>
            <Link onClick={closeMenu} to="/analyze" className="pt-4">
              <button className="w-full border border-accent-gold text-accent-gold px-6 py-3 font-bold hover:bg-accent-gold hover:text-black transition">
                LAUNCH SYSTEM
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;