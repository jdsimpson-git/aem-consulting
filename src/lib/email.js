// Email service simulation
// In a real application, you would replace the simulated delay with an API call
// to your backend (e.g. Next.js API route, Supabase Edge Function) or a 3rd party service.

export const formatLeadEmail = (data) => {
  const {
    contact,
    coverageGoals,
    coverageFor,
    dateOfBirth,
    gender,
    state,
    tobaccoUse,
    health,
    budgetRange,
    customBudget,
    eligibilityType,
  } = data;

  const budget = customBudget ? `$${customBudget}` : budgetRange;
  const dob = `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`;

  return `
    NEW LIFE INSURANCE LEAD
    -----------------------
    Name: ${contact.firstName} ${contact.lastName}
    Phone: ${contact.phone}
    Email: ${contact.email}
    Best Time: ${contact.bestTime}
    
    ELIGIBILITY: ${eligibilityType}
    BUDGET: ${budget}
    
    DETAILS:
    - DOB: ${dob}
    - Gender: ${gender}
    - State: ${state}
    - Smoker: ${tobaccoUse ? "Yes" : "No"}
    
    GOALS: ${coverageGoals.join(", ")} (For: ${coverageFor})
    
    HEALTH:
    - Major Events (Past 12mo): 
      ${health.hospitalized ? "Hospitalized" : ""} 
      ${health.cancerTreated ? "Cancer" : ""} 
      ${health.heartIssue ? "Heart/Stroke" : ""}
    - Conditions: ${health.commonConditions.join(", ") || "None"}
  `;
};

export const submitLead = async (wizardData) => {
  console.log("Submitting lead...", wizardData);

  // Simulate network request duration
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In production, integrate with email service here:
  // e.g., await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify(wizardData) });

  console.log("Lead submitted successfully!");
  console.log("Email body preview:", formatLeadEmail(wizardData));

  return { success: true };
};
