import React from 'react';
import { useWizardStore } from '../../stores/useWizardStore';
import ProgressBar from './ProgressBar';
import { Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Screens
import GoalsScreen from './screens/GoalsScreen';
import BasicInfoScreen from './screens/BasicInfoScreen';
import HealthScreen from './screens/HealthScreen';
import BudgetScreen from './screens/BudgetScreen';
import ContactScreen from './screens/ContactScreen';
import ResultsScreen from './screens/ResultsScreen';
import { Button } from '../ui/button';

const WizardContainer = () => {
  const { currentStep, totalSteps } = useWizardStore();

  const renderScreen = () => {
    switch(currentStep) {
      case 1: return <GoalsScreen />;
      case 2: return <BasicInfoScreen />;
      case 3: return <HealthScreen />;
      case 4: return <BudgetScreen />;
      case 5: return <ContactScreen />;
      case 6: return <ResultsScreen />;
      default: return <GoalsScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Persistent Header */}
      <header className="fixed top-0 left-0 w-full h-[72px] bg-white z-50 px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-serif font-bold tracking-wide text-navy-900">
            AEM <span className="text-gold-400">Consulting</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 text-navy-800">
          <span className="hidden sm:inline text-sm font-medium mr-2">Need Help?</span>
          <a href="tel:5555555555" className="flex items-center gap-2 font-bold hover:text-gold-400 transition-colors">
            <Phone size={18} />
            <span className="hidden sm:inline">(555) 555-5555</span>
          </a>
        </div>
      </header>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content Area */}
      <main className="pt-[100px] pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default WizardContainer;
