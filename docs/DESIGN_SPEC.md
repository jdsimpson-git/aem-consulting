# Auntie Website - Product & Design Specification

## 1. Product Overview
**Elevator Pitch:** An online direct-to-consumer (D2C) life & health insurance platform called "Auntie". It allows users to get quotes, apply, and bind coverage fully online. Key differentiator: An **AI Advisory Chat** that qualifies customers and recommends products before they apply.

**Target Audience:** Ages 25–55, digitally native, seeking fast financial protection with minimal paperwork.

## 2. MVP Scope (Minimum Viable Product)
The MVP focuses on the "Happy Path": A user chats with AI -> gets a recommendation -> gets a quote -> applies -> gets approved (simulated).

### Core Features
1.  **AI Qualifiction Chat ("Auntie"):** A conversational interface to gather user needs (dependents, debt, goals) and suggest the right product (Term vs. Whole Life).
2.  **Quote Engine:** Inputs from chat (age, zip, smoker status) generate an instant price.
3.  **User Accounts:** Email/Social login to save progress.
4.  **Application Form:** Simplified digital application with e-signature consent.
5.  **Document Management:** Policy PDF generation and secure storage.
6.  **Admin Dashboard:** View applications and chat logs.

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

### System Diagram
```
[User Browser] <--> [Vite React App] 
                        |
                        +--> [Supabase Auth] (Identity)
                        +--> [Supabase DB] (Postgres Data)
                        +--> [Edge Functions] (Business Logic)
                                |
                                +--> [OpenAI API] (Chat Intelligence)
                                +--> [Stripe API] (Payments)
                                +--> [Resend API] (Email)
```

---

## 4. Data Model (Schema)

### `users`
*   `id` (UUID, PK)
*   `email` (Unique)
*   `full_name`
*   `created_at`

### `conversations` (New for AI MVP)
*   `id` (UUID, PK)
*   `user_id` (FK -> users.id, nullable for guest)
*   `summary` (AI generated summary of user needs)
*   `recommended_product` (Enum: 'term', 'whole', 'health')
*   `created_at`

### `quotes`
*   `id` (UUID, PK)
*   `conversation_id` (FK -> conversations.id)
*   `product_type`
*   `coverage_amount`
*   `term_length`
*   `monthly_premium`
*   `inputs_json` (age, zip, etc.)

### `applications`
*   `id` (UUID, PK)
*   `user_id` (FK -> users.id)
*   `quote_id` (FK -> quotes.id)
*   `status` (draft, submitted, approved, rejected)
*   `answers_json` (medical questions)
*   `documents_url` (policies PDF link)

---

## 5. API Specification (Key Endpoints)

Since we are using Supabase, many simple CRUD operations happen directly via the client SDK. However, complex logic uses Edge Functions.

### `POST /functions/v1/ai-chat`
*   **Purpose:** Process user message and return AI advice + check for necessary data points.
*   **Request:** `{ "message": "I have two kids and a mortgage", "history": [...] }`
*   **Response:** `{ "reply": "Term life fits best...", "missing_fields": ["age", "zip"] }`

### `POST /functions/v1/generate-quote`
*   **Purpose:** Calculates premium based on risk logic.
*   **Request:** `{ "age": 35, "zip": "10001", "amount": 500000, "term": 20 }`
*   **Response:** `{ "monthly": 24.50, "annual": 280.00 }`

### `POST /functions/v1/submit-application`
*   **Purpose:** Finalizes the app, generates PDF, emails user.
*   **Request:** `{ "application_id": "...", "signature": "..." }`

---

## 6. Compliance & Security (Launch Checklist)
*   [ ] **HTTPS/TLS:** Enforced by Vercel/Supabase.
*   [ ] **Data Privacy:** RLS (Row Level Security) enabled in Supabase to protect user data.
*   [ ] **Disclaimers:** "Auntie is an AI tool, not a licensed agent" visible in chat.
*   [ ] **Storage:** Documents stored in private buckets with signed URLs (not public).
