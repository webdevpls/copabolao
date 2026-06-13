import { useEffect, useMemo, useState } from "react"
import { Trophy, ListChecks, History, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/Header"
import StatsCards from "@/components/StatsCards"
import RankingTable from "@/components/RankingTable"
import MatchFilters from "@/components/MatchFilters"
import MatchList from "@/components/MatchList"
import HistoryList from "@/components/HistoryList"
import ParticipantsManager from "@/components/ParticipantsManager"
import { MATCHES, getRound } from "@/data/matches"
import { seedState } from "@/data/seed"
import { computeStats, isValidScore } from "@/lib/scoring"

// v3: garante seed 1X2 limpo — incrementar para forçar reset do localStorage
const STORAGE_KEY = "bolao-copa-2026:v3"

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.participants)) {
        return {
          participants: parsed.participants,
          scores: parsed.scores ?? {},
          guesses: parsed.guesses ?? {},
        }
      }
    }
  } catch {
    // localStorage corrompido ou indisponível — recomeça com o seed
  }
  return seedState()
}

export default function App() {
  const [state, setState] = useState(loadState)
  const [filters, setFilters] = useState({ status: "all", round: "all", group: "all" })

  const { participants, scores, guesses } = state

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const stats = useMemo(
    () => computeStats(participants, guesses, scores),
    [participants, guesses, scores]
  )

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match) => {
      const finished = isValidScore(scores[match.id])
      if (filters.status === "finished" && !finished) return false
      if (filters.status === "pending" && finished) return false
      if (filters.round !== "all" && getRound(match.date) !== Number(filters.round)) return false
      if (filters.group !== "all" && match.group !== filters.group) return false
      return true
    })
  }, [filters, scores])

  const saveScore = (matchId, score) => {
    setState((s) => ({ ...s, scores: { ...s.scores, [matchId]: score } }))
  }

  const clearScore = (matchId) => {
    setState((s) => {
      const scores = { ...s.scores }
      delete scores[matchId]
      return { ...s, scores }
    })
  }

  const setGuess = (matchId, name, guess) => {
    setState((s) => ({
      ...s,
      guesses: {
        ...s.guesses,
        [matchId]: { ...s.guesses[matchId], [name]: guess },
      },
    }))
  }

  const addParticipant = (name) => {
    setState((s) => ({ ...s, participants: [...s.participants, name] }))
  }

  const removeParticipant = (name) => {
    setState((s) => {
      const guesses = Object.fromEntries(
        Object.entries(s.guesses).map(([matchId, byName]) => {
          const next = { ...byName }
          delete next[name]
          return [matchId, next]
        })
      )
      return {
        ...s,
        participants: s.participants.filter((p) => p !== name),
        guesses,
      }
    })
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
          Bolão da Copa 2026 · acertar o resultado (1X2) vale 1 ponto · dados salvos no seu navegador
        </footer>
      </main>
    </div>
  )
}
