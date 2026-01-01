import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

const HealthScreen = () => {
  const { 
    health, 
    setComplexField,
    nextStep,
    prevStep
  } = useWizardStore();

  const handleNext = () => {
    // Basic validation could go here
    nextStep();
  };

  const updateHealth = (field, value) => {
    setComplexField('health', field, value);
  };

  const toggleCondition = (listType, condition) => {
    const currentList = health[listType] || [];
    if (currentList.includes(condition)) {
      updateHealth(listType, currentList.filter(c => c !== condition));
    } else {
      updateHealth(listType, [...currentList, condition]);
      
      // If none_of_these is selected, clear others
      if (condition === 'none_of_these') {
        updateHealth(listType, ['none_of_these']);
      } else if (currentList.includes('none_of_these')) {
        // If selecting something else, remove none_of_these
        updateHealth(listType, [condition]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-navy-900">
          A few quick health questions
        </h2>
        <p className="text-gray-600">This helps us find the best plan for you.</p>
      </div>

      <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        
        {/* Section A: The Big 3 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-navy-900 border-b pb-2">In the past 12 months, have you:</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Label className="text-base font-medium">Been hospitalized overnight?</Label>
              <div className="flex gap-2">
                <Button 
                  variant={health.hospitalized === true ? "default" : "outline"}
                  onClick={() => updateHealth('hospitalized', true)}
                  className={`w-16 ${health.hospitalized === true ? 'bg-navy-900 text-white' : ''}`}
                >
                  Yes
                </Button>
                <Button 
                  variant={health.hospitalized === false ? "default" : "outline"}
                  onClick={() => updateHealth('hospitalized', false)}
                  className={`w-16 ${health.hospitalized === false ? 'bg-navy-900 text-white' : ''}`}
                >
                  No
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Label className="text-base font-medium">Been diagnosed with cancer?</Label>
              <div className="flex gap-2">
                <Button 
                  variant={health.cancerTreated === true ? "default" : "outline"}
                  onClick={() => updateHealth('cancerTreated', true)}
                  className={`w-16 ${health.cancerTreated === true ? 'bg-navy-900 text-white' : ''}`}
                >
                  Yes
                </Button>
                <Button 
                  variant={health.cancerTreated === false ? "default" : "outline"}
                  onClick={() => updateHealth('cancerTreated', false)}
                  className={`w-16 ${health.cancerTreated === false ? 'bg-navy-900 text-white' : ''}`}
                >
                  No
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Label className="text-base font-medium">Had a heart attack or stroke?</Label>
              <div className="flex gap-2">
                <Button 
                  variant={health.heartIssue === true ? "default" : "outline"}
                  onClick={() => updateHealth('heartIssue', true)}
                  className={`w-16 ${health.heartIssue === true ? 'bg-navy-900 text-white' : ''}`}
                >
                  Yes
                </Button>
                <Button 
                  variant={health.heartIssue === false ? "default" : "outline"}
                  onClick={() => updateHealth('heartIssue', false)}
                  className={`w-16 ${health.heartIssue === false ? 'bg-navy-900 text-white' : ''}`}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Current Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-navy-900 border-b pb-2">Do any of these currently apply to you?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'oxygen', label: 'I use oxygen equipment' },
              { id: 'wheelchair', label: 'I use a wheelchair daily' },
              { id: 'dialysis', label: 'I am on dialysis' },
              { id: 'hiv', label: 'I have AIDS or HIV' },
              { id: 'alzheimers', label: 'Alzheimer\'s or dementia' },
              { id: 'none_of_these', label: 'None of these apply' }
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleCondition('currentConditions', item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  health.currentConditions.includes(item.id) 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  health.currentConditions.includes(item.id) 
                    ? 'bg-teal-600 border-teal-600' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {health.currentConditions.includes(item.id) && <Check size={14} className="text-white" />}
                </div>
                <Label className="cursor-pointer font-normal text-base">{item.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Common Conditions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-navy-900 border-b pb-2">Do you have any of these conditions?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'diabetes', label: 'Diabetes' },
              { id: 'copd', label: 'COPD' },
              { id: 'heart_disease', label: 'Heart Disease' },
              { id: 'hbp', label: 'High Blood Pressure' },
              { id: 'cancer_past', label: 'Cancer (Past)' },
              { id: 'none_of_these', label: 'None of these' }
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleCondition('commonConditions', item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  health.commonConditions.includes(item.id) 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  health.commonConditions.includes(item.id) 
                    ? 'bg-teal-600 border-teal-600' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {health.commonConditions.includes(item.id) && <Check size={14} className="text-white" />}
                </div>
                <Label className="cursor-pointer font-normal text-base">{item.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Conditional Drill Downs */}
        {(health.commonConditions.includes('diabetes') || 
          health.commonConditions.includes('heart_disease') || 
          health.commonConditions.includes('cancer_past')) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6 pt-4 border-t"
          >
            {health.commonConditions.includes('diabetes') && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">How do you manage your diabetes?</Label>
                <Select 
                  value={health.diabetesManagement} 
                  onValueChange={(val) => updateHealth('diabetesManagement', val)}
                >
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Select management method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diet_exercise">Diet/exercise only</SelectItem>
                    <SelectItem value="pills">Oral medication (pills)</SelectItem>
                    <SelectItem value="insulin">Insulin injections</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {health.commonConditions.includes('heart_disease') && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">When was your last heart-related event or procedure?</Label>
                <Select
                  value={health.heartEventTiming}
                  onValueChange={(val) => updateHealth('heartEventTiming', val)}
                >
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="more_than_2_years">More than 2 years ago</SelectItem>
                    <SelectItem value="1_2_years">1-2 years ago</SelectItem>
                    <SelectItem value="less_than_1_year">Less than 1 year ago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {health.commonConditions.includes('cancer_past') && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">When did you complete treatment?</Label>
                <Select
                  value={health.cancerTreatmentTiming}
                  onValueChange={(val) => updateHealth('cancerTreatmentTiming', val)}
                >
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="more_than_2_years">More than 2 years ago</SelectItem>
                    <SelectItem value="1_2_years">1-2 years ago</SelectItem>
                    <SelectItem value="less_than_1_year">Less than 1 year ago</SelectItem>
                    <SelectItem value="current">Currently in treatment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
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

export default HealthScreen;
