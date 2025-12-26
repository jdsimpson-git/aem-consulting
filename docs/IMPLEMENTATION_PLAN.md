# aem-consultings Website - Implementation Plan

This roadmap breaks down the development of the **aem-consultings Insurance Platform** into daily 2-hour work sessions. The goal is to build a functional MVP with a core **AI Chatbot** that guides users from qualification to policy issuance, followed by a post-MVP phase for advanced features.

**Total Duration:** 
- **MVP:** ~28 Days (2 Hours/Day)
- **Post-MVP:** ~15 Days (2 Hours/Day)

**Primary Tech Stack:** React (Vite), Tailwind CSS, shadcn/ui, Zustand, Supabase (Auth, DB, Storage, Edge Functions), OpenAI, Stripe, Resend, Sentry.

---

## Phase 1: Foundation & Setup (Days 1-4)
**Goal:** Set up the infrastructure and development environment.

### Day 1: Project & Supabase Setup
*   [x] **Supabase Project:** Create a new Supabase project (Free Tier).
*   [x] **Env Configuration:** Set up `.env.local` with Supabase URL/Anon Key.
*   [x] **Cleanup:** Clear existing demo components to make space for the product.
*   [x] **Verification:** App runs locally and connects to Supabase.
*   [x] **Deliverable:** Development environment ready.

### Day 2: UI Foundation & Design System
*   [x] **shadcn/ui Setup:** Initialize shadcn/ui with Tailwind.
*   [x] **Core Components:** Install Button, Input, Card, Dialog, Form components.
*   [x] **Theme:** Configure brand colors (warm, trustworthy palette).
*   [x] **Layout:** Create base layout component with responsive container.
*   [x] **Deliverable:** Design system foundation established.

### Day 3: Database Schema & Security
*   [x] **Schema Creation:** Create all MVP tables in Supabase:
    - `users` (extended profile)
    - `conversations`
    - `chat_messages`
    - `quotes`
    - `applications`
    - `policies`
    - `payments`
    - `audit_log`
*   [x] **RLS Policies:** Enable Row Level Security on all tables.
*   [x] **Indexes:** Create performance indexes (see DESIGN_SPEC.md).
*   [x] **Deliverable:** Database tables created and secured.

### Day 4: State Management & Project Structure
*   [x] **Zustand Setup:** Create stores for:
    - `useAuthStore` (user session)
    - `useChatStore` (conversation state)
    - `useQuoteStore` (current quote)
*   [x] **Folder Structure:** Organize `/components`, `/hooks`, `/stores`, `/lib`, `/pages`.
*   [x] **API Client:** Set up Supabase client wrapper with error handling.
*   [x] **Deliverable:** Clean architecture established.

---

## Phase 2: AI Chat Core (Days 5-9)
**Goal:** Build the intelligent aem-consultings chat interface.

### Day 5: Chat Interface (Frontend)
*   [ ] **UI Build:** Create `ChatWindow` component (full-page or modal).
*   [ ] **Message Components:** `UserMessage`, `AssistantMessage`, `TypingIndicator`.
*   [ ] **State:** Integrate with `useChatStore` for message history.
*   [ ] **UX Polish:** Auto-scroll, loading states, message timestamps.
*   [ ] **Deliverable:** Functional chat UI with mock responses.

### Day 6: AI Edge Function (Backend - Part 1)
*   [ ] **Edge Function:** Create `supabase/functions/ai-chat/index.ts`.
*   [ ] **OpenAI Setup:** Configure API key in Supabase secrets.
*   [ ] **Basic Flow:** User message → OpenAI API → Response.
*   [ ] **Error Handling:** Graceful fallback if OpenAI is unavailable.
*   [ ] **Deliverable:** Basic AI responses working.

### Day 7: AI Edge Function (Backend - Part 2)
*   [ ] **System Prompt:** Engineer detailed prompt:
    - Persona: "Friendly insurance advisor representing aem-consultings"
    - Task: Understand needs, recommend products, extract data
    - Constraints: No financial advice, stay on topic
*   [ ] **Structured Output:** Force JSON metadata with text reply.
*   [ ] **Data Extraction:** Parse age, zip, dependents, smoker status from conversation.
*   [ ] **Deliverable:** AI extracts structured data from natural conversation.

### Day 8: Chat Persistence & Guest Sessions
*   [ ] **Guest Sessions:** Generate anonymous session ID for non-logged users.
*   [ ] **Message Storage:** Save all messages to `chat_messages` table.
*   [ ] **Conversation Summary:** AI generates summary after key milestones.
*   [ ] **Rate Limiting:** Implement 20 msg/hour for users, 5/hour for guests.
*   [ ] **Deliverable:** Chat history persists and is rate-limited.

