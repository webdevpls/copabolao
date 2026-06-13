import { useEffect, useMemo, useState, useCallback } from "react"
import { Trophy, ListChecks, History, Users, Loader2, WifiOff } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/Header"
import StatsCards from "@/components/StatsCards"
import RankingTable from "@/components/RankingTable"
import MatchFilters from "@/components/MatchFilters"
import MatchList from "@/components/MatchList"
import HistoryList from "@/components/HistoryList"
import ParticipantsManager from "@/components/ParticipantsManager"
import { MATCHES, getRound } from "@/data/matches"
import { computeStats, isValidScore } from "@/lib/scoring"
import { supabase } from "@/lib/supabase"
import {
  fetchParticipants, addParticipant as dbAdd, removeParticipant as dbRemove,
  fetchScores, upsertScore, deleteScore,
  fetchGuesses, upsertGuess,
} from "@/lib/db"

export default function App() {
  const [participants, setParticipants] = useState([])
  const [scores, setScores]             = useState({})
  const [guesses, setGuesses]           = useState({})
  const [loading, setLoading]           = useState(true)
  const [offline, setOffline]           = useState(false)
  const [filters, setFilters]           = useState({ status: "all", round: "all", group: "all" })

  // ── Carregamento inicial ────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const [p, s, g] = await Promise.all([fetchParticipants(), fetchScores(), fetchGuesses()])
        setParticipants(p)
        setScores(s)
        setGuesses(g)
      } catch (err) {
        console.error(err)
        setOffline(true)
        toast.error("Sem conexão com o banco de dados. Verifique as variáveis de ambiente.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ── Real-time: ouve alterações de outros usuários ───────────
  useEffect(() => {
    const channel = supabase
      .channel("bolao-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "participants" }, async () => {
        setParticipants(await fetchParticipants())
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "scores" }, async () => {
        setScores(await fetchScores())
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "guesses" }, async () => {
        setGuesses(await fetchGuesses())
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ── Ações ───────────────────────────────────────────────────
  const saveScore = useCallback(async (matchId, score) => {
    // optimistic
    setScores((s) => ({ ...s, [matchId]: score }))
    try {
      await upsertScore(matchId, score)
    } catch {
      toast.error("Erro ao salvar o placar.")
      setScores(await fetchScores())
    }
  }, [])

  const clearScore = useCallback(async (matchId) => {
    setScores((s) => { const n = { ...s }; delete n[matchId]; return n })
    try {
      await deleteScore(matchId)
    } catch {
      toast.error("Erro ao remover o placar.")
      setScores(await fetchScores())
    }
  }, [])

  const setGuess = useCallback(async (matchId, name, outcome) => {
    // optimistic
    setGuesses((g) => ({
      ...g,
      [matchId]: outcome === null
        ? Object.fromEntries(Object.entries(g[matchId] ?? {}).filter(([k]) => k !== name))
        : { ...g[matchId], [name]: outcome },
    }))
    try {
      await upsertGuess(matchId, name, outcome)
    } catch {
      toast.error("Erro ao salvar o palpite.")
      setGuesses(await fetchGuesses())
    }
  }, [])

  const addParticipant = useCallback(async (name) => {
    setParticipants((p) => [...p, name])
    try {
      await dbAdd(name)
    } catch {
      toast.error("Erro ao adicionar participante.")
      setParticipants(await fetchParticipants())
    }
  }, [])

  const removeParticipant = useCallback(async (name) => {
    setParticipants((p) => p.filter((x) => x !== name))
    setGuesses((g) => Object.fromEntries(
      Object.entries(g).map(([mid, byName]) => {
        const n = { ...byName }; delete n[name]; return [mid, n]
      })
    ))
    try {
      await dbRemove(name) // cascade apaga os palpites no banco
    } catch {
      toast.error("Erro ao remover participante.")
      const [p, g] = await Promise.all([fetchParticipants(), fetchGuesses()])
      setParticipants(p); setGuesses(g)
    }
  }, [])

  // ── Derivados ───────────────────────────────────────────────
  const stats = useMemo(
    () => computeStats(participants, guesses, scores),
    [participants, guesses, scores]
  )

  const filteredMatches = useMemo(() => MATCHES.filter((match) => {
    const finished = isValidScore(scores[match.id])
    if (filters.status === "finished" && !finished) return false
    if (filters.status === "pending"  && finished)  return false
    if (filters.round !== "all" && getRound(match.date) !== Number(filters.round)) return false
    if (filters.group !== "all" && match.group !== filters.group) return false
    return true
  }), [filters, scores])

  // ── Loading / offline ───────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm">Carregando dados do bolão…</p>
      </div>
    )
  }

  if (offline) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 text-muted-foreground">
        <WifiOff className="size-8 text-destructive" />
        <p className="text-sm font-medium text-destructive">Sem conexão com o Supabase</p>
        <p className="max-w-xs text-center text-xs">
          Verifique se as variáveis <code className="rounded bg-muted px-1">VITE_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-muted px-1">VITE_SUPABASE_ANON_KEY</code> estão configuradas.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-svh">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5">
        <StatsCards stats={stats} />

        <Tabs defaultValue="ranking">
          <TabsList className="w-full sm:w-fit">
            <TabsTrigger value="ranking">
              <Trophy className="size-4" />
              <span className="hidden sm:inline">Ranking</span>
            </TabsTrigger>
            <TabsTrigger value="matches">
              <ListChecks className="size-4" />
              <span className="hidden sm:inline">Jogos & Palpites</span>
              <span className="sm:hidden">Jogos</span>
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="size-4" />
              <span className="hidden sm:inline">Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="participants">
              <Users className="size-4" />
              <span className="hidden sm:inline">Participantes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ranking" className="mt-3">
            <RankingTable ranking={stats.ranking} guesses={guesses} scores={scores} />
          </TabsContent>

          <TabsContent value="matches" className="mt-3">
            <div className="flex flex-col gap-4">
              <MatchFilters filters={filters} onChange={setFilters} />
              <MatchList
                matches={filteredMatches}
                scores={scores}
                guesses={guesses}
                participants={participants}
                onSaveScore={saveScore}
                onClearScore={clearScore}
                onSetGuess={setGuess}
              />
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-3">
            <HistoryList
              matches={MATCHES}
              scores={scores}
              guesses={guesses}
              participants={participants}
              onSetGuess={setGuess}
            />
          </TabsContent>

          <TabsContent value="participants" className="mt-3">
            <ParticipantsManager
              participants={participants}
              ranking={stats.ranking}
              onAdd={addParticipant}
              onRemove={removeParticipant}
            />
          </TabsContent>
        </Tabs>

        <footer className="pb-4 text-center text-xs text-muted-foreground">
          Bolão da Copa 2026 · 1 ponto por resultado correto · dados compartilhados em tempo real
        </footer>
      </main>
    </div>
  )
}
