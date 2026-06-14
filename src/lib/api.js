const BASE = "/api/state"

export async function loadState() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(`Erro ao carregar estado: ${res.status}`)
  return res.json()
}

export async function saveState(state) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  })
  if (!res.ok) throw new Error(`Erro ao salvar estado: ${res.status}`)
}