### Day 9: Chat-to-Quote Trigger
*   [ ] **Data Check:** After each message, check if we have enough data for quote.
*   [ ] **Required Fields:** Age, zip code, coverage interest (term/whole).
*   [ ] **Trigger UI:** When ready, show "Get Your Quote" call-to-action in chat.
*   [ ] **Handoff:** Pass extracted data to quote flow.
*   [ ] **Deliverable:** Seamless transition from chat to quote.

---

## Phase 3: Quote Engine & Accounts (Days 10-15)
**Goal:** Turn chat data into real insurance quotes and save user progress.

### Day 10: Quote Calculation Logic
*   [ ] **Pricing Table:** Create rate table in database or JSON config.
*   [ ] **Premium Formula:** Implement calculation function:
    - Base rate by age band
    - Adjustments for smoker, term length, gender, health class
*   [ ] **Edge Function:** Create `generate-quote` function.
*   [ ] **Deliverable:** Working calculator (e.g., `calculatePremium(35, 'term', 500000) => $24.50`).

### Day 11: Quote Display UI
*   [ ] **Quote Card:** Design premium display with coverage details.
*   [ ] **Breakdown:** Show base rate + adjustments transparently.
*   [ ] **CTAs:** "Customize Quote" and "Apply Now" buttons.
*   [ ] **Save Quote:** Store quote in database with expiration date.
*   [ ] **Deliverable:** User sees personalized quote.

### Day 12: Quote Customization
*   [ ] **Sliders:** Coverage amount ($100k - $1M), Term length (10-30y).
*   [ ] **Live Updates:** Recalculate premium as sliders move (debounced).
*   [ ] **Comparison:** Show side-by-side term vs whole life (if applicable).
*   [ ] **Deliverable:** Interactive quote customization.

### Day 13: Authentication Flow
*   [ ] **Auth UI:** Sign up / Login modal with email + Google OAuth.
*   [ ] **Protected Routes:** Implement route guards for `/dashboard`, `/apply`.
*   [ ] **Session Management:** Handle token refresh, logout.
*   [ ] **Deliverable:** Secure authentication working.

### Day 14: Guest-to-User Migration
*   [ ] **Conversation Transfer:** Link guest `conversation_id` to new user.
*   [ ] **Quote Association:** Update quote's `user_id` after signup.
*   [ ] **Magic Link:** Add passwordless login option.
*   [ ] **Deliverable:** Zero data loss when guests become users.

### Day 15: User Dashboard
*   [ ] **Dashboard Page:** Create protected `/dashboard` route.
*   [ ] **Status Cards:** Show current quote, application status, active policy.
*   [ ] **Quick Actions:** "Continue Application", "Download Policy", "Chat with the aem-consultings assistant".
*   [ ] **Deliverable:** Personalized home base for users.

---

## Phase 4: Application Flow (Days 16-21)
**Goal:** Collect the necessary data to legally issue a policy.

### Day 16: Application Form Structure
*   [ ] **Multi-Step Wizard:** Personal Info → Medical → Beneficiaries → Review.
*   [ ] **Progress Bar:** Visual indicator of completion.
*   [ ] **Auto-Save:** Save progress on each step change.
*   [ ] **Auto-Fill:** Pre-populate known data from chat/quote.
*   [ ] **Deliverable:** Navigation between form steps.

### Day 17: Personal Information Step
*   [ ] **Fields:** Full name, DOB, SSN (last 4), address, phone, email.
*   [ ] **Validation:** Real-time validation with Zod schemas.
*   [ ] **Address Lookup:** Optional zip code autocomplete.
*   [ ] **Deliverable:** Personal info collection working.

### Day 18: Medical Questionnaire
*   [ ] **Knockout Questions:** Implement 5 critical health questions.
*   [ ] **Conditional Logic:** Show follow-up questions based on answers.
*   [ ] **Knockout Flow:** If "Yes" to critical question → show referral message.
*   [ ] **Data Storage:** Save answers progressively to `applications.health_answers`.
*   [ ] **Deliverable:** Functional medical questionnaire with knockout logic.

### Day 19: Beneficiaries & Disclosures
*   [ ] **Beneficiary Form:** Name, relationship, percentage split.
*   [ ] **Multiple Beneficiaries:** Add/remove beneficiary rows (max 5).
*   [ ] **Disclosures:** HIPAA authorization, Truth in Application checkboxes.
*   [ ] **Deliverable:** Beneficiary and legal disclosure collection.

