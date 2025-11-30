# Auntie Website - Implementation Plan (MVP)

This roadmap breaks down the development of the **Auntie Insurance Platform** into daily 2-hour work sessions. The goal is to build a functional MVP with a core **AI Chatbot** that guides users from qualification to policy issuance.

**Total Duration:** ~25 Days (2 Hours/Day)
**Primary Tech Stack:** React (Vite), Supabase (Auth, DB, Storage, Edge Functions), OpenAI, Stripe, Resend.

---

## Phase 1: Foundation & AI Core (Days 1-5)
**Goal:** Set up the infrastructure and build the intelligent "Auntie" chat interface.

### Day 1: Project & Supabase Setup
*   [ ] **Tech Setup:** Initialize a new Supabase project (Free Tier).
*   [ ] **Env Vars:** Connect Supabase URL/Anon Key to the local React app (`.env`).
*   [ ] **Cleanup:** Clear existing demo components in the React app to make space for the product.
*   [ ] **Deliverable:** App runs locally and connects to a live backend instance.

### Day 2: Database Schema & Security
*   [ ] **Schema Definition:** Create tables in Supabase: `users`, `conversations`, `quotes`, `applications` (refer to DESIGN_SPEC.md).
*   [ ] **Security:** Enable Row Level Security (RLS). Policies: Users can only read/write their own data.
*   [ ] **Deliverable:** Database tables created and secured.

### Day 3: AI Chat Interface (Frontend)
*   [ ] **UI Build:** Create a sticky or full-page "Chat with Auntie" component.
*   [ ] **State:** Manage chat history (user vs. AI messages) in React state.
*   [ ] **UX:** Add loading states (typing indicators) and auto-scroll.
*   [ ] **Deliverable:** A functional chat UI (static/mock responses).

### Day 4: AI Integration (Backend)
*   [ ] **Edge Function:** Create a Supabase Edge Function `ai-chat`.
*   [ ] **OpenAI Connection:** Configure OpenAI API key in Supabase secrets.
*   [ ] **Logic:** Pass user input to GPT-4/3.5-turbo and return a response.
*   [ ] **Deliverable:** Frontend chat sends message -> Backend -> OpenAI -> Backend -> Frontend displays reply.

### Day 5: Chat-to-Data Pipeline
*   [ ] **System Prompt:** Engineer the AI system prompt to "act as an insurance advisor" and extract key data (Age, Zip, Dependents).
*   [ ] **Structured Output:** Force the AI to return JSON metadata (recommendations) alongside the text reply.
*   [ ] **Persistence:** Save chat logs to the `conversations` table.
*   [ ] **Deliverable:** Chatbot distinguishes between "Small talk" and "Data extraction".

---

## Phase 2: Quote Engine & Accounts (Days 6-10)
**Goal:** Turn chat data into real insurance quotes and save user progress.

### Day 6: Quote Logic Implementation
*   [ ] **Pricing Model:** Create a simple JSON or Database table for pricing rates (e.g., base rate per $1000 coverage by age band).
*   [ ] **Calculation Function:** Create a utility (or Edge Function) that takes Age/Gender/Smoker status and outputs a Monthly Premium.
*   [ ] **Deliverable:** A working calculator (e.g., `calculatePremium(30, 'term', 500000) => $22.50`).

### Day 7: Quote UI & Display
*   [ ] **Integration:** When Chatbot detects sufficient data, trigger the Quote function.
*   [ ] **UI Card:** Design a "Quote Card" that slides in or appears in the chat stream.
*   [ ] **Call to Action:** Add buttons: "Customize Quote" or "Apply Now".
*   [ ] **Deliverable:** User gets a price in the chat window.

### Day 8: Product Configurator
*   [ ] **Slider UI:** Allow users to adjust Coverage Amount ($100k - $1M) and Term Length (10-30y) on the Quote Card.
*   [ ] **Live Updates:** Recalculate premium instantly as sliders move.
*   [ ] **Deliverable:** Interactive quote customization.

### Day 9: Authentication Integration
*   [ ] **Sign Up Flow:** When user clicks "Apply Now", trigger Supabase Auth (Email/Password or Google).
*   [ ] **Context persistence:** Ensure chat history and quote data are linked to the new `user_id` after login.
*   [ ] **Deliverable:** User can sign up/login and not lose their quote.

### Day 10: User Dashboard Foundation
*   [ ] **Dashboard Page:** Create `/dashboard` route (protected).
*   [ ] **State Display:** Show current status (e.g., "Quote Saved" or "Application Started").
*   [ ] **Deliverable:** A personalised home base for the user.

---

## Phase 3: Application Flow (Days 11-15)
**Goal:** Collect the necessary data to legally issue a policy.

