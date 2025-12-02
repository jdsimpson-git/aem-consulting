# aem-consultings Website - Product & Design Specification

## 1. Product Overview
**Elevator Pitch:** An online direct-to-consumer (D2C) life & health insurance platform called "aem-consultings". It allows users to get quotes, apply, and bind coverage fully online. Key differentiator: An **AI Advisory Chat** that qualifies customers and recommends products before they apply.

**Target Audience:** Ages 25–55, digitally native, seeking fast financial protection with minimal paperwork.

---

## 2. MVP Scope (Minimum Viable Product)
The MVP focuses on the "Happy Path": A user chats with AI -> gets a recommendation -> gets a quote -> applies -> gets approved (simulated).

### Core Features
1.  **AI Qualification Chat ("aem-consultings assistant"):** A conversational interface to gather user needs (dependents, debt, goals) and suggest the right product (Term vs. Whole Life).
2.  **Quote Engine:** Inputs from chat (age, zip, smoker status) generate an instant price.
3.  **User Accounts:** Email/Social login to save progress.
4.  **Application Form:** Simplified digital application with e-signature consent.
5.  **Document Management:** Policy PDF generation and secure storage.
6.  **Admin Dashboard:** View applications and chat logs.

### Out of Scope (MVP)
- Health insurance products (Phase 2)
- Agent portal / B2B channel
- Multi-language support
- Mobile native apps

---

## 3. Technical Architecture & Stack
We prioritize a "Serverless" and "Free-Tier Friendly" approach for the MVP to minimize costs while maintaining scalability.

| Component | Recommended (Scale) | MVP / Free-Tier Alternative | Selection for MVP |
| :--- | :--- | :--- | :--- |
| **Frontend** | React / Next.js | React (Vite) + Tailwind | **React (Vite)** (Already set up) |
| **Backend** | Node.js (Express) on AWS | Supabase Edge Functions | **Supabase** (BaaS) |
| **Database** | AWS RDS (Postgres) | Supabase / Neon (Postgres) | **Supabase** (Free Tier) |
| **Auth** | Auth0 / AWS Cognito | Supabase Auth | **Supabase Auth** |
| **File Storage** | AWS S3 | Supabase Storage | **Supabase Storage** |
| **AI / LLM** | OpenAI GPT-4 | HuggingFace / DeepSeek | **OpenAI** (Low cost, high quality) |
| **Email** | SendGrid | Resend | **Resend** (3000 emails/mo free) |
| **Payments** | Stripe | Stripe | **Stripe** (Pay as you go) |
| **Hosting** | AWS Amplify | Vercel / Netlify | **Vercel** (Free for hobby) |
| **State Management** | Redux | Zustand / Context | **Zustand** (Simple, lightweight) |
| **UI Components** | Custom | shadcn/ui | **shadcn/ui** (Accessible, customizable) |
| **Error Tracking** | Datadog | Sentry | **Sentry** (Free tier available) |

### System Diagram
```
[User Browser] <--> [Vite React App (Vercel)]
                         |
                         +--> [Supabase Auth] (Identity)
                         +--> [Supabase DB] (Postgres Data)
                         +--> [Supabase Storage] (Policy PDFs)
                         +--> [Edge Functions] (Business Logic)
                                 |
                                 +--> [OpenAI API] (Chat Intelligence)
                                 +--> [Stripe API] (Payments)
                                 +--> [Resend API] (Email)
                                 +--> [Sentry] (Error Tracking)
```

---

## 4. Data Model (Schema)

### `users`
*   `id` (UUID, PK) - Supabase Auth ID
*   `email` (Unique, NOT NULL)
*   `full_name` (TEXT)
*   `phone` (TEXT)
*   `date_of_birth` (DATE)
*   `is_admin` (BOOLEAN, DEFAULT false)
*   `created_at` (TIMESTAMPTZ)
*   `updated_at` (TIMESTAMPTZ)

### `conversations`
*   `id` (UUID, PK)
*   `user_id` (FK -> users.id, nullable for guest)
*   `guest_session_id` (TEXT, for anonymous users)
*   `summary` (TEXT, AI-generated summary of user needs)
*   `recommended_product` (ENUM: 'term', 'whole', 'health', null)
*   `extracted_data` (JSONB - age, zip, dependents, etc.)
*   `status` (ENUM: 'active', 'converted', 'abandoned')
*   `message_count` (INTEGER, DEFAULT 0)
*   `created_at` (TIMESTAMPTZ)
*   `updated_at` (TIMESTAMPTZ)

### `chat_messages` (NEW)
*   `id` (UUID, PK)
*   `conversation_id` (FK -> conversations.id, ON DELETE CASCADE)
*   `role` (ENUM: 'user', 'assistant', 'system')
*   `content` (TEXT)
*   `metadata` (JSONB - tokens_used, extracted_fields, intent)
*   `created_at` (TIMESTAMPTZ)

