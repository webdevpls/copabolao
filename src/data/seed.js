// Dados de demonstração — carregados apenas quando o localStorage está vazio.
// Placares oficiais: resultados REAIS dos 3 primeiros jogos da Copa 2026.
// Palpites no formato 1X2: "home" (vitória mandante), "draw" (empate), "away" (vitória visitante).

export const SEED_PARTICIPANTS = ["Pedro Lucas", "Kayo", "Bruno"]

// Resultados reais (11–12/06/2026)
export const SEED_SCORES = {
  1: { home: 2, away: 0 }, // México 2x0 África do Sul (Estádio Azteca)
  2: { home: 2, away: 1 }, // Coreia do Sul 2x1 Tchéquia (Estádio Akron)
  3: { home: 1, away: 1 }, // Canadá 1x1 Bósnia (BMO Field, Toronto)
}

export const SEED_GUESSES = {
  // Jogos já finalizados
  1: { "Pedro Lucas": "home", Kayo: "home", Bruno: "draw" },
  2: { "Pedro Lucas": "home", Kayo: "away", Bruno: "home" },
  3: { "Pedro Lucas": "draw", Kayo: "draw", Bruno: "home" },

  // Rodada 1 — jogos ainda pendentes
  4: { "Pedro Lucas": "home", Kayo: "home", Bruno: "draw" },
  5: { "Pedro Lucas": "away", Kayo: "away", Bruno: "draw" },
  6: { "Pedro Lucas": "home", Kayo: "home", Bruno: "home" },
  7: { "Pedro Lucas": "away", Kayo: "draw" },
  8: { Kayo: "away", Bruno: "home" },
  17: { Kayo: "home", Bruno: "draw" },
  22: { "Pedro Lucas": "draw", Kayo: "home" },

  // Rodada 2 — palpites antecipados
  28: { "Pedro Lucas": "home", Bruno: "draw" },
  31: { "Pedro Lucas": "home", Kayo: "home", Bruno: "home" },
  41: { "Pedro Lucas": "home", Kayo: "home" },

  // Rodada 3 — palpites antecipados
  51: { "Pedro Lucas": "away", Bruno: "away" },
  72: { Kayo: "away", Bruno: "away" },
}

export function seedState() {
  return {
    participants: [...SEED_PARTICIPANTS],
    scores: structuredClone(SEED_SCORES),
    guesses: structuredClone(SEED_GUESSES),
  }
}
