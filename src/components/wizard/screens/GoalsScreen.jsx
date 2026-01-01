import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { ArrowRight, Users, Gift, Flower, HelpCircle, User, Heart } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';

const GoalsScreen = () => {
  const { coverageGoals, coverageFor, setField, nextStep } = useWizardStore();

  const toggleGoal = (goal) => {
    if (coverageGoals.includes(goal)) {
      setField('coverageGoals', coverageGoals.filter(g => g !== goal));
    } else {
      setField('coverageGoals', [...coverageGoals, goal]);
    }
  };

  const handleNext = () => {
    if (coverageGoals.length > 0) {
      nextStep();
    }
  };

  const goals = [
    { id: 'protect_family', label: 'Protect my loved ones', icon: <Heart size={24} className="text-pink-500" /> },
    { id: 'inheritance', label: 'Leave an inheritance', icon: <Gift size={24} className="text-gold-500" /> },
    { id: 'funeral', label: 'Cover funeral expenses', icon: <Flower size={24} className="text-purple-500" /> },
    { id: 'not_sure', label: "I'm not sure yet", icon: <HelpCircle size={24} className="text-blue-500" /> },
  ];

  return (
    <div
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900">
          Let's get started! What are your goals for life insurance?
        </h2>
        <p className="text-gray-600 text-lg">Select all that apply.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-6 cursor-pointer transition-all border-2 flex items-center gap-4 hover:shadow-md ${
              coverageGoals.includes(goal.id)
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-100 hover:border-teal-200'
            }`}
          >
            <div className={`p-3 rounded-full ${coverageGoals.includes(goal.id) ? 'bg-white' : 'bg-gray-50'}`}>
              {goal.icon}
            </div>
            <span className={`text-lg font-medium ${coverageGoals.includes(goal.id) ? 'text-navy-900' : 'text-gray-700'}`}>
              {goal.label}
            </span>
          </Card>
        ))}
      </div>

      <div className="pt-8 space-y-4">
        <h3 className="text-xl font-bold text-navy-900 text-center">Who needs coverage?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setField('coverageFor', 'just_me')}
            className={`px-6 py-3 rounded-lg border transition-all ${
              coverageFor === 'just_me'
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-navy-900 border-gray-200 hover:border-navy-300'
            }`}
          >
            Just me
          </button>
          <button
            onClick={() => setField('coverageFor', 'me_spouse')}
            className={`px-6 py-3 rounded-lg border transition-all ${
              coverageFor === 'me_spouse'
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-navy-900 border-gray-200 hover:border-navy-300'
            }`}
          >
            Me and my spouse
          </button>
          <button
            onClick={() => setField('coverageFor', 'me_someone')}
            className={`px-6 py-3 rounded-lg border transition-all ${
              coverageFor === 'me_someone'
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-navy-900 border-gray-200 hover:border-navy-300'
            }`}
          >
            Me and someone else
          </button>
        </div>
      </div>

      <div className="pt-8 flex justify-center">
        <Button
          onClick={handleNext}
          disabled={coverageGoals.length === 0}
          className="w-full md:w-auto px-12 py-6 text-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
        >
          Next Step <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default GoalsScreen;
