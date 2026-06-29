-- ============================================================
--  Bolão da Copa 2026 — Migração: LIGAS (estilo Cartola)
--  Rode UMA única vez no SQL Editor do Supabase.
--
--  O que faz:
--   • cria a tabela `leagues` (cada bolão de um grupo de amigos);
--   • cria uma "Liga Principal" e move os participantes/palpites atuais p/ ela;
--   • passa a separar participantes e palpites POR liga (não se misturam);
--   • mantém os RESULTADOS dos jogos (`scores`) GLOBAIS — iguais p/ todas as ligas.
--
--  É seguro rodar mesmo com dados já existentes. Não apaga placares.
-- ============================================================

begin;

-- 1) Tabela de ligas ----------------------------------------------------------
create table if not exists public.leagues (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_at timestamptz not null default now()
);

-- Liga padrão que herda os dados atuais (só cria se ainda não houver nenhuma)
insert into public.leagues (name)
select 'Liga Principal'
where not exists (select 1 from public.leagues);

-- 2) Coluna league_id em participants e guesses + backfill --------------------
alter table public.participants
  add column if not exists league_id uuid references public.leagues(id) on delete cascade;

alter table public.guesses
  add column if not exists league_id uuid references public.leagues(id) on delete cascade;

-- Joga tudo que está "solto" para a liga padrão (a mais antiga)
update public.participants
  set league_id = (select id from public.leagues order by created_at limit 1)
  where league_id is null;

update public.guesses
  set league_id = (select id from public.leagues order by created_at limit 1)
  where league_id is null;

alter table public.participants alter column league_id set not null;
alter table public.guesses      alter column league_id set not null;

-- 3) Remove FKs antigas de guesses (nome pode variar) ------------------------
do $$
declare r record;
begin
  for r in
    select conname from pg_constraint
    where conrelid = 'public.guesses'::regclass and contype = 'f'
  loop
    execute format('alter table public.guesses drop constraint %I', r.conname);
  end loop;
end $$;

-- 4) Troca as chaves primárias para incluir league_id ------------------------
do $$
declare r record;
begin
  for r in
    select conrelid::regclass::text as tbl, conname
    from pg_constraint
    where conrelid in ('public.participants'::regclass, 'public.guesses'::regclass)
      and contype = 'p'
  loop
    execute format('alter table %s drop constraint %I', r.tbl, r.conname);
  end loop;
end $$;

-- mesmo nome pode existir em ligas diferentes
alter table public.participants
  add constraint participants_pkey primary key (league_id, name);

alter table public.guesses
  add constraint guesses_pkey primary key (league_id, match_id, participant_name);

-- 5) Palpite aponta para o participante da MESMA liga ------------------------
--    (remover um participante apaga os palpites dele automaticamente)
alter table public.guesses
  add constraint guesses_participant_fkey
  foreign key (league_id, participant_name)
  references public.participants (league_id, name) on delete cascade;

-- 6) RLS aberta para a chave anon (mesmo padrão das outras tabelas) -----------
alter table public.leagues enable row level security;
drop policy if exists "leagues_anon_all" on public.leagues;
create policy "leagues_anon_all" on public.leagues
  for all to anon using (true) with check (true);

commit;
