// Supabase em prod (e dev quando variáveis configuradas).
// Cai para localStorage se as variáveis não estiverem disponíveis.

import { supabase } from "./supabase"

const LOCAL_KEY = "bolao-copa-2026:v3"

// ── Helpers localStorage ──────────────────────────────────────
function lsLoad() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : { participants: [], scores: {}, guesses: {} }
  } catch {
    return { participants: [], scores: {}, guesses: {} }
  }
}
function lsSave(state) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
}

// ── loadState ─────────────────────────────────────────────────
export async function loadState() {
  if (!supabase) return lsLoad()

  const [{ data: pRows, error: pErr }, { data: sRows, error: sErr }, { data: gRows, error: gErr }] =
    await Promise.all([
      supabase.from("participants").select("name").order("created_at"),
      supabase.from("scores").select("match_id, home, away"),
      supabase.from("guesses").select("match_id, participant_name, outcome"),
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

// ── Scores ────────────────────────────────────────────────────
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

// ── Guesses ───────────────────────────────────────────────────
export async function upsertGuess(matchId, participantName, outcome) {
  if (!supabase) {
    const s = lsLoad()
    if (!s.guesses[String(matchId)]) s.guesses[String(matchId)] = {}
    s.guesses[String(matchId)][participantName] = outcome
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("guesses")
    .upsert({ match_id: Number(matchId), participant_name: participantName, outcome })
  if (error) throw new Error(error.message)
}

export async function deleteGuess(matchId, participantName) {
  if (!supabase) {
    const s = lsLoad()
    if (s.guesses[String(matchId)]) {
      delete s.guesses[String(matchId)][participantName]
    }
    lsSave(s)
    return
  }
  const { error } = await supabase
    .from("guesses")
    .delete()
    .eq("match_id", Number(matchId))
    .eq("participant_name", participantName)
  if (error) throw new Error(error.message)
}

// ── Participants ──────────────────────────────────────────────
export async function addParticipant(name) {
  if (!supabase) {
    const s = lsLoad()
    if (!s.participants.includes(name)) s.participants.push(name)
    lsSave(s)
    return
  }
  const { error } = await supabase.from("participants").upsert({ name })
  if (error) throw new Error(error.message)
}

export async function removeParticipant(name) {
  if (!supabase) {
    const s = lsLoad()
    s.participants = s.participants.filter((p) => p !== name)
    Object.keys(s.guesses).forEach((mid) => { delete s.guesses[mid][name] })
    lsSave(s)
    return
  }
  // ON DELETE CASCADE apaga guesses automaticamente
  const { error } = await supabase.from("participants").delete().eq("name", name)
  if (error) throw new Error(error.message)
}
