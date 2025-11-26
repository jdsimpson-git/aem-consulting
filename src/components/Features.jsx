import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-gold-400" />,
      title: "Term Life Coverage",
      description: "Income replacement and significant protection at a remarkably low cost. Essential for families with young children or mortgages.",
      highlight: "High Protection / Low Cost"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-gold-400" />,
      title: "Whole Life Insurance",
      description: "The cornerstone of empire building. Wealth accumulation, guaranteed cash value growth, and a legacy that lasts forever.",
      highlight: "Wealth & Legacy Building"
    },
    {
      icon: <Heart className="w-10 h-10 text-gold-400" />,
      title: "Final Expense",
      description: "Dignity and peace of mind. Ensure your loved ones are never burdened with funeral costs or outstanding debts.",
      highlight: "Peace of Mind Guaranteed"
    }
  ];

  return (
    <div className="py-24 bg-navy-900 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The Financial Fitness <span className="text-gold-400 italic">Methodology</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our three-pillar approach ensures you are protected today while building prosperity for tomorrow.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
             <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl group hover:border-gold-400/50 transition-colors"
            >
              <div className="bg-navy-800 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
              <div className="pt-6 border-t border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">{feature.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
