create extension if not exists "pgcrypto";

create table public.informeobjetivos_commissions (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.informeobjetivos_instructions (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  commission_id uuid not null references public.informeobjetivos_commissions(id),
  name text not null,
  name_i18n jsonb not null default '{}'::jsonb,
  legacy_instruction_id text null,
  created_at timestamptz not null default now()
);

create table public.informeobjetivos_matters (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  instruction_id uuid not null references public.informeobjetivos_instructions(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.informeobjetivos_submatters (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  matter_id uuid not null references public.informeobjetivos_matters(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.informeobjetivos_work_lines (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  code text not null,
  display_name text not null,
  display_name_i18n jsonb not null default '{}'::jsonb,
  sort_order integer null,
  created_at timestamptz not null default now()
);

create table public.informeobjetivos_items_objetivo (
  id uuid primary key default gen_random_uuid(),
  legacy_id text not null unique default ('new_' || gen_random_uuid()::text),
  instruction_id uuid not null references public.informeobjetivos_instructions(id),
  submatter_id uuid not null references public.informeobjetivos_submatters(id),
  work_line_id uuid not null references public.informeobjetivos_work_lines(id),
  title text not null,
  title_i18n jsonb not null default '{}'::jsonb,
  status text null,
  year integer not null default 2026 check (year = 2026),
  legacy_item_code text null,
  created_at timestamptz not null default now()
);

create or replace view public.informeobjetivos_v_items_export as
select
  items.id as item_uuid,
  items.legacy_id as item_legacy_id,
  items.legacy_item_code as item_code,
  items.title,
  items.title_i18n,
  items.status,
  items.year,
  instructions.id as instruction_id,
  instructions.legacy_id as instruction_legacy_id,
  instructions.name as instruction,
  instructions.name_i18n as instruction_i18n,
  commissions.name as commission,
  matters.name as matter,
  submatters.name as submatter,
  work_lines.id as work_line_id,
  work_lines.legacy_id as work_line_legacy_id,
  work_lines.code as work_line_code,
  work_lines.display_name as work_line,
  work_lines.display_name_i18n as work_line_i18n,
  work_lines.sort_order as work_line_sort_order
from public.informeobjetivos_items_objetivo items
join public.informeobjetivos_instructions instructions on instructions.id = items.instruction_id
join public.informeobjetivos_commissions commissions on commissions.id = instructions.commission_id
join public.informeobjetivos_submatters submatters on submatters.id = items.submatter_id
join public.informeobjetivos_matters matters on matters.id = submatters.matter_id
join public.informeobjetivos_work_lines work_lines on work_lines.id = items.work_line_id;

alter table public.informeobjetivos_commissions enable row level security;
alter table public.informeobjetivos_instructions enable row level security;
alter table public.informeobjetivos_matters enable row level security;
alter table public.informeobjetivos_submatters enable row level security;
alter table public.informeobjetivos_work_lines enable row level security;
alter table public.informeobjetivos_items_objetivo enable row level security;

-- Access policies are intentionally added after the SSO-to-Supabase identity flow
-- is defined. With RLS enabled and no policies, the catalog is deny-by-default.
