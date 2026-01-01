import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  // Calculate percentage
  // We want to map steps to specific percentages as per design:
  // 1 -> 10%, 2 -> 25%, 3 -> 50%, 4 -> 70%, 5 -> 90%, 6 -> 100%
  const getProgress = (step) => {
    switch(step) {
      case 1: return 10;
      case 2: return 25;
      case 3: return 50;
      case 4: return 70;
      case 5: return 90;
      case 6: return 100;
      default: return (step / totalSteps) * 100;
    }
  };

  const progressPercent = getProgress(currentStep);
  
  return (
    <div className="w-full h-1 bg-gray-200 fixed top-[72px] left-0 z-40">
      <div 
        className="h-full bg-teal-600 transition-all duration-300 ease-in-out" 
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