### Day 20: Review & E-Signature
*   [ ] **Summary View:** Display all answers for review before submission.
*   [ ] **Edit Capability:** Click to edit any section.
*   [ ] **E-Signature:** "Type your full name" input with timestamp + IP capture.
*   [ ] **Submit:** Update application status to `submitted`.
*   [ ] **Deliverable:** User can formally submit application.

### Day 21: Underwriting Engine (MVP)
*   [ ] **Rule Engine:** Implement approval criteria (see DESIGN_SPEC.md):
    - Age 18-50, no knockout answers, coverage ≤ $500k → Auto-approve
    - Otherwise → `under_review` status
*   [ ] **Decision UI:** "Processing..." spinner → Result screen.
*   [ ] **Audit Log:** Record decision with timestamp and reason.
*   [ ] **Deliverable:** Instant decisioning for qualified applicants.

---

## Phase 5: Payments & Policy Issuance (Days 22-26)
**Goal:** Take payment and deliver the digital product.

### Day 22: Stripe Integration
*   [ ] **Stripe Setup:** Create Stripe account, configure test mode.
*   [ ] **Checkout Session:** Create session for first month premium.
*   [ ] **Redirect Flow:** User → Stripe Checkout → Success/Cancel pages.
*   [ ] **Deliverable:** Payment collection working in test mode.

### Day 23: Payment Webhook Handler
*   [ ] **Edge Function:** Create `stripe-webhook` handler.
*   [ ] **Event Handling:** 
    - `checkout.session.completed` → Create policy, set to `active`
    - `invoice.payment_failed` → Alert user, set policy `at_risk`
*   [ ] **Payment Record:** Save to `payments` table.
*   [ ] **Deliverable:** Automated policy activation on payment.

### Day 24: PDF Policy Generation
*   [ ] **PDF Library:** Use `@react-pdf/renderer` (client-side) or external service.
*   [ ] **Template:** Design policy certificate:
    - aem-consultings logo, policy number
    - Insured name, coverage details
    - Effective/expiration dates
    - Beneficiaries list
*   [ ] **Generation:** Render PDF with user data.
*   [ ] **Deliverable:** Downloadable policy document.

### Day 25: Policy Storage & Delivery
*   [ ] **Supabase Storage:** Upload PDF to private bucket.
*   [ ] **Signed URLs:** Generate time-limited download links.
*   [ ] **Email Delivery:** Use Resend to send welcome email with PDF.
*   [ ] **Deliverable:** User receives policy via email.

### Day 26: Dashboard Enhancement
*   [ ] **Active Policy Card:** Show policy details, download button.
*   [ ] **Payment History:** List past payments.
*   [ ] **Support Link:** "Questions? Email support@aem-consultings.com".
*   [ ] **End-to-End Test:** Complete flow: Chat → Quote → Apply → Pay → Email.
*   [ ] **Deliverable:** Polished user dashboard.

---

## Phase 6: Admin, Testing & Launch (Days 27-32)
**Goal:** Build admin tools, test thoroughly, and go live.

### Day 27: Admin Dashboard - Foundation
*   [ ] **Admin Check:** Verify `is_admin` flag before showing admin routes.
*   [ ] **Applications List:** Table of all applications with status, date, name.
*   [ ] **Filters:** Filter by status (pending, approved, rejected).
*   [ ] **Deliverable:** Basic admin application view.

### Day 28: Admin Dashboard - Details
*   [ ] **Application Detail:** View full application data.
*   [ ] **Chat History:** See user's conversation with the aem-consultings assistant.
*   [ ] **Manual Actions:** Approve/Reject with reason (for `under_review` apps).
*   [ ] **Deliverable:** Full admin capabilities.

### Day 29: Error Tracking & Monitoring
*   [ ] **Sentry Setup:** Install Sentry SDK for frontend + Edge Functions.
*   [ ] **Error Boundaries:** Add React error boundaries to key features.
*   [ ] **Logging:** Structured logging in Edge Functions.
*   [ ] **Deliverable:** Production-ready error tracking.

### Day 30: Security Audit & Testing
*   [ ] **RLS Verification:** Test that users cannot access other users' data.
*   [ ] **Input Validation:** Verify all API endpoints validate inputs (Zod).
*   [ ] **Secrets Check:** Ensure no API keys exposed in frontend bundle.
*   [ ] **Unit Tests:** Test quote calculation logic.
*   [ ] **Deliverable:** Security verified.

