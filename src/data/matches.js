// Tabela real da fase de grupos da Copa do Mundo FIFA 2026 (EUA, Canadá e México).
// Grupos definidos no sorteio de 05/12/2025 + vencedores dos playoffs de março/2026.
// Horários no fuso local de cada estádio.

export const FLAGS = {
  "México": "🇲🇽",
  "África do Sul": "🇿🇦",
  "Coreia do Sul": "🇰🇷",
  "Tchéquia": "🇨🇿",
  "Canadá": "🇨🇦",
  "Bósnia e Herzegovina": "🇧🇦",
  "Catar": "🇶🇦",
  "Suíça": "🇨🇭",
  "Brasil": "🇧🇷",
  "Marrocos": "🇲🇦",
  "Haiti": "🇭🇹",
  "Escócia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Estados Unidos": "🇺🇸",
  "Paraguai": "🇵🇾",
  "Austrália": "🇦🇺",
  "Turquia": "🇹🇷",
  "Alemanha": "🇩🇪",
  "Curaçao": "🇨🇼",
  "Costa do Marfim": "🇨🇮",
  "Equador": "🇪🇨",
  "Holanda": "🇳🇱",
  "Japão": "🇯🇵",
  "Suécia": "🇸🇪",
  "Tunísia": "🇹🇳",
  "Bélgica": "🇧🇪",
  "Egito": "🇪🇬",
  "Irã": "🇮🇷",
  "Nova Zelândia": "🇳🇿",
  "Espanha": "🇪🇸",
  "Cabo Verde": "🇨🇻",
  "Arábia Saudita": "🇸🇦",
  "Uruguai": "🇺🇾",
  "França": "🇫🇷",
  "Senegal": "🇸🇳",
  "Iraque": "🇮🇶",
  "Noruega": "🇳🇴",
  "Argentina": "🇦🇷",
  "Argélia": "🇩🇿",
  "Áustria": "🇦🇹",
  "Jordânia": "🇯🇴",
  "Portugal": "🇵🇹",
  "RD Congo": "🇨🇩",
  "Uzbequistão": "🇺🇿",
  "Colômbia": "🇨🇴",
  "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Croácia": "🇭🇷",
  "Gana": "🇬🇭",
  "Panamá": "🇵🇦",
}

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]

