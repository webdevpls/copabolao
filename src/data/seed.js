// Estado inicial — carregado apenas quando o localStorage está vazio.
// Resultados REAIS dos primeiros jogos da Copa 2026. Sem palpites pré-preenchidos.

export const SEED_PARTICIPANTS = ["Pedro Lucas", "Kayo", "Bruno"]

export const SEED_SCORES = {
  1: { home: 2, away: 0 }, // México 2x0 África do Sul
  2: { home: 2, away: 1 }, // Coreia do Sul 2x1 Tchéquia
  3: { home: 1, away: 1 }, // Canadá 1x1 Bósnia e Herzegovina
}

export const SEED_GUESSES = {}

export function seedState() {
  return {
    participants: [...SEED_PARTICIPANTS],
    scores: structuredClone(SEED_SCORES),
    guesses: structuredClone(SEED_GUESSES),
  }
}