### Day 31: Mobile & Accessibility
*   [ ] **Responsive Testing:** Test chat, application on mobile viewport.
*   [ ] **Touch Targets:** Ensure 44x44px minimum for interactive elements.
*   [ ] **Accessibility:** Screen reader test, ARIA labels, keyboard navigation.
*   [ ] **Deliverable:** Mobile-friendly and accessible.

### Day 32: AI Guardrails & Polish
*   [ ] **Prompt Updates:** Refine AI to avoid financial advice, handle edge cases.
*   [ ] **Fallback Responses:** Graceful "I don't know" → offer support email.
*   [ ] **Disclaimers:** Ensure all required legal text is visible.
*   [ ] **Deliverable:** Production-safe AI chat.

### Day 33: Staging & Final Testing
*   [ ] **Staging Environment:** Deploy to staging.aem-consultings.com (Vercel preview).
*   [ ] **Full E2E Test:** Complete happy path with test data.
*   [ ] **Bug Fixes:** Address any issues found.
*   [ ] **Deliverable:** Staging environment validated.

### Day 34: Production Launch
*   [ ] **Domain Setup:** Connect custom domain in Vercel.
*   [ ] **Production Keys:** Switch Supabase/Stripe/Resend to production mode.
*   [ ] **DNS/SSL:** Verify HTTPS working on custom domain.
*   [ ] **Live Test:** Purchase a $1 test policy with real card.
*   [ ] **Monitoring:** Verify Sentry, logging working in production.
*   [ ] **Go Live! 🎉**

---

## Phase 7: Post-MVP Enhancements (Days 35-50)
**Goal:** Expand features and improve the product based on initial feedback.

### Week 7 (Days 35-37): Analytics & Insights
*   [ ] **Funnel Tracking:** Implement conversion tracking at each step.
*   [ ] **Dashboard Metrics:** Admin view of key KPIs.
*   [ ] **AI Performance:** Track messages-to-quote, extraction accuracy.
*   [ ] **Deliverable:** Data-driven insights.

### Week 8 (Days 38-41): Health Insurance Products
*   [ ] **Health Quote Logic:** Different pricing model for health products.
*   [ ] **Health Questions:** Separate medical questionnaire.
*   [ ] **Plan Comparison:** Side-by-side plan comparison UI.
*   [ ] **Deliverable:** Health insurance offering.

### Week 9 (Days 42-44): Advanced AI Features
*   [ ] **Context Memory:** AI remembers user across sessions.
*   [ ] **Proactive Suggestions:** "You mentioned kids—consider child protection."
*   [ ] **Sentiment Analysis:** Detect frustrated users, offer human handoff.
*   [ ] **Deliverable:** Smarter AI interactions.

### Week 10 (Days 45-47): Retention & Growth
*   [ ] **Renewal Reminders:** Automated emails before policy expiration.
*   [ ] **Referral Program:** $25 credit per successful referral.
*   [ ] **Policy Comparison:** Compare aem-consultings quotes vs. competitors.
*   [ ] **Deliverable:** Growth features.

### Week 11 (Days 48-50): Agent Channel (B2B)
*   [ ] **Agent Portal:** White-label quote tool for agents.
*   [ ] **Commission Tracking:** Record agent-attributed sales.
*   [ ] **Co-Browsing:** Support agents can view customer screens.
*   [ ] **Deliverable:** B2B distribution channel.

---

## Future Phases (Backlog)

### Compliance & Scale
- [ ] State-specific form variations
- [ ] Multi-language support (Spanish priority)
- [ ] Database read replicas for scale
- [ ] SOC 2 compliance preparation

### Native Mobile
- [ ] React Native app
- [ ] Push notifications for reminders
- [ ] Biometric login (Face ID, Touch ID)

### Advanced Underwriting
- [ ] Integration with MIB (Medical Information Bureau)
- [ ] Prescription drug check (RxCheck)
- [ ] Dynamic pricing based on lifestyle data

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| OpenAI API costs high | Rate limiting, caching common responses, fallback to cheaper models |
| Supabase free tier limits | Monitor usage, upgrade plan if needed, optimize queries |
| PDF generation memory limits | Use client-side generation or external PDF service |
| Stripe integration issues | Thorough testing in test mode, use Stripe CLI for webhook testing |
| Security vulnerabilities | Regular RLS audits, input validation, Sentry alerts for anomalies |

---

## Success Metrics (MVP)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Chat → Quote conversion | > 50% | Funnel analytics |
| Quote → Application | > 30% | Funnel analytics |
| Application → Approval | > 70% | (qualified applicants) |
| Time to quote | < 3 minutes | Average from chat start |
| Customer satisfaction | > 4.0/5 | Post-purchase survey |
| AI accuracy | > 90% | Manual review of extractions |
