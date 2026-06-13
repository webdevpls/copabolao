import { supabase } from "@/lib/supabase"

// ── Participantes ─────────────────────────────────────────────

export async function fetchParticipants() {
  const { data, error } = await supabase
    .from("participants")
    .select("name")
    .order("created_at")
  if (error) throw error
  return data.map((r) => r.name)
}

export async function addParticipant(name) {
  const { error } = await supabase
    .from("participants")
    .insert({ name })
  if (error) throw error
}

export async function removeParticipant(name) {
  const { error } = await supabase
    .from("participants")
    .delete()
    .eq("name", name)
  if (error) throw error
}

// ── Placares oficiais ─────────────────────────────────────────

export async function fetchScores() {
  const { data, error } = await supabase
    .from("scores")
    .select("match_id, home, away")
  if (error) throw error
  // converte array → objeto { [match_id]: { home, away } }
  return Object.fromEntries(data.map((r) => [r.match_id, { home: r.home, away: r.away }]))
}

export async function upsertScore(matchId, score) {
  const { error } = await supabase
    .from("scores")
    .upsert({ match_id: matchId, home: score.home, away: score.away })
  if (error) throw error
}

export async function deleteScore(matchId) {
  const { error } = await supabase
    .from("scores")
    .delete()
    .eq("match_id", matchId)
  if (error) throw error
}

// ── Palpites (1X2) ────────────────────────────────────────────

export async function fetchGuesses() {
  const { data, error } = await supabase
    .from("guesses")
    .select("match_id, participant_name, outcome")
  if (error) throw error
  // converte array → objeto { [match_id]: { [name]: outcome } }
  const result = {}
  for (const row of data) {
    if (!result[row.match_id]) result[row.match_id] = {}
    result[row.match_id][row.participant_name] = row.outcome
  }
  return result
}

export async function upsertGuess(matchId, participantName, outcome) {
  if (outcome === null) {
    // palpite removido (toggle off)
    const { error } = await supabase
      .from("guesses")
      .delete()
      .eq("match_id", matchId)
      .eq("participant_name", participantName)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from("guesses")
      .upsert({ match_id: matchId, participant_name: participantName, outcome })
    if (error) throw error
  }
}
