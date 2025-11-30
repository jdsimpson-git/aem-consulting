import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-cream-50 border-t border-gray-100">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative order-2 md:order-1"
        >
          <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-white flex items-center justify-center border border-white shadow-gray-200/50">
             {/* Placeholder for Alicia's Image */}
             <div className="text-center p-8">
                <div className="w-24 h-24 bg-gold-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <UserCheck className="w-10 h-10 text-gold-500" />
                </div>
                <p className="text-gray-500 italic">"Security is the new luxury."</p>
             </div>
          </div>
          <div className="absolute top-10 -left-10 w-full h-full border border-gold-400/30 rounded-2xl -z-10" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 space-y-6"
        >
          <div className="inline-flex items-center space-x-2 text-gold-500">
             <span className="h-px w-10 bg-gold-500" />
             <span className="text-sm font-bold uppercase tracking-widest">About the Agent</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-navy-900">
            Meet Alicia Mitchell
          </h2>

          <p className="text-xl text-gold-600 font-serif italic">
            Your Partner in Wealth Preservation and Legacy Building.
          </p>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              In a world of uncertainty, true peace of mind is the ultimate luxury. I specialize in helping financially fit women and families not just protect what they have, but build an empire for the future.
            </p>
            <p>
              My approach is advisory, urgent, and deeply personal. We don't just sell policies; we construct safety nets that turn into springboards for generational wealth.
            </p>
          </div>

          <div className="pt-8">
            <button className="bg-navy-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 shadow-lg hover:shadow-gold-400/30 transition-all w-full sm:w-auto text-center rounded-sm">
              Schedule Your Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
