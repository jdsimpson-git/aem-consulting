import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialFormData = {
  age: "",
  gender: "male",
  zipCode: "",
  smoker: false,
  healthClass: "standard",
  coverageAmount: 500000,
  termLength: 20,
  productType: "term",
};

export const useQuoteStore = create(
  persist(
    (set) => ({
      formData: initialFormData,
      quoteResult: null,
      loading: false,

      updateFormData: (updates) =>
        set((state) => ({
          formData: { ...state.formData, ...updates },
        })),

      setQuoteResult: (result) => set({ quoteResult: result }),
      setLoading: (loading) => set({ loading }),
      resetQuote: () => set({ formData: initialFormData, quoteResult: null }),
    }),
    {
      name: "aem-quote-storage",
    }
  )
);
