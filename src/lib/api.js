// Em desenvolvimento local (npm run dev) não há Vercel Functions,
// então usamos localStorage como fallback transparente.
// Em produção (Vercel deploy) usa a API /api/state com Blob.

const LOCAL_KEY = "bolao-copa-2026:v3"
const IS_DEV    = import.meta.env.DEV

export async function loadState() {
  if (IS_DEV) {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      return raw ? JSON.parse(raw) : { participants: [], scores: {}, guesses: {} }
    } catch {
      return { participants: [], scores: {}, guesses: {} }
    }
  }

  const res = await fetch("/api/state")
  if (!res.ok) throw new Error(`Erro ${res.status} ao carregar estado`)
  return res.json()
}

export async function saveState(state) {
  if (IS_DEV) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state))
    return
  }

  const res = await fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  })
  if (!res.ok) throw new Error(`Erro ${res.status} ao salvar estado`)
}
