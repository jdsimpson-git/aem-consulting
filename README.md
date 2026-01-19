# AEM Consulting – Life & Health Insurance Wizard

Modern React/Vite experience for AEM Consulting that pairs a brand-forward landing page with a guided life-insurance intake wizard and quote simulator.

## Features
- Marketing site: hero, product highlights (term/whole/final expense), child wealth builder, health/income protection, and founder profile.
- Guided wizard: six steps (Goals → Basic Info → Health → Budget → Contact → Results) with inline validations and state persisted across refreshes.
- Quote simulation: budget-driven coverage estimates and eligibility messaging with clear CTAs to speak to an agent.
- UI system: Tailwind CSS v4 + shadcn/radix primitives, lucide icons, and motion flourishes aligned to the AEM brand palette.
- Supabase-ready: client helper, auth store stub, and a full database/RLS schema in `supabase/schema.sql` for future persistence.
- Design collateral: product/design specs and implementation prompts live in `docs/` for context when extending the app.

## Project Structure
- `src/pages/` — Routing for `LandingPage` and `WizardPage`.
- `src/components/` — Marketing sections, wizard flow, and reusable UI primitives (`components/ui`).
- `src/stores/useWizardStore.js` — Zustand store that persists wizard progress/contact details to localStorage.
- `src/lib/` — Supabase client helper, utility functions, and a stubbed lead email formatter.
- `supabase/schema.sql` — Supabase schema (users, conversations, quotes, applications, policies, payments) with RLS policies.
- `docs/` — Product/design specifications that guided the build.

## Getting Started
Prereqs: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Available scripts:
- `npm run dev` — Start Vite dev server.
- `npm run build` — Production build.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Lint the project.

## Environment Variables
Create a `.env.local` file for Supabase (optional until persistence/auth are wired up):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Data Flow & Integrations
- Wizard state is stored in a persisted Zustand store (`life-insurance-wizard-storage`) so users keep progress across reloads.
- Quotes are generated client-side in `src/components/wizard/screens/ResultsScreen.jsx`; adjust the heuristic as pricing logic matures.
- Lead submission is currently stubbed (`src/lib/email.js`). Hook this into Supabase/Resend and call it after Contact/Results to capture real leads.
- To provision the database, run `supabase/schema.sql` in the Supabase SQL editor; RLS policies are included.

## Roadmap Ideas
- Connect lead submission to Supabase functions/Resend and gate navigation on a successful write.
- Add masking/validation for phone/email/DOB and improve state/eligibility rules.
- Limit PII retention by expiring or scoping persisted wizard data after submission.
- Wire Supabase Auth to the provided profile schema and extend with an admin view of conversations/quotes.
