import { put, list } from "@vercel/blob"

const BLOB_PATH = "bolao-copa-2026/state.json"

// Lê o body da requisição (stream → string → JSON)
async function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ""
    req.on("data", (chunk) => { raw += chunk })
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}) }
      catch (e) { reject(e) }
    })
    req.on("error", reject)
  })
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()

  // ── GET: retorna o estado atual ────────────────────────────
  if (req.method === "GET") {
    try {
      const { blobs } = await list({ prefix: BLOB_PATH })
      if (!blobs.length) {
        return res.status(200).json({ participants: [], scores: {}, guesses: {} })
      }
      // cache-bust para sempre buscar a versão mais recente
      const r = await fetch(`${blobs[0].url}?t=${Date.now()}`)
      return res.status(200).json(await r.json())
    } catch (err) {
      console.error("[GET /api/state]", err)
      return res.status(500).json({ error: err.message })
    }
  }

  // ── POST: salva o estado completo ──────────────────────────
  if (req.method === "POST") {
    try {
      const body = await readBody(req)
      await put(BLOB_PATH, JSON.stringify(body), {
        access: "public",
        allowOverwrite: true,
        contentType: "application/json",
      })
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error("[POST /api/state]", err)
      return res.status(500).json({ error: err.message })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}
