import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, Briefcase } from 'lucide-react';

const HealthProtection = () => {
  return (
    <div className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-navy-900">Health & Income <span className="text-teal-500 italic">Protection</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your ability to earn is your greatest asset. Protect it with comprehensive solutions designed for entrepreneurs and families.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-cream-50 border border-gray-100 p-8 rounded-2xl hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Stethoscope size={120} className="text-navy-900" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                <HeartPulse className="text-teal-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-navy-900">Living Benefits</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rising health costs shouldn't threaten your financial stability. Our plans cover dental, vision, and critical illness gaps that standard insurance misses.
              </p>
              <div className="flex items-center text-sm font-bold text-teal-600 uppercase tracking-widest">
                <span>Coverage from $100/mo</span>
              </div>
            </div>
          </motion.div>

           {/* Card 2 */}
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-cream-50 border border-gray-100 p-8 rounded-2xl hover:border-teal-400 hover:shadow-lg hover:shadow-teal-400/10 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Briefcase size={120} className="text-navy-900" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                 <ShieldCheckIcon className="text-teal-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-navy-900">Income Protection</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay solvent even when life happens. Supplemental income plans (like Aflac) ensure your bills are paid if illness keeps you from working.
              </p>
              <div className="flex items-center text-sm font-bold text-teal-600 uppercase tracking-widest">
                <span>Safeguard Your Assets</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheckIcon = ({ className, size }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
)

export default HealthProtection;