### Day 11: Application Form Structure
*   [ ] **Form Layout:** Create a multi-step wizard (Step 1: Personal, Step 2: Health, Step 3: Beneficiaries).
*   [ ] **Auto-fill:** Pre-populate data known from the Chat/Quote phase.
*   [ ] **Deliverable:** Basic navigation between form steps.

### Day 12: Health & Lifestyle Questions
*   [ ] **Knockout Logic:** Implement logic for straight-through processing (e.g., "Have you had a heart attack?" -> If Yes, refer to agent).
*   [ ] **Data Save:** Save answers progressively to `applications` table (JSON column).
*   [ ] **Deliverable:** Functional medical questionnaire.

### Day 13: Identity & Beneficiaries
*   [ ] **Beneficiary Inputs:** Form for Name, Relation, % Split.
*   [ ] **Legal Disclosures:** Add checkboxes for HIPAA authorization and Truth in Application.
*   [ ] **Deliverable:** Completed application data set.

### Day 14: E-Consent & Application "Submit"
*   [ ] **Summary View:** Page to review all answers before submitting.
*   [ ] **Signature UI:** A simple canvas or text input to "Type Name" as e-signature.
*   [ ] **Submission:** Update application status to `submitted` in DB.
*   [ ] **Deliverable:** User can formally submit the application.

### Day 15: Underwriting Simulation (Mock)
*   [ ] **Rule Engine:** Simple backend check: If no major health issues + Age < 50 -> Status `approved`.
*   [ ] **Feedback:** Show "Approving..." spinner, then "Congratulations!" screen.
*   [ ] **Deliverable:** Instant decisioning capability.

---

## Phase 4: Payments & Policy Issuance (Days 16-20)
**Goal:** Take money and deliver the digital product.

### Day 16: Stripe Setup
*   [ ] **Stripe Account:** Set up Stripe test mode.
*   [ ] **Checkout:** Create a Stripe Checkout Session for the "First Month Premium".
*   [ ] **Deliverable:** Redirect user to Stripe payment page.

### Day 17: Payment Fulfillment
*   [ ] **Webhook:** Create a Supabase Edge Function to listen for `checkout.session.completed`.
*   [ ] **Status Update:** When paid, update policy status to `active`.
*   [ ] **Deliverable:** Application moves to "Active" state after payment.

### Day 18: PDF Generation
*   [ ] **PDF Lib:** Use `jspdf` or similar in an Edge Function.
*   [ ] **Template:** Create a simple certificate template (Logo, Policy #, Dates, Beneficiaries).
*   [ ] **Generation:** Render PDF with user data.
*   [ ] **Deliverable:** A downloadable policy file.

### Day 19: Policy Delivery
*   [ ] **Storage:** Upload generated PDF to Supabase Storage (private bucket).
*   [ ] **Email:** Use Resend (API) to email the PDF and "Welcome" message to the user.
*   [ ] **Deliverable:** User receives their policy via email.

### Day 20: Dashboard Polish
*   [ ] **Policy View:** Update Dashboard to show "Active Policy" card with "Download Policy" button.
*   [ ] **End-to-End Test:** Run through the whole flow: Chat -> Quote -> Account -> App -> Pay -> Email.

---

## Phase 5: Admin, Admin & Launch (Days 21-25)
**Goal:** Tools for you to manage the business and go live.

### Day 21: Admin Dashboard
*   [ ] **Admin Role:** Create an `admin` flag in `users` table.
*   [ ] **Table View:** Create a page to list all applications and their status.
*   [ ] **Detail View:** Click to see user chat logs and application answers.
*   [ ] **Deliverable:** Internal tool to see who is buying.

### Day 22: Security Audit
*   [ ] **RLS Check:** Verify no user can see another's data.
*   [ ] **Input Validation:** Ensure API endpoints validate all inputs (Zod).
*   [ ] **Env Vars:** Ensure secrets are not exposed in frontend bundles.

### Day 23: Mobile Optimization
*   [ ] **Responsiveness:** Test Chat and Application on mobile view.
*   [ ] **Touch Targets:** Ensure buttons and inputs are thumb-friendly.

### Day 24: Chatbot Fine-Tuning
*   [ ] **Guardrails:** Update system prompt to avoid giving financial advice or making guarantees.
*   [ ] **Fallback:** Handle "I don't know" cases by offering a support email.

### Day 25: Deployment & Launch
*   [ ] **Domain:** Connect custom domain in Vercel.
*   [ ] **Prod Keys:** Switch Supabase/Stripe/Resend keys to Production mode.
*   [ ] **Live Test:** Purchase a $1 policy with a real card.
*   [ ] **Go Live!**
