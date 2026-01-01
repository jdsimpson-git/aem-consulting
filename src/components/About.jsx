import React from 'react';
import aliciaImage from '../assets/alicia_main.jpg';

const About = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-cream-50 border-t border-gray-100">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div 
           className="relative order-2 md:order-1"
        >
          <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-navy-900 flex items-center justify-center border border-white shadow-gray-200/50">
             <img 
               src={aliciaImage} 
               alt="Alicia Elizabeth Mitchell" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="absolute top-10 -left-10 w-full h-full border border-gold-400/30 rounded-2xl -z-10" />
        </div>

        <div 
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

          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              Alicia Elizabeth Mitchell holds over 25 years of progressive executive leadership in psychiatric care, behavioral health, hospital operations, state and federal government, driving strategic planning, regulatory compliance, workforce development, and operational excellence across multidisciplinary departments.
            </p>
            <p>
              She brings deep expertise in performance improvement, risk mitigation, compliance (TJC, CMS, COA, ACA, CARF, DJJ OSHA, etc.), and stakeholder engagement, and is certified as a Lean Six Sigma Black, Green, Yellow and White belt. Her background spans hospital administration, quality assurance, risk and incident management, and program operations, consistently advancing care standards, optimizing systems, and leading organizational transformation.
            </p>
            <p>
              She is passionate about building inclusive, high-performing teams and implementing sustainable systems that support both clinical excellence and operational growth.
            </p>
            <p>
              As part of Ms. Mitchell's future developments she plans on educating those on financial literacy and planned protection in the areas of life, wellness and accident insurance. She is currently a licensed agent in the states of Georgia, South Carolina, Florida and Texas. She has over 25 vendor selections to ensure you and your family receive the right protection.
            </p>
            
            <div className="pt-4">
              <h3 className="font-serif font-bold text-navy-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Strategic Operations", "Quality & Risk Management", "Compliance", 
                  "Human Resources", "Budgeting & Procurement", "Lean Six Sigma", 
                  "Policy Development", "Organizational Change", "Life Insurance", 
                  "Health Insurance", "IULs for high income producers", "Financial and Estate Planning"
                ].map((item, index) => (
                  <span key={index} className="bg-white border border-gold-200 text-navy-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button className="bg-navy-900 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gold-500 shadow-lg hover:shadow-gold-400/30 transition-all w-full sm:w-auto text-center rounded-sm">
              Schedule Your Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
