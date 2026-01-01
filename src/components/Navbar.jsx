import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className={`text-2xl font-serif font-bold tracking-wide transition-colors ${isScrolled ? 'text-navy-900' : 'text-navy-900'}`}>
          AEM <span className="text-gold-400">Consulting</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-navy-800 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">features</a>
          <a href="#" className="text-navy-800 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">child wealth</a>
          <a href="#" className="text-navy-800 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">about</a>
          
          <button 
            onClick={() => navigate('/wizard')}
            className="px-6 py-2 border border-gold-400 text-gold-400 font-medium text-sm tracking-wide hover:bg-gold-400 hover:text-white transition-all duration-300"
          >
            Book Strategy Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-navy-900">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white absolute w-full border-t border-gray-100 shadow-lg"
          >
            <div className="flex flex-col p-6 space-y-4">
              <a href="#" className="text-lg text-navy-800 uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-gold-400 hover:text-gold-400 transition-all">Features</a>
              <a href="#" className="text-lg text-navy-800 uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-gold-400 hover:text-gold-400 transition-all">Child Wealth</a>
              <a href="#" className="text-lg text-navy-800 uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-gold-400 hover:text-gold-400 transition-all">About</a>
              <button 
                onClick={() => {
                  navigate('/wizard');
                  setIsOpen(false);
                }}
                className="w-full py-4 mt-4 bg-gold-400 text-white font-bold uppercase tracking-widest hover:bg-navy-900 transition-colors"
              >
                Book Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
