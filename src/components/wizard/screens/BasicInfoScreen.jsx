import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { StateCombobox } from '../StateCombobox';

const BasicInfoScreen = () => {
  const { 
    dateOfBirth, 
    gender, 
    state, 
    tobaccoUse, 
    tobaccoFrequency,
    setField, 
    setComplexField,
    nextStep,
    prevStep
  } = useWizardStore();

  const handleNext = () => {
    // Basic validation
    if (
      dateOfBirth.month && dateOfBirth.day && dateOfBirth.year &&
      gender && 
      state && 
      tobaccoUse !== null &&
      (tobaccoUse === false || (tobaccoUse === true && tobaccoFrequency))
    ) {
      nextStep();
    }
  };

  // Calculate age for display
  const calculateAge = () => {
    if (!dateOfBirth.year || dateOfBirth.year.length < 4) return null;
    const year = parseInt(dateOfBirth.year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    return age > 0 && age < 120 ? age : null;
  };

  const age = calculateAge();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-navy-900">
          Tell us a bit about yourself
        </h2>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        
        {/* Date of Birth */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-navy-900">Date of Birth</Label>
          <div className="flex gap-4 items-center">
            <div className="w-20">
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className="w-full p-3 border border-gray-200 rounded-lg text-center"
                value={dateOfBirth.month}
                onChange={(e) => setComplexField('dateOfBirth', 'month', e.target.value)}
              />
            </div>
            <span className="text-gray-400">/</span>
            <div className="w-20">
              <input
                type="text"
                placeholder="DD"
                maxLength={2}
                className="w-full p-3 border border-gray-200 rounded-lg text-center"
                value={dateOfBirth.day}
                onChange={(e) => setComplexField('dateOfBirth', 'day', e.target.value)}
              />
            </div>
            <span className="text-gray-400">/</span>
            <div className="w-28">
              <input
                type="text"
                placeholder="YYYY"
                maxLength={4}
                className="w-full p-3 border border-gray-200 rounded-lg text-center"
                value={dateOfBirth.year}
                onChange={(e) => setComplexField('dateOfBirth', 'year', e.target.value)}
              />
            </div>
            {age && (
              <span className="ml-2 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-bold">
                Age {age}
              </span>
            )}
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-navy-900">Gender</Label>
          <div className="flex gap-4">
            {['Male', 'Female'].map((g) => (
              <button
                key={g}
                onClick={() => setField('gender', g)}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all font-medium ${
                  gender === g
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-navy-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-navy-900">State</Label>
          <StateCombobox value={state} onChange={(val) => setField('state', val)} />
        </div>

        {/* Tobacco */}
        <div className="space-y-2">
          <Label className="text-base font-semibold text-navy-900">Do you use tobacco products?</Label>
          <div className="flex gap-4">
            <button
              onClick={() => setField('tobaccoUse', false)}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all font-medium ${
                tobaccoUse === false
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-navy-300'
              }`}
            >
              No
            </button>
            <button
              onClick={() => setField('tobaccoUse', true)}
              className={`flex-1 py-3 px-4 rounded-lg border transition-all font-medium ${
                tobaccoUse === true
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-navy-300'
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* Tobacco Follow-up */}
        {tobaccoUse === true && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 pl-4 border-l-2 border-teal-500"
          >
            <Label className="text-base font-semibold text-navy-900">How often?</Label>
            <Select value={tobaccoFrequency} onValueChange={(val) => setField('tobaccoFrequency', val)}>
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
                <SelectItem value="quit_within_12_months">Quit within 12 months</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}

      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 py-6 text-lg border-gray-300 hover:bg-gray-50">
          <ArrowLeft className="mr-2" size={20} /> Back
        </Button>
        <Button 
          onClick={handleNext} 
          className="flex-[2] py-6 text-lg bg-teal-600 hover:bg-teal-700"
        >
          Next Step <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </motion.div>
  );
};

export default BasicInfoScreen;
