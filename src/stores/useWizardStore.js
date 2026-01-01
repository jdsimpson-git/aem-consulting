import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialWizardState = {
  currentStep: 1,
  totalSteps: 6,

  // Screen 1: Goals
  coverageGoals: [],
  coverageFor: "just_me", // 'just_me', 'me_spouse', 'me_someone'

  // Screen 2: Basic Info
  dateOfBirth: { month: "", day: "", year: "" },
  gender: "",
  state: "",
  tobaccoUse: null, // boolean or null
  tobaccoFrequency: "",

  // Screen 3: Health
  health: {
    hospitalized: null,
    cancerTreated: null,
    heartIssue: null,

    currentConditions: [], // oxygen, wheelchair, dialysis, hiv, alzheimers
    commonConditions: [], // diabetes, copd, heart_disease, hbp, cancer_past

    // Conditionals
    diabetesManagement: "",
    heartEventTiming: "",
    cancerTreatmentTiming: "",
    usesOxygenForCOPD: null,

    height: { feet: "", inches: "" },
    weight: "",
  },

  // Screen 4: Budget
  budgetRange: "", // '$25-50', etc.
  customBudget: "",

  // Screen 5: Contact
  contact: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    bestTime: "",
  },

  // Calculated Results
  eligibilityType: "DAY_ONE", // 'DAY_ONE', 'GRADED', 'GUARANTEED_ISSUE'

  // Meta
  isSubmitted: false,
};

export const useWizardStore = create(
  persist(
    (set, get) => ({
      ...initialWizardState,

      // Actions
      setField: (field, value) => set((state) => ({ [field]: value })),

      setComplexField: (parent, field, value) =>
        set((state) => ({
          [parent]: { ...state[parent], [field]: value },
        })),

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      resetWizard: () => set(initialWizardState),

      setEligibility: (type) => set({ eligibilityType: type }),

      setIsSubmitted: (status) => set({ isSubmitted: status }),
    }),
    {
      name: "life-insurance-wizard-storage",
      partialize: (state) => ({
        // Persist everything except functions
        ...state,
      }),
    }
  )
);
