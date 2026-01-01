import React, { useState } from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Card } from '../../ui/card';

const BudgetScreen = () => {
  const { budgetRange, customBudget, setField, nextStep, prevStep } = useWizardStore();
  const [useCustom, setUseCustom] = useState(!!customBudget);

  const handleNext = () => {
    if (useCustom && customBudget) {
      nextStep();
    } else if (!useCustom && budgetRange) {
      nextStep();
    }
  };

  const budgetOptions = [
    { value: '$25-50', label: '$25 - $50', sub: 'Basic coverage' },
    { value: '$50-100', label: '$50 - $100', sub: 'Most popular', popular: true },
    { value: '$100-150', label: '$100 - $150', sub: 'Enhanced plan' },
    { value: '$150+', label: '$150+', sub: 'Premium coverage' },
  ];

  return (
    <div
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-navy-900">
          What fits your budget?
        </h2>
        <p className="text-gray-600">Choose a monthly amount you're comfortable with.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgetOptions.map((option) => (
            <Card
              key={option.value}
              onClick={() => {
                setUseCustom(false);
                setField('budgetRange', option.value);
                setField('customBudget', '');
              }}
              className={`relative p-6 cursor-pointer transition-all border-2 text-center hover:shadow-md ${
                !useCustom && budgetRange === option.value
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-100 hover:border-teal-200'
              }`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold-400 text-white text-xs font-bold uppercase rounded-full tracking-widest">
                  Popular
                </div>
              )}
              <div className="text-xl font-bold text-navy-900">{option.label}</div>
              <div className="text-sm text-gray-500 mt-1">{option.sub}</div>
            </Card>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or enter amount</span>
          </div>
        </div>

        <Card
          onClick={() => setUseCustom(true)}
          className={`p-6 transition-all border-2 ${
            useCustom ? 'border-teal-500 bg-teal-50' : 'border-gray-100'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Label className="text-base font-medium text-navy-900">Enter custom amount</Label>
            <div className="relative w-full max-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={customBudget}
                onChange={(e) => {
                  setUseCustom(true);
                  setField('customBudget', e.target.value);
                  setField('budgetRange', '');
                }}
                onFocus={() => setUseCustom(true)}
              />
            </div>
          </div>
        </Card>

      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 py-6 text-lg border-gray-300 hover:bg-gray-50">
          <ArrowLeft className="mr-2" size={20} /> Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!budgetRange && !customBudget}
          className="flex-[2] py-6 text-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
        >
          See My Options <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default BudgetScreen;
