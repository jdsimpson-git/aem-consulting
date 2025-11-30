import React from 'react';
import { motion } from 'framer-motion';
import { Baby, ArrowRight, CheckCircle2 } from 'lucide-react';

const ChildWealth = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-cream-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-100/30 skew-x-12 translate-x-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 text-gold-500 mb-6">
              <Baby size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Child Wealth Builder</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-navy-900">
              Give Them a Head Start.<br />
              <span className="text-gold-500">Protection Before Expenditure.</span>
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              The greatest gift you can give your child is financial security. Lock in favorable rates while they are young and healthy, creating an asset that grows with them.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Whole life policies up to $50,000",
                "Premiums start at just $4/month",
                "Convertible to $250,000 later in life",
                "Guaranteed insurability regardless of future health"
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 text-navy-800">
                  <CheckCircle2 className="text-teal-500 w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="bg-navy-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 shadow-lg hover:shadow-gold-400/30 transition-all flex items-center gap-2 group rounded-sm">
              Start Their Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/50">
              <div className="bg-white rounded-xl overflow-hidden p-8 space-y-8">
                <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                  <div>
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Growth Projection</p>
                    <h3 className="text-3xl font-serif text-navy-900">Age 18 Value</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-teal-600">High Growth</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="text-gray-500">Monthly Contribution</span>
                       <span className="font-mono text-navy-900 font-semibold">$25.00</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full w-full">
                      <div className="h-full w-[20%] bg-gray-300 rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                     <div className="flex justify-between text-sm mb-2">
                       <span className="text-gray-500">Cash Value @ Age 25</span>
                       <span className="font-mono text-gold-500 font-bold">$12,450+</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gold-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-cream-50 rounded-lg p-4 border border-gold-100">
                  <p className="text-xs text-gray-500 italic text-center">
                    "By starting early, you're not just buying insurance; you're buying their financial freedom."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl mix-blend-multiply" />
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChildWealth;
