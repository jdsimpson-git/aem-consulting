# Life Insurance Wizard - Implementation Prompt

## Overview

Build a multi-step life insurance quote wizard that guides users through a streamlined questionnaire to determine their insurance eligibility and provide personalized quotes. The wizard should feel fast, modern, and trustworthy - similar to Ethos.com but matching our existing website's design system.

---

## Design Requirements

### General Styling
- **Match the existing website's color palette, typography, and design system**
- Use the existing brand colors for primary buttons, links, and accents
- Maintain consistent spacing, border-radius, and shadow styles from the current site
- Ensure the wizard feels like a native part of the website, not a separate tool

### Progress Bar (Ethos Style)
- Thin horizontal line (4px height) positioned fixed at the top, just below the main header
- Background: Light gray (`#E5E7EB` or match site's muted background color)
- Fill: Primary brand color (teal/green or whatever the site uses)
- Smooth animation transition (300ms ease-in-out) when progressing between steps
- No step numbers or labels - just the visual bar
- Progress percentages:
  - Screen 1 (Goals): 10%
  - Screen 2 (Basic Info): 25%
  - Screen 3 (Health): 50%
  - Screen 4 (Budget): 70%
  - Screen 5 (Contact Info): 90%
  - Screen 6 (Results): 100%

### Header (Persistent on all screens)
- Company logo (left aligned)
- "Need Help?" with clickable phone number (right aligned)
- Progress bar directly below

### Layout
- Centered content container (max-width: 600px for form content)
- Generous whitespace
- Large, readable typography for questions
- Mobile-first responsive design

### Buttons
- Primary action button: Full-width on mobile, centered on desktop
- Style: Solid background with brand color, white text
- Disabled state: Grayed out until required fields are completed
- "Next" button on screens 1-4, "See My Options" on screen 4

### Cards/Selection Options
- Card-style selectors for multiple choice questions (like Ethos)
- Icon + label format
- Subtle border, slight shadow on hover
- Clear selected state (border color change, checkmark, or background tint)
- Cards should be arranged in a 2x2 grid on desktop, stack on mobile

---

## Screen-by-Screen Implementation

### SCREEN 1: Goals & Coverage (10% progress)

**Headline:** "Let's get started! What are your goals for life insurance?"

**Subheadline:** "Select all that apply."

**Question 1: Coverage Goals** (Multi-select cards)
```
Options:
- Protect my loved ones (icon: family/people with heart)
- Leave an inheritance (icon: money/gift)
- Cover my funeral expenses (icon: memorial/flower)
- I'm not sure (icon: thinking face/question mark)
```

**Question 2: Who needs coverage?** (Single-select radio or cards)
```
Options:
- Just me
- Me and my spouse/partner
- Me and someone else
```

**Validation:** At least one goal must be selected before proceeding.

---

### SCREEN 2: Basic Information (30% progress)

**Headline:** "Tell us a bit about yourself"

**Fields:**

1. **Date of Birth** (Required)
   - Three separate inputs: MM / DD / YYYY
   - Auto-advance to next field on complete
   - Validate real date, age 18-85
   - Show calculated age badge after entry: "Age 67"

2. **Gender** (Required)
   - Two button-style options: Male | Female

3. **State** (Required)
   - Dropdown select with all 50 states
   - Consider auto-detecting from IP/browser and pre-filling

4. **Tobacco Use** (Required)
   - Two button-style options: No | Yes
   - **Conditional:** If "Yes" selected, show follow-up:
     - "How often?" - Daily | Occasionally | Quit within 12 months

**Validation:** All fields required before proceeding.

---

### SCREEN 3: Health Snapshot (60% progress)

**Headline:** "A few quick health questions"

**Subheadline:** "This helps us find the best options for you."

This screen uses progressive disclosure - only show follow-up questions when relevant conditions are selected.

#### Section A: Recent Health Events (Yes/No toggles or buttons)
```
"In the past 12 months, have you:"

- Been hospitalized overnight? [Yes] [No]
- Been diagnosed with or treated for cancer? [Yes] [No]
- Had a heart attack or stroke? [Yes] [No]
```

#### Section B: Current Health Status (Checkbox list)
```
"Do any of these currently apply to you?"

□ I use oxygen equipment
□ I use a wheelchair or walker daily due to illness
□ I'm on dialysis
□ I have been diagnosed with AIDS or HIV
□ I have Alzheimer's or dementia
□ None of these apply ✓ (selecting this clears others)
```

#### Section C: Common Conditions (Multi-select cards or checkboxes)
```
"Do you have any of these conditions? Select all that apply."

□ Diabetes
□ COPD or Asthma
□ Heart Disease
□ High Blood Pressure
□ Cancer (in the past)
□ None of these
```

#### CONDITIONAL FOLLOW-UP QUESTIONS

**If "Diabetes" is selected → Show inline expansion:**
```
"How do you manage your diabetes?"
○ Diet and exercise only
○ Oral medication (pills)
○ Insulin injections
```

**If "Heart Disease" is selected → Show inline expansion:**
```
"When was your last heart-related event or procedure?"
○ More than 2 years ago
○ 1-2 years ago
○ Less than 1 year ago
```

**If "Cancer (in the past)" is selected → Show inline expansion:**
```
"When did you complete cancer treatment?"
○ More than 2 years ago
○ 1-2 years ago
○ Less than 1 year ago
○ Currently in treatment
```

**If "COPD or Asthma" is selected → Show inline expansion:**
```
"Do you currently use oxygen equipment?"
○ No
○ Yes
```

#### Section D: Height & Weight (Conditional)
Only show this if NO major disqualifying conditions were selected in Sections A & B.
```
"Last step - your height and weight"

Height: [Feet dropdown] [Inches dropdown]
Weight: [Number input] lbs
```

**Skip Logic:** If user selected any of the Section B conditions (oxygen, wheelchair, dialysis, AIDS, Alzheimer's), they will be routed to Guaranteed Issue plans, and height/weight is not needed.

**Validation:** All visible sections must be completed.

---

### SCREEN 4: Budget (85% progress)

**Headline:** "What fits your budget?"

**Subheadline:** "Choose a monthly amount you're comfortable with."

**Option A: Quick-Select Cards (Recommended)**
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   $25-50    │ │   $50-100   │ │  $100-150   │
│             │ │  ★ Popular  │ │             │
└─────────────┘ └─────────────┘ └─────────────┘

┌─────────────┐ ┌──────────────────────────────┐
│    $150+    │ │  Enter custom amount         │
│             │ │  $ [___________]             │
└─────────────┘ └──────────────────────────────┘
```

**Option B: Slider Alternative**
```
"How much can you comfortably spend per month?"

$25 ─────────────●─────────────────── $200

Selected: $75/month

Helper text: "Most customers your age spend $50-$100/month"
```

**Button:** "See My Options →"

---

### SCREEN 5: Contact Information (90% progress)

**Headline:** "Almost done! Where should we send your quote?"

**Subheadline:** "A licensed agent will review your options and reach out within 24 hours."

**Fields:**

1. **First Name** (Required)
   - Text input
   - Placeholder: "First name"

2. **Last Name** (Required)
   - Text input
   - Placeholder: "Last name"

3. **Phone Number** (Required)
   - Tel input with formatting (XXX) XXX-XXXX
   - Placeholder: "(555) 555-5555"

4. **Email Address** (Required)
   - Email input with validation
   - Placeholder: "you@example.com"

5. **Best Time to Call** (Optional - helps agents)
   - Dropdown or button group
   - Options: Morning (9am-12pm) | Afternoon (12pm-5pm) | Evening (5pm-8pm)

**Trust Elements:**
```
🔒 Your information is secure and will never be sold.
📞 A licensed agent will call you - no pushy sales tactics.
```

**Button:** "See My Quote Options →"

**On Submit:**
- Validate all required fields
- Send email notification to agent (see Email Integration section below)
- Proceed to Results screen

---

### SCREEN 6: Results (100% progress)

**Headline:** Dynamic based on eligibility:
- Day One Coverage: "Great news! You qualify for immediate coverage 🎉"
- Guaranteed Issue: "Good news! We found coverage for you 👍"

**Subheadline:** "A licensed agent will contact you within 24 hours to finalize your coverage."

**Display personalized quote cards based on the user's budget selection and health profile.**

#### For Day One Coverage Eligible:
```
┌─────────────────────────────────────────────────┐
│  ⭐ RECOMMENDED                                 │
│                                                 │
│  $15,000 Coverage                              │
│  $78/month                                     │
│                                                 │
│  ✓ Coverage starts immediately                 │
│  ✓ Rate locked for life                        │
│  ✓ Builds cash value                           │
│  ✓ No medical exam required                    │
│                                                 │
│  [Select This Plan]                            │
└─────────────────────────────────────────────────┘

OTHER OPTIONS:
┌───────────────────┐  ┌───────────────────┐
│ $10,000           │  │ $20,000           │
│ $52/month         │  │ $104/month        │
│ [Select]          │  │ [Select]          │
└───────────────────┘  └───────────────────┘
```

#### For Guaranteed Issue (2-year waiting period):
```
┌─────────────────────────────────────────────────┐
│  YOUR PLAN                                      │
│                                                 │
│  $10,000 Guaranteed Acceptance                 │
│  $95/month                                     │
│                                                 │
│  ✓ Cannot be turned down                       │
│  ✓ No health questions                         │
│  ✓ No medical exam                             │
│                                                 │
│  ℹ️ How it works:                               │
│  • Accidental death: Full benefit from day 1   │
│  • Natural causes (first 2 years): Return of   │
│    premiums paid + 10%                         │
│  • After 2 years: Full benefit for any cause   │
│                                                 │
│  [Select This Plan]                            │
└─────────────────────────────────────────────────┘
```

#### Call-to-Action Section:
```
┌─────────────────────────────────────────────────┐
│  📞 Questions? Talk to a licensed agent        │
│                                                 │
│  Call: (XXX) XXX-XXXX                          │
│  [Request a Callback]                          │
└─────────────────────────────────────────────────┘
```

---

## Conditional Logic Summary

### Eligibility Routing Logic

```javascript
// Simplified eligibility determination

function determineEligibility(answers) {
  
  // GUARANTEED ISSUE ONLY (most restrictive conditions)
  const guaranteedIssueConditions = [
    answers.usesOxygen,
    answers.onDialysis,
    answers.hasAIDS,
    answers.hasAlzheimers,
    answers.wheelchairBound,
    answers.currentlyHasCancer,
    answers.cancerTreatmentWithin1Year,
    answers.heartEventWithin1Year,
    answers.hospitalizedLast12Months && answers.seriousCondition
  ];
  
  if (guaranteedIssueConditions.some(condition => condition === true)) {
    return 'GUARANTEED_ISSUE';
  }
  
  // GRADED BENEFIT (2-year waiting, but better rates than GI)
  const gradedConditions = [
    answers.heartEventWithin2Years,
    answers.cancerTreatmentWithin2Years,
    answers.diabetesWithInsulin && answers.hasComplications
  ];
  
  if (gradedConditions.some(condition => condition === true)) {
    return 'GRADED_BENEFIT';
  }
  
  // DAY ONE COVERAGE (Standard/Preferred)
  return 'DAY_ONE_COVERAGE';
}
```

### Skip Logic Rules

| Condition | Action |
|-----------|--------|
| User selects "None of these" in Section B | Skip to Section C |
| User selects "None of these" in Section C | Skip height/weight, go to Budget |
| User has GI-qualifying condition | Skip height/weight entirely |
| User selects "Just me" for coverage | Single applicant flow |
| User selects "Me and spouse" | Duplicate health questions for spouse |
| Age < 50 AND no health conditions | Can skip directly to budget |

### Height/Weight Skip Logic
These carriers don't require height/weight, so if user has borderline conditions, route to these:
- Aetna
- Superior Choice

---

## State Management

Store the following in state/context throughout the wizard:

```javascript
{
  // Screen 1
  coverageGoals: [], // array of selected goals
  coverageFor: '', // 'self', 'self_spouse', 'self_other'
  
  // Screen 2
  dateOfBirth: '',
  age: null, // calculated
  gender: '',
  state: '',
  tobaccoUse: false,
  tobaccoFrequency: '', // if tobaccoUse is true
  
  // Screen 3
  hospitalizedLast12Months: false,
  cancerLast12Months: false,
  heartAttackStrokeLast12Months: false,
  
  currentConditions: [], // from Section B checkboxes
  
  commonConditions: [], // from Section C
  diabetesManagement: '', // conditional
  heartEventTiming: '', // conditional
  cancerTreatmentTiming: '', // conditional
  usesOxygenForCOPD: false, // conditional
  
  height: { feet: null, inches: null },
  weight: null,
  
  // Screen 4
  budgetRange: '', // '$25-50', '$50-100', etc.
  customBudget: null, // if custom amount entered
  
  // Screen 5 - Contact Info
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  bestTimeToCall: '', // 'morning', 'afternoon', 'evening'
  
  // Calculated
  eligibilityType: '', // 'DAY_ONE', 'GRADED', 'GUARANTEED_ISSUE'
  recommendedCoverage: null,
  quoteOptions: [],
  
  // Submission tracking
  submittedAt: null,
  emailSent: false,
}
```

---

## Quote Calculation Logic

```javascript
// Simplified quote calculation (replace with actual rate tables)

function calculateQuotes(userProfile) {
  const { age, gender, tobaccoUse, eligibilityType, budgetRange } = userProfile;
  
  // Base rate per $1,000 of coverage (example rates)
  let baseRate = getBaseRate(age, gender, tobaccoUse);
  
  // Adjust for eligibility type
  if (eligibilityType === 'GUARANTEED_ISSUE') {
    baseRate *= 1.5; // 50% higher for GI
  } else if (eligibilityType === 'GRADED_BENEFIT') {
    baseRate *= 1.25; // 25% higher for graded
  }
  
  // Calculate coverage amount based on budget
  const budgetMidpoint = getBudgetMidpoint(budgetRange);
  const coverageAmount = Math.floor((budgetMidpoint / baseRate) * 1000);
  
  // Generate 3 options around the budget
  return [
    { coverage: roundToNearest(coverageAmount * 0.7, 1000), premium: calculatePremium(...) },
    { coverage: roundToNearest(coverageAmount, 1000), premium: calculatePremium(...), recommended: true },
    { coverage: roundToNearest(coverageAmount * 1.3, 1000), premium: calculatePremium(...) }
  ];
}
```

---

## Form Validation

### Screen 1
- At least one coverage goal selected
- Coverage type selected

### Screen 2
- Valid date of birth (real date, age 18-85)
- Gender selected
- State selected
- Tobacco use answered
- If tobacco = yes, frequency answered

### Screen 3
- All yes/no questions answered in Section A
- Section B: At least one option selected (including "None")
- Section C: At least one option selected (including "None")
- All conditional follow-ups completed
- Height/weight completed (if shown)

### Screen 4
- Budget selection made (card or custom amount)
- Custom amount within valid range ($25-$300)

### Screen 5
- First name required (min 2 characters)
- Last name required (min 2 characters)
- Phone required (valid 10-digit US phone)
- Email required (valid email format)
- Best time to call (optional but encouraged)

---

## Accessibility Requirements

- All form inputs have associated labels
- Error messages are announced to screen readers
- Keyboard navigation works throughout
- Focus management when transitioning screens
- Color contrast meets WCAG AA standards
- Touch targets are at least 44x44px on mobile

---

## Animation & Transitions

- **Screen transitions:** Subtle fade or slide (200-300ms)
- **Progress bar:** Smooth width transition (300ms ease-in-out)
- **Card selection:** Quick scale/border animation (150ms)
- **Conditional questions:** Slide down reveal (200ms)
- **Loading states:** Skeleton or spinner while calculating quotes

---

## Error Handling

- **Inline validation:** Show errors as user completes fields
- **Error styling:** Red border + error message below field
- **Required field indicator:** Subtle asterisk or "Required" label
- **API errors:** Friendly message with retry option
- **Session timeout:** Save progress, offer to continue

---

## Analytics Events to Track

```javascript
// Track these events for optimization
trackEvent('wizard_started');
trackEvent('screen_completed', { screen: 1, timeSpent: 5 });
trackEvent('goal_selected', { goal: 'protect_loved_ones' });
trackEvent('health_condition_selected', { condition: 'diabetes' });
trackEvent('budget_selected', { range: '$50-100' });
trackEvent('contact_submitted', { eligibilityType: 'DAY_ONE' });
trackEvent('quote_viewed', { eligibilityType: 'DAY_ONE', recommendedAmount: 15000 });
trackEvent('plan_selected', { coverage: 15000, premium: 78 });
trackEvent('wizard_abandoned', { screen: 3, lastField: 'health_conditions' });
trackEvent('phone_clicked', { screen: 'results' });
```

---

## Mobile Considerations

- Single column layout on screens < 768px
- Larger touch targets (minimum 44px)
- Fixed bottom button on mobile for primary action
- Collapsible sections for health questions if needed
- Number keyboard for date/age/weight inputs
- Dropdown for state selection (native select on mobile)

---

## Testing Scenarios

1. **Healthy 45-year-old** → Day One Coverage, all 3 tiers shown
2. **65-year-old with controlled diabetes (pills)** → Day One Coverage
3. **70-year-old with insulin-dependent diabetes** → May be Graded
4. **60-year-old with recent heart attack (6 months)** → Guaranteed Issue
5. **55-year-old cancer survivor (3+ years)** → Day One Coverage
6. **72-year-old with Alzheimer's** → Guaranteed Issue
7. **Tobacco user** → Higher rates but same eligibility logic
8. **Edge case: All "None" answers** → Fastest path, best rates

---

## File Structure Suggestion

```
/components
  /wizard
    WizardContainer.jsx       # Main wrapper, state management
    ProgressBar.jsx           # Ethos-style progress bar
    WizardHeader.jsx          # Logo + help phone
    
    /screens
      GoalsScreen.jsx         # Screen 1
      BasicInfoScreen.jsx     # Screen 2
      HealthScreen.jsx        # Screen 3
      BudgetScreen.jsx        # Screen 4
      ContactScreen.jsx       # Screen 5 (NEW - lead capture)
      ResultsScreen.jsx       # Screen 6
    
    /components
      CardSelector.jsx        # Reusable card selection component
      YesNoToggle.jsx         # Yes/No button pair
      CheckboxGroup.jsx       # Multi-select checkboxes
      ConditionalSection.jsx  # Expandable follow-up questions
      QuoteCard.jsx           # Quote display card
      
  /hooks
    useWizardState.js         # State management hook
    useEligibility.js         # Eligibility calculation
    useQuoteCalculation.js    # Quote generation
    
  /utils
    validation.js             # Form validation functions
    eligibilityRules.js       # Eligibility determination logic
    quoteCalculator.js        # Quote calculation logic
    
/app/api (or /pages/api for Pages Router)
  /submit-lead
    route.js                  # API endpoint for lead submission
    
/lib
  email.js                    # Email sending utilities (SendGrid, etc.)
  formatLeadEmail.js          # Email template formatting
```

---

## Email Integration (Lead Capture)

### Email Recipient
All lead submissions should be sent to: **jdsimpson90@gmail.com**

### When to Send Email
Trigger the email when the user submits Screen 5 (Contact Information), BEFORE showing the Results screen.

### Email Content - Agent Notification

**Subject Line:** `🔔 New Life Insurance Lead: {First Name} {Last Name} - {Eligibility Type}`

**Email Body:**
```
═══════════════════════════════════════════════════════════
           NEW LIFE INSURANCE LEAD
═══════════════════════════════════════════════════════════

📋 CONTACT INFORMATION
───────────────────────────────────────────────────────────
Name:           {First Name} {Last Name}
Phone:          {Phone Number}
Email:          {Email Address}
Best Time:      {Morning/Afternoon/Evening}
Submitted:      {Date & Time}

📊 ELIGIBILITY SUMMARY
───────────────────────────────────────────────────────────
Eligibility:    {Day One Coverage / Graded Benefit / Guaranteed Issue}
Est. Coverage:  ${Recommended Amount}
Est. Premium:   ${Recommended Premium}/month
Budget Range:   {Selected Budget}

👤 APPLICANT DETAILS
───────────────────────────────────────────────────────────
Age:            {Calculated Age}
Date of Birth:  {MM/DD/YYYY}
Gender:         {Male/Female}
State:          {State}
Tobacco Use:    {Yes/No} {Frequency if Yes}

🎯 COVERAGE GOALS
───────────────────────────────────────────────────────────
{List of selected goals}
Coverage For:   {Just me / Me and spouse / Me and someone else}

🏥 HEALTH INFORMATION
───────────────────────────────────────────────────────────
Recent Events (Past 12 Months):
  • Hospitalized overnight:     {Yes/No}
  • Cancer diagnosis:           {Yes/No}
  • Heart attack/stroke:        {Yes/No}

Current Conditions:
  • Uses oxygen:                {Yes/No}
  • Wheelchair/walker bound:    {Yes/No}
  • On dialysis:                {Yes/No}
  • AIDS/HIV:                   {Yes/No}
  • Alzheimer's/dementia:       {Yes/No}

Other Conditions:
{List each selected condition with follow-up answers}

Example:
  • Diabetes: Managed with {insulin/pills/diet}
  • Heart Disease: Last event {timing}
  • Cancer History: Treatment completed {timing}

Height/Weight:  {X'X" / XXX lbs} (if collected)

═══════════════════════════════════════════════════════════
                    ACTION REQUIRED
        Contact this lead within 24 hours!
═══════════════════════════════════════════════════════════
```

### Email Content - Customer Confirmation (Optional)

Send a confirmation email to the customer at their provided email address:

**Subject Line:** `Your Life Insurance Quote from {Company Name}`

**Email Body:**
```
Hi {First Name},

Thank you for requesting a life insurance quote!

Based on your answers, you qualify for:

  💰 {Coverage Amount} Coverage
  📅 ${Premium}/month
  ✅ {Day One Coverage / Guaranteed Acceptance}

WHAT'S NEXT?
A licensed agent will call you within 24 hours to:
  • Answer any questions you have
  • Review your options in detail
  • Help you apply if you're ready

Can't wait? Call us now at (XXX) XXX-XXXX

Best regards,
{Company Name}
{Phone Number}
{Website URL}

───────────────────────────────────────────────────────────
This is not a policy. Coverage is subject to underwriting approval.
```

### Implementation Options

#### Option A: Email Service (Recommended)
Use a transactional email service for reliability:
- **SendGrid** - Free tier: 100 emails/day
- **Mailgun** - Free tier: 5,000 emails/month
- **AWS SES** - Very low cost
- **Resend** - Developer-friendly, free tier available

```javascript
// Example using SendGrid
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendLeadNotification(leadData) {
  const msg = {
    to: 'jdsimpson90@gmail.com',
    from: 'leads@yourwebsite.com', // Must be verified sender
    subject: `🔔 New Life Insurance Lead: ${leadData.firstName} ${leadData.lastName}`,
    text: formatLeadEmail(leadData),
    html: formatLeadEmailHTML(leadData), // Optional HTML version
  };
  
  await sgMail.send(msg);
}
```

#### Option B: Serverless Function (Next.js API Route)
```javascript
// pages/api/submit-lead.js or app/api/submit-lead/route.js

export async function POST(request) {
  const leadData = await request.json();
  
  // Validate required fields
  if (!leadData.email || !leadData.phone || !leadData.firstName) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  try {
    // Send agent notification email
    await sendLeadNotification(leadData);
    
    // Optionally send customer confirmation
    await sendCustomerConfirmation(leadData);
    
    // Optionally save to database
    await saveLeadToDatabase(leadData);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return Response.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
```

#### Option C: Form Service (No-Code)
If you want a simpler solution without backend code:
- **Formspree** - Forward form submissions to email
- **Netlify Forms** - Built-in if using Netlify
- **Basin** - Form backend service

```html
<!-- Simple Formspree integration -->
<form action="https://formspree.io/f/{your-form-id}" method="POST">
  <!-- Your form fields -->
</form>
```

### Data to Capture in Email

Ensure ALL wizard answers are included in the agent notification:

```javascript
const leadData = {
  // Contact (Screen 5)
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  bestTimeToCall: '',
  submittedAt: new Date().toISOString(),
  
  // Goals (Screen 1)
  coverageGoals: [],
  coverageFor: '',
  
  // Basic Info (Screen 2)
  dateOfBirth: '',
  age: 0,
  gender: '',
  state: '',
  tobaccoUse: false,
  tobaccoFrequency: '',
  
  // Health (Screen 3)
  hospitalizedLast12Months: false,
  cancerLast12Months: false,
  heartAttackStrokeLast12Months: false,
  currentConditions: [],
  commonConditions: [],
  diabetesManagement: '',
  heartEventTiming: '',
  cancerTreatmentTiming: '',
  usesOxygenForCOPD: false,
  height: { feet: 0, inches: 0 },
  weight: 0,
  
  // Budget (Screen 4)
  budgetRange: '',
  customBudget: null,
  
  // Calculated
  eligibilityType: '',
  recommendedCoverage: 0,
  recommendedPremium: 0,
};
```

---

## Summary

Build a 6-screen wizard that:
1. Asks about goals and who needs coverage
2. Collects basic demographic info
3. Screens health with smart conditional questions
4. Captures budget preference
5. **Collects contact info (name, phone, email) and sends lead to agent**
6. Displays personalized quote options with next steps

**Key principles:**
- Fast (under 2 minutes for healthy users)
- Smart (only ask relevant follow-ups)
- Trustworthy (matches existing site design)
- Mobile-first (works great on all devices)
- Accessible (WCAG compliant)
- **Lead capture (all submissions emailed to jdsimpson90@gmail.com)**

**Email Integration:**
- Send detailed lead notification to agent immediately upon contact form submission
- Optionally send confirmation email to customer with their quote summary
- Use SendGrid, Mailgun, Resend, or similar service for reliable delivery

Match all colors, fonts, spacing, and component styles to the existing website design system.
