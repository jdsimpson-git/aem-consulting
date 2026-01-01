import React from 'react';
import { Shield, TrendingUp, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10 text-gold-500" />,
      title: "Term Life Coverage",
      description: "Income replacement and significant protection at a remarkably low cost. Essential for families with young children or mortgages.",
      highlight: "High Protection / Low Cost"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-gold-500" />,
      title: "Whole Life Insurance",
      description: "The cornerstone of empire building. Wealth accumulation, guaranteed cash value growth, and a legacy that lasts forever.",
      highlight: "Wealth & Legacy Building"
    },
    {
      icon: <Heart className="w-10 h-10 text-gold-500" />,
      title: "Final Expense",
      description: "Dignity and peace of mind. Ensure your loved ones are never burdened with funeral costs or outstanding debts.",
      highlight: "Peace of Mind Guaranteed"
    }
  ];

  return (
    <div className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div 
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-navy-900">The Financial Fitness <span className="text-gold-500 italic">Methodology</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our three-pillar approach ensures you are protected today while building prosperity for tomorrow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
             <div
              key={index}
              className="bg-white border border-gray-100 p-8 rounded-2xl group hover:border-gold-400 hover:shadow-xl hover:shadow-gold-400/10 transition-all duration-300"
            >
              <div className="bg-cream-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gold-100">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-navy-900">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              <div className="pt-6 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600">{feature.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
