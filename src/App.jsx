import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
import LeagueBar from "@/components/LeagueBar"
import { MATCHES, phaseKey } from "@/data/matches"
import { computeStats, isValidScore } from "@/lib/scoring"
import {
  loadLeagues,
  createLeague as apiCreateLeague,
  removeLeague as apiRemoveLeague,
  loadState,
  upsertScore,
  deleteScore,
  upsertGuess,
  deleteGuess,
  addParticipant as apiAddParticipant,
  removeParticipant as apiRemoveParticipant,
} from "@/lib/api"

const POLL_INTERVAL = 15_000
const LEAGUE_KEY = "bolao-copa-2026:liga-atual"

export default function App() {
  const [leagues, setLeagues]                 = useState([])
  const [currentLeagueId, setCurrentLeagueId] = useState(null)
  const [participants, setParticipants]       = useState([])
  const [scores, setScores]                   = useState({})
  const [guesses, setGuesses]                 = useState({})
  const [loading, setLoading]                 = useState(true)
  const [offline, setOffline]                 = useState(false)
  const [filters, setFilters]                 = useState({ status: "all", round: "all", group: "all" })

  const stateRef  = useRef({ participants: [], scores: {}, guesses: {} })
  const leagueRef = useRef(null) // liga atual, para uso nos callbacks assíncronos

  function applyState(data) {
    const s = {
      participants: data.participants ?? [],
      scores:       data.scores       ?? {},
      guesses:      data.guesses      ?? {},
    }
    stateRef.current = s
    setParticipants(s.participants)
    setScores(s.scores)
    setGuesses(s.guesses)
  }

  // ── Carrega ligas e escolhe a liga inicial ─────────────────
  useEffect(() => {
    (async () => {
      try {
        let ls = await loadLeagues()
        if (ls.length === 0) ls = [await apiCreateLeague("Liga Principal")]
        setLeagues(ls)
        // Prioridade: liga do link (?liga=) > última usada neste aparelho > primeira.
        const fromUrl = new URLSearchParams(window.location.search).get("liga")
        const saved = localStorage.getItem(LEAGUE_KEY)
        setCurrentLeagueId(
          ls.find((l) => l.id === fromUrl)?.id ??
          ls.find((l) => l.id === saved)?.id ??
          ls[0].id
        )
      } catch (err) {
        console.error(err)
        setOffline(true)
        setLoading(false)
        toast.error("Não foi possível conectar ao banco de dados.")
      }
    })()
  }, [])

  // ── Carrega o estado da liga atual + polling ───────────────
  useEffect(() => {
    if (!currentLeagueId) return
    leagueRef.current = currentLeagueId
    localStorage.setItem(LEAGUE_KEY, currentLeagueId)
    // Reflete a liga atual na URL (?liga=) p/ refresh e compartilhamento de link.
    const url = new URL(window.location.href)
    url.searchParams.set("liga", currentLeagueId)
    window.history.replaceState({}, "", url)

    let active = true
    loadState(currentLeagueId)
      .then((data) => { if (active) { applyState(data); setOffline(false) } })
      .catch((err) => {
        if (!active) return
        console.error(err)
        setOffline(true)
        toast.error("Não foi possível conectar ao banco de dados.")
      })
      .finally(() => { if (active) setLoading(false) })

    const id = setInterval(async () => {
      try {
        const data = await loadState(currentLeagueId)
        if (active) applyState(data)
      } catch { /* silencioso */ }
    }, POLL_INTERVAL)

    return () => { active = false; clearInterval(id) }
  }, [currentLeagueId])

  // ── Ações ─────────────────────────────────────────────────
  const saveScore = useCallback((matchId, score) => {
    const next = { ...stateRef.current, scores: { ...stateRef.current.scores, [matchId]: score } }
    stateRef.current = next
    setScores(next.scores)
    upsertScore(matchId, score.home, score.away).catch((err) => {
      console.error(err)
      toast.error("Falha ao salvar resultado.")
    })
  }, [])

  const clearScore = useCallback((matchId) => {
    const scores = { ...stateRef.current.scores }
    delete scores[matchId]
    const next = { ...stateRef.current, scores }
    stateRef.current = next
    setScores(next.scores)
    deleteScore(matchId).catch((err) => {
      console.error(err)
      toast.error("Falha ao remover resultado.")
    })
  }, [])

  const setGuess = useCallback((matchId, name, outcome) => {
    const matchGuesses = { ...stateRef.current.guesses[matchId] }
    if (outcome === null) {
      delete matchGuesses[name]
    } else {
      matchGuesses[name] = outcome
    }
    const next = {
      ...stateRef.current,
      guesses: { ...stateRef.current.guesses, [matchId]: matchGuesses },
    }
    stateRef.current = next
    setGuesses(next.guesses)

    if (outcome === null) {
      deleteGuess(leagueRef.current, matchId, name).catch((err) => {
        console.error(err)
        toast.error("Falha ao remover palpite.")
      })
    } else {
      upsertGuess(leagueRef.current, matchId, name, outcome).catch((err) => {
        console.error(err)
        toast.error("Falha ao salvar palpite.")
      })
    }
  }, [])

  const addParticipant = useCallback((name) => {
    const next = { ...stateRef.current, participants: [...stateRef.current.participants, name] }
    stateRef.current = next
    setParticipants(next.participants)
    apiAddParticipant(leagueRef.current, name).catch((err) => {
      console.error(err)
      toast.error("Falha ao adicionar participante.")
    })
  }, [])

  const removeParticipant = useCallback((name) => {
    const guesses = Object.fromEntries(
      Object.entries(stateRef.current.guesses).map(([mid, byName]) => {
        const n = { ...byName }
        delete n[name]
        return [mid, n]
      })
    )
    const next = {
      participants: stateRef.current.participants.filter((p) => p !== name),
      scores: stateRef.current.scores,
      guesses,
    }
    stateRef.current = next
    setParticipants(next.participants)
    setGuesses(next.guesses)
    apiRemoveParticipant(leagueRef.current, name).catch((err) => {
      console.error(err)
      toast.error("Falha ao remover participante.")
    })
  }, [])

  // ── Ligas ─────────────────────────────────────────────────
  function selectLeague(id) {
    if (id !== currentLeagueId) setCurrentLeagueId(id)
  }

  function createLeague(name) {
    apiCreateLeague(name)
      .then((league) => {
        setLeagues((prev) => [...prev, league])
        setCurrentLeagueId(league.id)
        toast.success(`Liga "${name}" criada! 🎉`)
      })
      .catch((err) => {
        console.error(err)
        toast.error("Falha ao criar liga.")
      })
  }

  function removeLeague(id) {
    const remaining = leagues.filter((l) => l.id !== id)
    apiRemoveLeague(id)
      .then(() => {
        setLeagues(remaining)
        if (id === currentLeagueId) setCurrentLeagueId(remaining[0]?.id ?? null)
        toast.info("Liga excluída.")
      })
      .catch((err) => {
        console.error(err)
        toast.error("Falha ao excluir liga.")
      })
  }

  // ── Derivados ──────────────────────────────────────────────
  const stats = useMemo(
    () => computeStats(participants, guesses, scores),
    [participants, guesses, scores]
  )

  const filteredMatches = useMemo(() => MATCHES.filter((m) => {
    const finished = isValidScore(scores[m.id])
    if (filters.status === "finished" && !finished) return false
    if (filters.status === "pending"  && finished)  return false
    if (filters.round !== "all" && phaseKey(m) !== filters.round) return false
    if (filters.group !== "all" && m.group !== filters.group) return false
    return true
  }), [filters, scores])

  // ── Loading / offline ──────────────────────────────────────
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
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-6 text-center text-muted-foreground">
        <WifiOff className="size-8 text-destructive" />
        <p className="font-medium text-destructive">Sem conexão com o banco de dados</p>
        <p className="max-w-xs text-xs">
          Verifique as variáveis de ambiente{" "}
          <code className="rounded bg-muted px-1">VITE_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-muted px-1">VITE_SUPABASE_ANON_KEY</code> no painel da Vercel.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-svh">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5">
        <LeagueBar
          leagues={leagues}
          currentId={currentLeagueId}
          onSelect={selectLeague}
          onCreate={createLeague}
          onRemove={removeLeague}
        />
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
          Bolão da Copa 2026 · 1 ponto por resultado correto · dados compartilhados via Supabase
        </footer>
      </main>
    </div>
  )
}