### `quotes`
*   `id` (UUID, PK)
*   `conversation_id` (FK -> conversations.id)
*   `user_id` (FK -> users.id, nullable)
*   `product_type` (ENUM: 'term', 'whole', 'health')
*   `coverage_amount` (INTEGER, in cents)
*   `term_length` (INTEGER, years - null for whole life)
*   `monthly_premium` (INTEGER, in cents)
*   `annual_premium` (INTEGER, in cents)
*   `inputs_json` (JSONB - age, zip, smoker, health_class)
*   `expires_at` (TIMESTAMPTZ, 30 days from creation)
*   `created_at` (TIMESTAMPTZ)

### `applications`
*   `id` (UUID, PK)
*   `user_id` (FK -> users.id, NOT NULL)
*   `quote_id` (FK -> quotes.id)
*   `status` (ENUM: 'draft', 'submitted', 'under_review', 'approved', 'rejected', 'withdrawn')
*   `personal_info` (JSONB - name, address, SSN last 4, etc.)
*   `health_answers` (JSONB - medical questionnaire responses)
*   `beneficiaries` (JSONB - array of beneficiary objects)
*   `disclosures_accepted` (BOOLEAN)
*   `signature_data` (JSONB - typed name, IP, timestamp)
*   `rejection_reason` (TEXT, nullable)
*   `submitted_at` (TIMESTAMPTZ)
*   `decided_at` (TIMESTAMPTZ)
*   `created_at` (TIMESTAMPTZ)
*   `updated_at` (TIMESTAMPTZ)

### `policies` (NEW)
*   `id` (UUID, PK)
*   `application_id` (FK -> applications.id, UNIQUE)
*   `user_id` (FK -> users.id)
*   `policy_number` (TEXT, UNIQUE, e.g., "AEM-2024-001234")
*   `product_type` (ENUM: 'term', 'whole', 'health')
*   `coverage_amount` (INTEGER)
*   `monthly_premium` (INTEGER)
*   `effective_date` (DATE)
*   `expiration_date` (DATE, null for whole life)
*   `status` (ENUM: 'pending_payment', 'active', 'lapsed', 'cancelled', 'expired')
*   `document_url` (TEXT, signed URL to PDF)
*   `created_at` (TIMESTAMPTZ)
*   `updated_at` (TIMESTAMPTZ)

### `payments` (NEW)
*   `id` (UUID, PK)
*   `policy_id` (FK -> policies.id)
*   `user_id` (FK -> users.id)
*   `stripe_payment_intent_id` (TEXT)
*   `stripe_invoice_id` (TEXT, for subscriptions)
*   `amount_cents` (INTEGER)
*   `currency` (TEXT, DEFAULT 'usd')
*   `status` (ENUM: 'pending', 'succeeded', 'failed', 'refunded')
*   `payment_type` (ENUM: 'initial', 'recurring', 'reinstatement')
*   `billing_period_start` (DATE)
*   `billing_period_end` (DATE)
*   `created_at` (TIMESTAMPTZ)

### `audit_log` (NEW - for compliance)
*   `id` (UUID, PK)
*   `entity_type` (TEXT - 'application', 'policy', 'user')
*   `entity_id` (UUID)
*   `action` (TEXT - 'status_change', 'data_update', 'access')
*   `old_value` (JSONB)
*   `new_value` (JSONB)
*   `performed_by` (UUID, FK -> users.id)
*   `ip_address` (INET)
*   `user_agent` (TEXT)
*   `created_at` (TIMESTAMPTZ)

### Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_guest ON conversations(guest_session_id);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_quotes_user ON quotes(user_id);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_policies_user ON policies(user_id);
CREATE INDEX idx_policies_status ON policies(status);
CREATE INDEX idx_payments_policy ON payments(policy_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
```

---

## 5. API Specification (Key Endpoints)

Since we are using Supabase, many simple CRUD operations happen directly via the client SDK. However, complex logic uses Edge Functions.

### `POST /functions/v1/ai-chat`
*   **Purpose:** Process user message and return AI advice + extract key data points.
*   **Rate Limit:** 20 requests/user/hour, 5 requests/guest/hour
*   **Request:** 
```json
{
  "message": "I have two kids and a mortgage",
  "conversation_id": "uuid-or-null",
  "guest_session_id": "anonymous-session-token"
}
```
*   **Response:** 
```json
{
  "reply": "That's wonderful! Term life insurance could be a great fit to protect your family...",
  "conversation_id": "uuid",
  "extracted_data": {
    "dependents": 2,
    "has_mortgage": true
  },
  "missing_fields": ["age", "zip_code", "smoker_status"],
  "ready_for_quote": false,
  "tokens_used": 245
}
```

### `POST /functions/v1/generate-quote`
*   **Purpose:** Calculate premium based on risk factors.
*   **Request:** 
```json
{
  "age": 35,
  "zip_code": "10001",
  "gender": "male",
  "smoker": false,
  "health_class": "standard",
  "coverage_amount": 500000,
  "term_length": 20,
  "product_type": "term"
}
```
*   **Response:** 
```json
{
  "quote_id": "uuid",
  "monthly_premium": 2450,
  "annual_premium": 28000,
  "coverage_amount": 500000,
  "term_length": 20,
  "valid_until": "2024-02-15T00:00:00Z",
  "factors": {
    "base_rate": 2100,
    "age_adjustment": 200,
    "location_adjustment": 150
  }
}
```

### `POST /functions/v1/submit-application`
*   **Purpose:** Validate, run underwriting rules, and finalize application.
*   **Request:** 
```json
{
  "application_id": "uuid",
  "signature": {
    "typed_name": "John Doe",
    "agreed_to_terms": true,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```
*   **Response:** 
```json
{
  "status": "approved",
  "policy_id": "uuid",
  "policy_number": "AEM-2024-001234",
  "next_step": "payment",
  "checkout_url": "https://checkout.stripe.com/..."
}
```

### `POST /functions/v1/stripe-webhook`
*   **Purpose:** Handle Stripe payment events.
*   **Events Handled:**
    - `checkout.session.completed` - Activate policy
    - `invoice.paid` - Record recurring payment
    - `invoice.payment_failed` - Mark policy at risk
    - `customer.subscription.deleted` - Cancel policy

### `GET /functions/v1/policy-document/:policy_id`
*   **Purpose:** Generate signed URL for policy PDF download.
*   **Auth:** Requires authenticated user who owns the policy.

---

## 6. Underwriting Rules (MVP)

### Instant Approval Criteria
All of the following must be true:
- Age: 18-50
- Non-smoker OR smoker under 40
- Coverage amount ≤ $500,000
- All health questions answered "No"

### Knockout Questions (Automatic Referral)
If ANY of these are "Yes", application goes to manual review:
1. Have you had a heart attack, stroke, or cancer in the last 5 years?
2. Are you currently receiving treatment for any serious illness?
3. Have you been hospitalized in the last 12 months (excluding childbirth)?
4. Have you ever been declined for life insurance?
5. Do you have any hazardous occupations or hobbies (pilot, skydiving, etc.)?

### Premium Calculation Formula (MVP)
```
Base Rate = $15/month per $100,000 coverage (for 30-year-old, 20-year term)

Adjustments:
- Age factor: +3% per year over 30, -2% per year under 30
- Smoker: +150%
- Term length: 10yr = -20%, 30yr = +30%
- Gender: Male +10%, Female -5%
- Health class: Preferred = -15%, Standard = 0%, Substandard = +40%
```

---

## 7. Security & Compliance

### Row Level Security (RLS) Policies
```sql
-- Users can only see their own data
CREATE POLICY "Users view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can only see their own conversations
CREATE POLICY "Users view own conversations" ON conversations
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Admins can view all applications
CREATE POLICY "Admins view all applications" ON applications
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM users WHERE is_admin = true)
    OR auth.uid() = user_id
  );
```

### Security Checklist
- [ ] **HTTPS/TLS:** Enforced by Vercel/Supabase
- [ ] **Data Privacy:** RLS enabled on all user-facing tables
- [ ] **API Rate Limiting:** Implemented on all Edge Functions
- [ ] **Input Validation:** Zod schemas for all API inputs
- [ ] **XSS Prevention:** React's built-in escaping + DOMPurify for user content
- [ ] **CORS:** Restricted to production domain only
- [ ] **Secrets Management:** All API keys in Supabase Vault, not in code
- [ ] **PII Encryption:** SSN stored encrypted (last 4 only for MVP)
- [ ] **Audit Logging:** All status changes logged with IP/timestamp

### Legal Disclaimers (Required in UI)
1. Chat interface: "The aem-consultings assistant is an AI system. This is not financial advice. Consult a licensed agent for personalized recommendations."
2. Quote page: "This quote is an estimate. Final premium may vary based on underwriting."
3. Application: HIPAA authorization checkbox, Truth in Application disclosure.

---

## 8. Error Handling Strategy

### Frontend Error Boundaries
- Global error boundary catches React crashes
- Per-feature error boundaries for Chat, Quote, Application
- Fallback UI with "Try Again" + support email

### API Error Responses
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Age must be between 18 and 85",
    "field": "age",
    "request_id": "req_abc123"
  }
}
```

### Error Codes
| Code | HTTP Status | User Message |
|------|-------------|--------------|
| `VALIDATION_ERROR` | 400 | Clear field-specific message |
| `UNAUTHORIZED` | 401 | "Please log in to continue" |
| `FORBIDDEN` | 403 | "You don't have access to this resource" |
| `NOT_FOUND` | 404 | "Resource not found" |
| `RATE_LIMITED` | 429 | "Too many requests. Please wait a moment." |
| `AI_UNAVAILABLE` | 503 | "The aem-consultings assistant is taking a short break. Try again in a minute." |
| `INTERNAL_ERROR` | 500 | "Something went wrong. We've been notified." |

---

## 9. Analytics & Monitoring

### Key Metrics to Track
- **Funnel:** Chat started → Quote generated → Application started → Submitted → Approved → Paid
- **AI Performance:** Avg messages to quote, extraction accuracy, fallback rate
- **Business:** Conversion rate, avg premium, policy count, MRR

### Monitoring
- Sentry for error tracking (frontend + Edge Functions)
- Supabase Dashboard for DB performance
- Vercel Analytics for Core Web Vitals
- Custom dashboard for business metrics (Phase 2)
