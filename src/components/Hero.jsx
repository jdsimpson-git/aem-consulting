import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Abstract Shapes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold-400/20 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full backdrop-blur-sm">
            <ShieldCheck size={16} className="text-gold-500" />
            <span className="text-navy-800 text-xs font-bold uppercase tracking-widest">Security is the New Luxury</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-navy-900">
            Financially Fit Women Don't Just Budget—They <span className="text-gold-500 italic">Build Empires</span>.
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Comprehensive insurance solutions for life, health, and wealth preservation. Secure your legacy with elegance and confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/wizard')}
              className="bg-gold-400 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 shadow-lg shadow-gold-400/30 transition-all flex items-center justify-center gap-2 group rounded-sm"
            >
              Book Strategy Session
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-navy-900/10 text-navy-900 px-8 py-4 font-bold uppercase tracking-widest hover:bg-navy-900/5 transition-colors rounded-sm"
            >
              Explore Solutions
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/60 p-8 rounded-2xl shadow-2xl shadow-navy-900/5 skew-y-[-2deg]">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-navy-900/10 pb-4">
                <div>
                  <h3 className="text-gold-600 text-sm uppercase tracking-widest font-semibold">Empire Builder Plan</h3>
                  <p className="text-2xl font-serif text-navy-900">Whole Life Coverage</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Cash Value</p>
                  <p className="text-xl font-bold font-mono text-teal-600">+$254,000</p>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${60 + item * 10}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + item * 0.2 }}
                      className="h-full bg-gold-400"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                <span>Wealth Preservation</span>
                <span>Active Protection</span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements behind card */}
          <div className="absolute top-10 -right-10 w-full h-full border border-gold-400/20 rounded-2xl -z-10 skew-y-[-2deg]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-xl opacity-80 mix-blend-multiply" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