export const MATCHES = [
  { id: 1, group: "A", date: "2026-06-11", time: "13:00", home: "México", away: "África do Sul", venue: "Estádio Azteca, Cidade do México", score: null },
  { id: 2, group: "A", date: "2026-06-11", time: "20:00", home: "Coreia do Sul", away: "Tchéquia", venue: "Estádio Akron, Guadalajara", score: null },
  { id: 3, group: "B", date: "2026-06-12", time: "15:00", home: "Canadá", away: "Bósnia e Herzegovina", venue: "BMO Field, Toronto", score: null },
  { id: 4, group: "D", date: "2026-06-12", time: "18:00", home: "Estados Unidos", away: "Paraguai", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 5, group: "B", date: "2026-06-13", time: "12:00", home: "Catar", away: "Suíça", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 6, group: "C", date: "2026-06-13", time: "18:00", home: "Brasil", away: "Marrocos", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 7, group: "C", date: "2026-06-13", time: "21:00", home: "Haiti", away: "Escócia", venue: "Gillette Stadium, Boston", score: null },
  { id: 8, group: "D", date: "2026-06-13", time: "18:00", home: "Austrália", away: "Turquia", venue: "BC Place, Vancouver", score: null },
  { id: 9, group: "E", date: "2026-06-14", time: "12:00", home: "Alemanha", away: "Curaçao", venue: "NRG Stadium, Houston", score: null },
  { id: 10, group: "F", date: "2026-06-14", time: "15:00", home: "Holanda", away: "Japão", venue: "AT&T Stadium, Dallas", score: null },
  { id: 11, group: "E", date: "2026-06-14", time: "19:00", home: "Costa do Marfim", away: "Equador", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 12, group: "F", date: "2026-06-14", time: "20:00", home: "Suécia", away: "Tunísia", venue: "Estádio BBVA, Monterrey", score: null },
  { id: 13, group: "H", date: "2026-06-15", time: "12:00", home: "Espanha", away: "Cabo Verde", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 14, group: "G", date: "2026-06-15", time: "12:00", home: "Bélgica", away: "Egito", venue: "BC Place, Vancouver", score: null },
  { id: 15, group: "H", date: "2026-06-15", time: "18:00", home: "Arábia Saudita", away: "Uruguai", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 16, group: "G", date: "2026-06-15", time: "18:00", home: "Irã", away: "Nova Zelândia", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 17, group: "I", date: "2026-06-16", time: "15:00", home: "França", away: "Senegal", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 18, group: "I", date: "2026-06-16", time: "18:00", home: "Iraque", away: "Noruega", venue: "Gillette Stadium, Boston", score: null },
  { id: 19, group: "J", date: "2026-06-16", time: "20:00", home: "Argentina", away: "Argélia", venue: "Arrowhead Stadium, Kansas City", score: null },
  { id: 20, group: "J", date: "2026-06-16", time: "21:00", home: "Áustria", away: "Jordânia", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 21, group: "K", date: "2026-06-17", time: "12:00", home: "Portugal", away: "RD Congo", venue: "NRG Stadium, Houston", score: null },
  { id: 22, group: "L", date: "2026-06-17", time: "15:00", home: "Inglaterra", away: "Croácia", venue: "AT&T Stadium, Dallas", score: null },
  { id: 23, group: "L", date: "2026-06-17", time: "19:00", home: "Gana", away: "Panamá", venue: "BMO Field, Toronto", score: null },
  { id: 24, group: "K", date: "2026-06-17", time: "20:00", home: "Uzbequistão", away: "Colômbia", venue: "Estádio Azteca, Cidade do México", score: null },
  { id: 25, group: "A", date: "2026-06-18", time: "12:00", home: "Tchéquia", away: "África do Sul", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 26, group: "B", date: "2026-06-18", time: "12:00", home: "Suíça", away: "Bósnia e Herzegovina", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 27, group: "B", date: "2026-06-18", time: "15:00", home: "Canadá", away: "Catar", venue: "BC Place, Vancouver", score: null },
  { id: 28, group: "A", date: "2026-06-18", time: "19:00", home: "México", away: "Coreia do Sul", venue: "Estádio Akron, Guadalajara", score: null },
  { id: 29, group: "D", date: "2026-06-19", time: "12:00", home: "Estados Unidos", away: "Austrália", venue: "Lumen Field, Seattle", score: null },
  { id: 30, group: "C", date: "2026-06-19", time: "18:00", home: "Escócia", away: "Marrocos", venue: "Gillette Stadium, Boston", score: null },
  { id: 31, group: "C", date: "2026-06-19", time: "20:30", home: "Brasil", away: "Haiti", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 32, group: "D", date: "2026-06-19", time: "21:00", home: "Turquia", away: "Paraguai", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 33, group: "F", date: "2026-06-20", time: "12:00", home: "Holanda", away: "Suécia", venue: "NRG Stadium, Houston", score: null },
  { id: 34, group: "E", date: "2026-06-20", time: "16:00", home: "Alemanha", away: "Costa do Marfim", venue: "BMO Field, Toronto", score: null },
  { id: 35, group: "E", date: "2026-06-20", time: "19:00", home: "Equador", away: "Curaçao", venue: "Arrowhead Stadium, Kansas City", score: null },
  { id: 36, group: "F", date: "2026-06-20", time: "22:00", home: "Tunísia", away: "Japão", venue: "Estádio BBVA, Monterrey", score: null },
  { id: 37, group: "H", date: "2026-06-21", time: "12:00", home: "Espanha", away: "Arábia Saudita", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 38, group: "G", date: "2026-06-21", time: "12:00", home: "Bélgica", away: "Irã", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 39, group: "H", date: "2026-06-21", time: "18:00", home: "Uruguai", away: "Cabo Verde", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 40, group: "G", date: "2026-06-21", time: "18:00", home: "Nova Zelândia", away: "Egito", venue: "BC Place, Vancouver", score: null },
  { id: 41, group: "J", date: "2026-06-22", time: "12:00", home: "Argentina", away: "Áustria", venue: "AT&T Stadium, Dallas", score: null },
  { id: 42, group: "I", date: "2026-06-22", time: "17:00", home: "França", away: "Iraque", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 43, group: "I", date: "2026-06-22", time: "20:00", home: "Noruega", away: "Senegal", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 44, group: "J", date: "2026-06-22", time: "20:00", home: "Jordânia", away: "Argélia", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 45, group: "K", date: "2026-06-23", time: "12:00", home: "Portugal", away: "Uzbequistão", venue: "NRG Stadium, Houston", score: null },
  { id: 46, group: "L", date: "2026-06-23", time: "16:00", home: "Inglaterra", away: "Gana", venue: "Gillette Stadium, Boston", score: null },
  { id: 47, group: "L", date: "2026-06-23", time: "19:00", home: "Panamá", away: "Croácia", venue: "BMO Field, Toronto", score: null },
  { id: 48, group: "K", date: "2026-06-23", time: "20:00", home: "Colômbia", away: "RD Congo", venue: "Estádio Akron, Guadalajara", score: null },
  { id: 49, group: "B", date: "2026-06-24", time: "12:00", home: "Suíça", away: "Canadá", venue: "BC Place, Vancouver", score: null },
  { id: 50, group: "B", date: "2026-06-24", time: "12:00", home: "Bósnia e Herzegovina", away: "Catar", venue: "Lumen Field, Seattle", score: null },
  { id: 51, group: "C", date: "2026-06-24", time: "18:00", home: "Escócia", away: "Brasil", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 52, group: "C", date: "2026-06-24", time: "18:00", home: "Marrocos", away: "Haiti", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 53, group: "A", date: "2026-06-24", time: "19:00", home: "Tchéquia", away: "México", venue: "Estádio Azteca, Cidade do México", score: null },
  { id: 54, group: "A", date: "2026-06-24", time: "19:00", home: "África do Sul", away: "Coreia do Sul", venue: "Estádio BBVA, Monterrey", score: null },
  { id: 55, group: "E", date: "2026-06-25", time: "16:00", home: "Equador", away: "Alemanha", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 56, group: "E", date: "2026-06-25", time: "16:00", home: "Curaçao", away: "Costa do Marfim", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 57, group: "F", date: "2026-06-25", time: "18:00", home: "Japão", away: "Suécia", venue: "AT&T Stadium, Dallas", score: null },
  { id: 58, group: "F", date: "2026-06-25", time: "18:00", home: "Tunísia", away: "Holanda", venue: "Arrowhead Stadium, Kansas City", score: null },
  { id: 59, group: "D", date: "2026-06-25", time: "19:00", home: "Turquia", away: "Estados Unidos", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 60, group: "D", date: "2026-06-25", time: "19:00", home: "Paraguai", away: "Austrália", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 61, group: "I", date: "2026-06-26", time: "15:00", home: "Noruega", away: "França", venue: "Gillette Stadium, Boston", score: null },
  { id: 62, group: "I", date: "2026-06-26", time: "15:00", home: "Senegal", away: "Iraque", venue: "BMO Field, Toronto", score: null },
  { id: 63, group: "H", date: "2026-06-26", time: "19:00", home: "Cabo Verde", away: "Arábia Saudita", venue: "NRG Stadium, Houston", score: null },
  { id: 64, group: "H", date: "2026-06-26", time: "18:00", home: "Uruguai", away: "Espanha", venue: "Estádio Akron, Guadalajara", score: null },
  { id: 65, group: "G", date: "2026-06-26", time: "20:00", home: "Egito", away: "Irã", venue: "Lumen Field, Seattle", score: null },
  { id: 66, group: "G", date: "2026-06-26", time: "20:00", home: "Nova Zelândia", away: "Bélgica", venue: "BC Place, Vancouver", score: null },
  { id: 67, group: "L", date: "2026-06-27", time: "17:00", home: "Panamá", away: "Inglaterra", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 68, group: "L", date: "2026-06-27", time: "17:00", home: "Croácia", away: "Gana", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 69, group: "K", date: "2026-06-27", time: "19:30", home: "Colômbia", away: "Portugal", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 70, group: "K", date: "2026-06-27", time: "19:30", home: "RD Congo", away: "Uzbequistão", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 71, group: "J", date: "2026-06-27", time: "21:00", home: "Argélia", away: "Áustria", venue: "Arrowhead Stadium, Kansas City", score: null },
  { id: 72, group: "J", date: "2026-06-27", time: "21:00", home: "Jordânia", away: "Argentina", venue: "AT&T Stadium, Dallas", score: null },

  // ── Mata-mata ──────────────────────────────────────────────────
  // 16 avos de final (Round of 32) · 28/06 a 03/07 — times já definidos
  { id: 73, stage: "r32", date: "2026-06-28", time: "12:00", home: "África do Sul", away: "Canadá", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 74, stage: "r32", date: "2026-06-29", time: "16:30", home: "Alemanha", away: "Paraguai", venue: "Gillette Stadium, Boston", score: null },
  { id: 75, stage: "r32", date: "2026-06-29", time: "19:00", home: "Holanda", away: "Marrocos", venue: "Estádio BBVA, Monterrey", score: null },
  { id: 76, stage: "r32", date: "2026-06-29", time: "12:00", home: "Brasil", away: "Japão", venue: "NRG Stadium, Houston", score: null },
  { id: 77, stage: "r32", date: "2026-06-30", time: "17:00", home: "França", away: "Suécia", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 78, stage: "r32", date: "2026-06-30", time: "12:00", home: "Costa do Marfim", away: "Noruega", venue: "AT&T Stadium, Dallas", score: null },
  { id: 79, stage: "r32", date: "2026-06-30", time: "19:00", home: "México", away: "Equador", venue: "Estádio Azteca, Cidade do México", score: null },
  { id: 80, stage: "r32", date: "2026-07-01", time: "12:00", home: "Inglaterra", away: "RD Congo", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 81, stage: "r32", date: "2026-07-01", time: "17:00", home: "Estados Unidos", away: "Bósnia e Herzegovina", venue: "Levi's Stadium, San Francisco", score: null },
  { id: 82, stage: "r32", date: "2026-07-01", time: "13:00", home: "Bélgica", away: "Senegal", venue: "Lumen Field, Seattle", score: null },
  { id: 83, stage: "r32", date: "2026-07-02", time: "19:00", home: "Portugal", away: "Croácia", venue: "BMO Field, Toronto", score: null },
  { id: 84, stage: "r32", date: "2026-07-02", time: "12:00", home: "Espanha", away: "Áustria", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 85, stage: "r32", date: "2026-07-02", time: "20:00", home: "Suíça", away: "Argélia", venue: "BC Place, Vancouver", score: null },
  { id: 86, stage: "r32", date: "2026-07-03", time: "18:00", home: "Argentina", away: "Cabo Verde", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 87, stage: "r32", date: "2026-07-03", time: "20:30", home: "Colômbia", away: "Gana", venue: "Arrowhead Stadium, Kansas City", score: null },
  { id: 88, stage: "r32", date: "2026-07-03", time: "13:00", home: "Austrália", away: "Egito", venue: "AT&T Stadium, Dallas", score: null },

  // Oitavas de final (Round of 16) · 04 a 07/07 — times definidos pelos 16avos
  { id: 89, stage: "r16", date: "2026-07-04", time: "17:00", home: "Paraguai", away: "França", venue: "Lincoln Financial Field, Filadélfia", score: null },
  { id: 90, stage: "r16", date: "2026-07-04", time: "12:00", home: "Canadá", away: "Marrocos", venue: "NRG Stadium, Houston", score: null },
  { id: 91, stage: "r16", date: "2026-07-05", time: "16:00", home: "Brasil", away: "Noruega", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
  { id: 92, stage: "r16", date: "2026-07-05", time: "18:00", home: "México", away: "Inglaterra", venue: "Estádio Azteca, Cidade do México", score: null },
  { id: 93, stage: "r16", date: "2026-07-06", time: "14:00", home: "Portugal", away: "Espanha", venue: "AT&T Stadium, Dallas", score: null },
  { id: 94, stage: "r16", date: "2026-07-06", time: "17:00", home: "Estados Unidos", away: "Bélgica", venue: "Lumen Field, Seattle", score: null },
  { id: 95, stage: "r16", date: "2026-07-07", time: "12:00", home: "Argentina", away: "Egito", venue: "Mercedes-Benz Stadium, Atlanta", score: null },
  { id: 96, stage: "r16", date: "2026-07-07", time: "13:00", home: "Suíça", away: "Colômbia", venue: "BC Place, Vancouver", score: null },

  // Quartas de final · 09 a 11/07
  { id: 97, stage: "qf", date: "2026-07-09", time: "16:00", home: "Vencedor Jogo 89", away: "Vencedor Jogo 90", venue: "Gillette Stadium, Boston", score: null },
  { id: 98, stage: "qf", date: "2026-07-10", time: "12:00", home: "Vencedor Jogo 93", away: "Vencedor Jogo 94", venue: "SoFi Stadium, Los Angeles", score: null },
  { id: 99, stage: "qf", date: "2026-07-11", time: "17:00", home: "Vencedor Jogo 91", away: "Vencedor Jogo 92", venue: "Hard Rock Stadium, Miami", score: null },
  { id: 100, stage: "qf", date: "2026-07-11", time: "20:00", home: "Vencedor Jogo 95", away: "Vencedor Jogo 96", venue: "Arrowhead Stadium, Kansas City", score: null },

  // Semifinais · 14 e 15/07
  { id: 101, stage: "sf", date: "2026-07-14", time: "14:00", home: "Vencedor Jogo 97", away: "Vencedor Jogo 98", venue: "AT&T Stadium, Dallas", score: null },
  { id: 102, stage: "sf", date: "2026-07-15", time: "15:00", home: "Vencedor Jogo 99", away: "Vencedor Jogo 100", venue: "Mercedes-Benz Stadium, Atlanta", score: null },

  // Disputa do 3º lugar · 18/07
  { id: 103, stage: "tp", date: "2026-07-18", time: "17:00", home: "Perdedor Jogo 101", away: "Perdedor Jogo 102", venue: "Hard Rock Stadium, Miami", score: null },

  // Final · 19/07
  { id: 104, stage: "final", date: "2026-07-19", time: "15:00", home: "Vencedor Jogo 101", away: "Vencedor Jogo 102", venue: "MetLife Stadium, Nova York/Nova Jersey", score: null },
]

// Rodada 1: 11–17/06 | Rodada 2: 18–23/06 | Rodada 3: 24–27/06
export function getRound(date) {
  const day = Number(date.slice(8, 10))
  if (day <= 17) return 1
  if (day <= 23) return 2
  return 3
}

// Fases do torneio, em ordem de exibição. Grupos = g1/g2/g3; mata-mata = stage do jogo.
export const PHASES = [
  { key: "g1",    label: "Rodada 1",             period: "11 a 17 de junho" },
  { key: "g2",    label: "Rodada 2",             period: "18 a 23 de junho" },
  { key: "g3",    label: "Rodada 3",             period: "24 a 27 de junho" },
  { key: "r32",   label: "16 avos de final",     period: "28/06 a 03/07" },
  { key: "r16",   label: "Oitavas de final",     period: "04 a 07/07" },
  { key: "qf",    label: "Quartas de final",     period: "09 a 11/07" },
  { key: "sf",    label: "Semifinais",           period: "14 e 15/07" },
  { key: "tp",    label: "Disputa do 3º lugar",  period: "18/07" },
  { key: "final", label: "Final",                period: "19/07" },
]

const PHASE_LABEL = Object.fromEntries(PHASES.map((p) => [p.key, p.label]))

// Chave da fase de um jogo: grupos viram g1/g2/g3 pela data; mata-mata usa match.stage.
export function phaseKey(match) {
  return match.stage ?? `g${getRound(match.date)}`
}

export function phaseLabel(match) {
  return PHASE_LABEL[phaseKey(match)]
}

// Etiqueta curta do jogo: grupos mostram "Grupo X"; mata-mata mostra o nome da fase.
export function matchTag(match) {
  return match.group ? `Grupo ${match.group}` : phaseLabel(match)
}

export function flag(team) {
  return FLAGS[team] ?? "🏳️"
}

export function formatMatchDate(date) {
  const d = new Date(`${date}T12:00:00`)
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(d)
}

export function todayISO() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}
