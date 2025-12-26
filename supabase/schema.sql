/**
 * AEM Consulting - Database Schema (Day 3)
 * Run this script in the Supabase Dashboard > SQL Editor to set up your database.
 */

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS (Extended Profile)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  phone text,
  date_of_birth date,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. CONVERSATIONS
create table if not exists public.conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id),
  guest_session_id text,
  summary text,
  recommended_product text check (recommended_product in ('term', 'whole', 'health', null)),
  extracted_data jsonb,
  status text check (status in ('active', 'converted', 'abandoned')),
  message_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. CHAT MESSAGES
create table if not exists public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade,
  role text check (role in ('user', 'assistant', 'system')),
  content text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- 4. QUOTES
create table if not exists public.quotes (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id),
  user_id uuid references public.users(id),
  product_type text check (product_type in ('term', 'whole', 'health')),
  coverage_amount integer, -- in cents
  term_length integer, -- years
  monthly_premium integer, -- in cents
  annual_premium integer, -- in cents
  inputs_json jsonb,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- 5. APPLICATIONS
create table if not exists public.applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  quote_id uuid references public.quotes(id),
  status text check (status in ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'withdrawn')),
  personal_info jsonb,
  health_answers jsonb,
  beneficiaries jsonb,
  disclosures_accepted boolean,
  signature_data jsonb,
  rejection_reason text,
  submitted_at timestamptz,
  decided_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. POLICIES
create table if not exists public.policies (
  id uuid default uuid_generate_v4() primary key,
  application_id uuid references public.applications(id) unique,
  user_id uuid references public.users(id),
  policy_number text unique,
  product_type text check (product_type in ('term', 'whole', 'health')),
  coverage_amount integer,
  monthly_premium integer,
  effective_date date,
  expiration_date date,
  status text check (status in ('pending_payment', 'active', 'lapsed', 'cancelled', 'expired')),
  document_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. PAYMENTS
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  policy_id uuid references public.policies(id),
  user_id uuid references public.users(id),
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  amount_cents integer,
  currency text default 'usd',
  status text check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  payment_type text check (payment_type in ('initial', 'recurring', 'reinstatement')),
  billing_period_start date,
  billing_period_end date,
  created_at timestamptz default now()
);

-- 8. AUDIT LOG
create table if not exists public.audit_log (
  id uuid default uuid_generate_v4() primary key,
  entity_type text,
  entity_id uuid,
  action text,
  old_value jsonb,
  new_value jsonb,
  performed_by uuid references public.users(id),
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

-- --- INDEXES ---

create index if not exists idx_conversations_user on public.conversations(user_id);
create index if not exists idx_conversations_guest on public.conversations(guest_session_id);
create index if not exists idx_chat_messages_conversation on public.chat_messages(conversation_id);
create index if not exists idx_quotes_user on public.quotes(user_id);
create index if not exists idx_applications_user on public.applications(user_id);
create index if not exists idx_applications_status on public.applications(status);
create index if not exists idx_policies_user on public.policies(user_id);
create index if not exists idx_policies_status on public.policies(status);
create index if not exists idx_payments_policy on public.payments(policy_id);
create index if not exists idx_audit_entity on public.audit_log(entity_type, entity_id);

-- --- ROW LEVEL SECURITY (RLS) ---

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.quotes enable row level security;
alter table public.applications enable row level security;
alter table public.policies enable row level security;
alter table public.payments enable row level security;
alter table public.audit_log enable row level security;

-- USERS Policies
create policy "Users view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users update own profile" on public.users
  for update using (auth.uid() = id);

-- CONVERSATIONS Policies
create policy "Users view own conversations" on public.conversations
  for select using (auth.uid() = user_id OR user_id is null);

create policy "Users insert conversations" on public.conversations
  for insert with check (auth.uid() = user_id OR user_id is null);

create policy "Users update own conversations" on public.conversations
  for update using (auth.uid() = user_id OR user_id is null);

-- CHAT MESSAGES Policies
create policy "Users view own messages" on public.chat_messages
  for select using (
    exists (
      select 1 from public.conversations c 
      where c.id = chat_messages.conversation_id 
      and (c.user_id = auth.uid() OR c.user_id is null)
    )
  );

create policy "Users insert messages" on public.chat_messages
  for insert with check (
    exists (
      select 1 from public.conversations c 
      where c.id = chat_messages.conversation_id 
      and (c.user_id = auth.uid() OR c.user_id is null)
    )
  );

-- QUOTES Policies
create policy "Users view own quotes" on public.quotes
  for select using (auth.uid() = user_id OR user_id is null);

create policy "Users insert quotes" on public.quotes
  for insert with check (auth.uid() = user_id OR user_id is null);

-- APPLICATIONS Policies
create policy "Users view own applications" on public.applications
  for select using (auth.uid() = user_id);

create policy "Users insert own applications" on public.applications
  for insert with check (auth.uid() = user_id);

create policy "Users update own applications" on public.applications
  for update using (auth.uid() = user_id);

create policy "Admins view all applications" on public.applications
  for select using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

-- POLICIES Policies
create policy "Users view own policies" on public.policies
  for select using (auth.uid() = user_id);

-- PAYMENTS Policies
create policy "Users view own payments" on public.payments
  for select using (auth.uid() = user_id);

-- AUDIT LOG Policies
create policy "Admins view audit logs" on public.audit_log
  for select using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );
