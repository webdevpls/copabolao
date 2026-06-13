import { MATCHES } from "@/data/matches"

// Palpite é o resultado do jogo (1X2): "home" = vitória do mandante,
// "draw" = empate, "away" = vitória do visitante.
export const OUTCOMES = ["home", "draw", "away"]

export const OUTCOME_SHORT = { home: "1", draw: "X", away: "2" }

export function isValidScore(score) {
  return (
    score != null &&
    Number.isInteger(score.home) &&
    Number.isInteger(score.away) &&
    score.home >= 0 &&
    score.away >= 0
  )
}

export function isValidGuess(guess) {
  return OUTCOMES.includes(guess)
}

export function outcomeOf(score) {
  if (!isValidScore(score)) return null
  if (score.home > score.away) return "home"
  if (score.home < score.away) return "away"
  return "draw"
}

export function outcomeLabel(outcome, match) {
  if (outcome === "home") return `Vitória ${match.home}`
  if (outcome === "away") return `Vitória ${match.away}`
  return "Empate"
}

// Status do palpite em um jogo finalizado: "hit" | "miss" | "none"
export function guessStatus(guess, score) {
  if (!isValidGuess(guess)) return "none"
  return guess === outcomeOf(score) ? "hit" : "miss"
}

// Ranking: acertar o resultado (1X2) = 1 ponto. Empate por ordem alfabética.
// J = jogos finalizados em que o participante palpitou, V = acertos, D = erros.
export function computeRanking(participants, guesses, scores) {
  const rows = participants.map((name) => {
    let played = 0
    let wins = 0
    for (const match of MATCHES) {
      const score = scores[match.id]
      if (!isValidScore(score)) continue
      const guess = guesses[match.id]?.[name]
      if (!isValidGuess(guess)) continue
      played += 1
      if (guess === outcomeOf(score)) wins += 1
    }
    return {
      name,
      played,
      wins,
      losses: played - wins,
      points: wins,
      pct: played > 0 ? Math.round((wins / played) * 100) : 0,
    }
  })
  rows.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, "pt-BR"))
  return rows
}

export function computeStats(participants, guesses, scores) {
  const ranking = computeRanking(participants, guesses, scores)
  const finished = MATCHES.filter((m) => isValidScore(scores[m.id])).length
  const totalHits = ranking.reduce((sum, row) => sum + row.wins, 0)
  const leader = ranking.length > 0 && ranking[0].points > 0 ? ranking[0] : null
  return {
    ranking,
    leader,
    participantsCount: participants.length,
    finished,
    total: MATCHES.length,
    totalHits,
  }
}
