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
]

// Rodada 1: 11–17/06 | Rodada 2: 18–23/06 | Rodada 3: 24–27/06
export function getRound(date) {
  const day = Number(date.slice(8, 10))
  if (day <= 17) return 1
  if (day <= 23) return 2
  return 3
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
