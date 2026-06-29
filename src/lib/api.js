// Supabase em prod (e dev quando variáveis configuradas).
// Cai para localStorage se as variáveis não estiverem disponíveis.
//
// Modelo de dados:
//   - leagues:      cada bolão (grupo de amigos). Identificado por id (uuid).
//   - participants: pertencem a UMA liga  (league_id + name).
//   - guesses:      pertencem a UMA liga  (league_id + match_id + participant_name).
//   - scores:       resultados REAIS dos jogos — GLOBAIS, compartilhados por todas as ligas.

import { supabase } from "./supabase"
import { SEED_PARTICIPANTS, SEED_SCORES } from "@/data/seed"

const LOCAL_KEY = "bolao-copa-2026:v4"

function newId() {
  // Disponível em qualquer navegador moderno; serve só para o fallback local.
  return crypto.randomUUID()
}

// ── Helpers localStorage ──────────────────────────────────────
// Estrutura: { leagues: [{id,name}], scores: {}, byLeague: { [id]: { participants:[], guesses:{} } } }
function lsLoad() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignora e recria abaixo */ }

  // Primeira execução local: cria uma liga padrão já com a semente.
  const id = newId()
  const fresh = {
    leagues: [{ id, name: "Liga Principal" }],
    scores: structuredClone(SEED_SCORES),
    byLeague: { [id]: { participants: [...SEED_PARTICIPANTS], guesses: {} } },
  }
  lsSave(fresh)
  return fresh
}
function lsSave(state) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
}
function lsLeague(state, leagueId) {
  if (!state.byLeague[leagueId]) state.byLeague[leagueId] = { participants: [], guesses: {} }
  return state.byLeague[leagueId]
}

// ── Ligas ─────────────────────────────────────────────────────
export async function loadLeagues() {
  if (!supabase) {
    return lsLoad().leagues
  }
  const { data, error } = await supabase.from("leagues").select("id, name").order("created_at")
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createLeague(name) {
  if (!supabase) {
    const s = lsLoad()
    const league = { id: newId(), name }
    s.leagues.push(league)
    s.byLeague[league.id] = { participants: [], guesses: {} }
    lsSave(s)
    return league
  }
  const { data, error } = await supabase.from("leagues").insert({ name }).select("id, name").single()
  if (error) throw new Error(error.message)
  return data
}

export async function removeLeague(leagueId) {
  if (!supabase) {
    const s = lsLoad()
    s.leagues = s.leagues.filter((l) => l.id !== leagueId)
    delete s.byLeague[leagueId]
    lsSave(s)
    return
  }
  // ON DELETE CASCADE remove participantes e palpites da liga.
  const { error } = await supabase.from("leagues").delete().eq("id", leagueId)
  if (error) throw new Error(error.message)
}

// ── Estado de uma liga (participantes + palpites) + placares globais ──
export async function loadState(leagueId) {
  if (!supabase) {
    const s = lsLoad()
    const lg = lsLeague(s, leagueId)
    return {
      participants: [...lg.participants],
      guesses: structuredClone(lg.guesses),
      scores: structuredClone(s.scores),
    }
  }

  const [{ data: pRows, error: pErr }, { data: sRows, error: sErr }, { data: gRows, error: gErr }] =
    await Promise.all([
      supabase.from("participants").select("name").eq("league_id", leagueId).order("created_at"),
      supabase.from("scores").select("match_id, home, away"),
      supabase.from("guesses").select("match_id, participant_name, outcome").eq("league_id", leagueId),
    ])

  if (pErr || sErr || gErr) throw new Error((pErr || sErr || gErr).message)

  const participants = (pRows ?? []).map((r) => r.name)

  const scores = Object.fromEntries(
    (sRows ?? []).map((r) => [String(r.match_id), { home: r.home, away: r.away }])
  )

  const guesses = {}
  for (const r of gRows ?? []) {
    const mid = String(r.match_id)
    if (!guesses[mid]) guesses[mid] = {}
    guesses[mid][r.participant_name] = r.outcome
  }

  return { participants, scores, guesses }
}

// ── Scores (GLOBAIS) ──────────────────────────────────────────
export async function upsertScore(matchId, home, away) {
  if (!supabase) {
    const s = lsLoad()
    s.scores[String(matchId)] = { home, away }
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("scores")
    .upsert({ match_id: Number(matchId), home, away })
  if (error) throw new Error(error.message)
}

export async function deleteScore(matchId) {
  if (!supabase) {
    const s = lsLoad()
    delete s.scores[String(matchId)]
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("scores")
    .delete()
    .eq("match_id", Number(matchId))
  if (error) throw new Error(error.message)
}

// ── Guesses (por liga) ────────────────────────────────────────
export async function upsertGuess(leagueId, matchId, participantName, outcome) {
  if (!supabase) {
    const s = lsLoad()
    const lg = lsLeague(s, leagueId)
    if (!lg.guesses[String(matchId)]) lg.guesses[String(matchId)] = {}
    lg.guesses[String(matchId)][participantName] = outcome
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("guesses")
    .upsert({ league_id: leagueId, match_id: Number(matchId), participant_name: participantName, outcome })
  if (error) throw new Error(error.message)
}

export async function deleteGuess(leagueId, matchId, participantName) {
  if (!supabase) {
    const s = lsLoad()
    const lg = lsLeague(s, leagueId)
    if (lg.guesses[String(matchId)]) delete lg.guesses[String(matchId)][participantName]
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("guesses")
    .delete()
    .eq("league_id", leagueId)
    .eq("match_id", Number(matchId))
    .eq("participant_name", participantName)
  if (error) throw new Error(error.message)
}

// ── Participants (por liga) ───────────────────────────────────
export async function addParticipant(leagueId, name) {
  if (!supabase) {
    const s = lsLoad()
    const lg = lsLeague(s, leagueId)
    if (!lg.participants.includes(name)) lg.participants.push(name)
    lsSave(s)
    return
  }
  const { error } = await supabase.from("participants").upsert({ league_id: leagueId, name })
  if (error) throw new Error(error.message)
}

export async function removeParticipant(leagueId, name) {
  if (!supabase) {
    const s = lsLoad()
    const lg = lsLeague(s, leagueId)
    lg.participants = lg.participants.filter((p) => p !== name)
    Object.keys(lg.guesses).forEach((mid) => { delete lg.guesses[mid][name] })
    lsSave(s)
    return
  }
  // ON DELETE CASCADE apaga os palpites do participante automaticamente.
  const { error } = await supabase
    .from("participants")
    .delete()
    .eq("league_id", leagueId)
    .eq("name", name)
  if (error) throw new Error(error.message)
}
