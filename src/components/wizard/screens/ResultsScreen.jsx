import React, { useMemo } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { CheckCircle, Phone, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const ResultsScreen = () => {
  const { eligibilityType, budgetRange, customBudget, contact } = useWizardStore();

  const quotes = useMemo(() => {
    // Generate quotes based on state
    // In a real app, this would be computed or fetched
    const budget = customBudget ? parseInt(customBudget) : parseInt(budgetRange.split('-')[1] || 50);
    
    // Base amount roughly $1000 per $1 premium per month (very simplified)
    const baseCoverage = budget * 1000 * (eligibilityType === 'GUARANTEED_ISSUE' ? 0.4 : 1);
    
    return [
      {
        coverage: Math.round(baseCoverage * 0.7 / 1000) * 1000,
        premium: Math.round(budget * 0.7),
        label: 'Basic'
      },
      {
        coverage: Math.round(baseCoverage / 1000) * 1000,
        premium: budget,
        recommended: true,
        label: 'Recommended'
      },
      {
        coverage: Math.round(baseCoverage * 1.3 / 1000) * 1000,
        premium: Math.round(budget * 1.3),
        label: 'Max Coverage'
      }
    ];
  }, [eligibilityType, budgetRange, customBudget]);

  const getHeadline = () => {
    if (eligibilityType === 'DAY_ONE') return "Great news! You qualify for immediate coverage 🎉";
    if (eligibilityType === 'GRADED_BENEFIT') return "Good news! We found coverage options for you.";
    return "Good news! You qualify for Guaranteed Acceptance 👍";
  };

  return (
    <div
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900">
          {getHeadline()}
        </h2>
        <p className="text-gray-600">
          A licensed agent will contact you at <span className="font-semibold text-navy-900">{contact.phone}</span> within 24 hours to finalize your coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
          >
            <Card className={`relative overflow-hidden h-full flex flex-col ${quote.recommended ? 'border-2 border-gold-400 shadow-xl scale-105 z-10' : 'border border-gray-200'}`}>
              {quote.recommended && (
                <div className="bg-gold-400 text-white text-center py-1 text-sm font-bold uppercase tracking-widest">
                  Best Value
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col items-center text-center space-y-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{quote.label}</div>
                  <div className="text-3xl font-bold text-navy-900 mt-1">${quote.coverage.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Coverage Amount</div>
                </div>

                <div className="w-full border-t border-gray-100 my-4" />

                <div className="text-4xl font-bold text-teal-600">
                  ${quote.premium}<span className="text-lg text-gray-400 font-normal">/mo</span>
                </div>

                <ul className="text-left space-y-3 text-sm text-gray-600 w-full pt-4">
                  {eligibilityType === 'DAY_ONE' && (
                    <>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-teal-500 shrink-0" /> Immediate full coverage</li>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-teal-500 shrink-0" /> Rates locked for life</li>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-teal-500 shrink-0" /> Builds cash value</li>
                    </>
                  )}
                  {eligibilityType === 'GUARANTEED_ISSUE' && (
                    <>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-teal-500 shrink-0" /> No medical exam</li>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-teal-500 shrink-0" /> Cannot be turned down</li>
                      <li className="flex gap-2"><Clock size={16} className="text-orange-500 shrink-0" /> 2-year waiting period</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Button className={`w-full py-6 font-bold uppercase tracking-wide ${quote.recommended ? 'bg-gold-400 hover:bg-gold-500 text-white' : 'bg-navy-900 text-white hover:bg-navy-800'}`}>
                  Select Plan
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal-600 shrink-0">
          <Phone size={24} />
        </div>
        <div>
          <h4 className="font-bold text-navy-900 text-lg">Questions? Talk to a licensed agent</h4>
          <p className="text-gray-600 text-sm">Our experts can help you customize a plan that fits your exact needs.</p>
        </div>
        <Button variant="outline" className="shrink-0 border-teal-600 text-teal-700 hover:bg-teal-50">
          (555) 555-5555
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
