import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarX2 } from "lucide-react"
import MatchCard from "@/components/MatchCard"
import { getRound, todayISO } from "@/data/matches"

const ROUND_PERIODS = { 1: "11 a 17 de junho", 2: "18 a 23 de junho", 3: "24 a 27 de junho" }

export default function MatchList({ matches, scores, guesses, participants, onSaveScore, onClearScore, onSetGuess }) {
  const today = todayISO()

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
          <CalendarX2 className="size-8" />
          <p className="text-sm">Nenhum jogo encontrado com os filtros selecionados.</p>
        </CardContent>
      </Card>
    )
  }

  const rounds = [1, 2, 3]
    .map((round) => ({ round, items: matches.filter((m) => getRound(m.date) === round) }))
    .filter(({ items }) => items.length > 0)

  return (
    <div className="flex flex-col gap-6">
      {rounds.map(({ round, items }) => (
        <section key={round}>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-sm font-bold tracking-tight whitespace-nowrap">
              Rodada {round}
              <span className="ml-2 font-normal text-muted-foreground">
                {ROUND_PERIODS[round]} · {items.length} {items.length === 1 ? "jogo" : "jogos"}
              </span>
            </h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {items.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                score={scores[match.id]}
                guesses={guesses[match.id]}
                participants={participants}
                isToday={match.date === today}
                onSaveScore={onSaveScore}
                onClearScore={onClearScore}
                onSetGuess={onSetGuess}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
