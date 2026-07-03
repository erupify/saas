-- ═══════════════════════════════════════════════════════════════
--  Erupify — Supabase Database Setup
--  Run these queries in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. PROFILES TABLE
--    Extends auth.users with business details
create table if not exists public.profiles (
  id               uuid references auth.users(id) on delete cascade primary key,
  business_name    text,
  google_place_id  text,
  plan             text    not null default 'free',
  theme            text    not null default 'dark-orange',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can only read/edit their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);


-- 2. REVIEWS TABLE
--    Stores all reviews per user
create table if not exists public.reviews (
  id             uuid         primary key default gen_random_uuid(),
  user_id        uuid         not null references auth.users(id) on delete cascade,
  reviewer_name  text         not null,
  rating         integer      not null check (rating between 1 and 5),
  review_text    text,
  review_date    date,
  source         text         not null default 'google',
  created_at     timestamptz  not null default now()
);

-- Enable Row Level Security
alter table public.reviews enable row level security;

-- Users can only see/manage their own reviews
create policy "Users can view own reviews"
  on public.reviews for select
  using (auth.uid() = user_id);

create policy "Users can insert own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);


-- 3. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
--    Automatically creates a profile row when a new user registers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, business_name, plan, theme)
  values (
    new.id,
    new.raw_user_meta_data ->> 'business_name',
    'free',
    'dark-orange'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 4. SAMPLE DATA (Optional — remove if you don't want demo data)
-- INSERT INTO public.reviews (user_id, reviewer_name, rating, review_text, review_date, source)
-- VALUES
--   (auth.uid(), 'Ahmed Benali',   5, 'Excellent service! Highly recommend.', '2026-06-15', 'google'),
--   (auth.uid(), 'Sara Elmansouri',4, 'Great experience overall.',            '2026-06-20', 'google'),
--   (auth.uid(), 'Karim Tazi',     5, 'Best in the city, no doubt.',          '2026-07-01', 'google');
