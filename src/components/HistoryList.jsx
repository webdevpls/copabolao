import { History, CalendarDays, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import GuessRow from "@/components/GuessRow"
import { flag, formatMatchDate, phaseLabel } from "@/data/matches"
import { isValidScore } from "@/lib/scoring"

// Mesma estrutura do MatchList, mas somente jogos finalizados,
// mostrando palpite x resultado de cada participante.
export default function HistoryList({ matches, scores, guesses, participants, onSetGuess }) {
  const finished = matches
    .filter((m) => isValidScore(scores[m.id]))
    .sort((a, b) => (a.date === b.date ? b.id - a.id : b.date.localeCompare(a.date)))

  if (finished.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
          <History className="size-8" />
          <p className="text-sm">Nenhum jogo finalizado ainda. Salve um placar oficial na aba "Jogos & Palpites".</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <ScrollArea className="max-h-[70vh] overflow-y-auto pr-3">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {finished.map((match) => {
          const score = scores[match.id]
          return (
            <Card key={match.id} className="gap-3 py-4">
              <CardContent className="flex flex-col gap-3 px-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {match.group ? `Grupo ${match.group}` : phaseLabel(match)}
                  </Badge>
                  {match.group && (
                    <Badge variant="secondary" className="text-muted-foreground">
                      {phaseLabel(match)}
                    </Badge>
                  )}
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatMatchDate(match.date)} · {match.time}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right">
                    <span className="truncate text-sm font-semibold">{match.home}</span>
                    <span className="text-2xl leading-none">{flag(match.home)}</span>
                  </div>
                  <span className="rounded-lg bg-secondary px-3 py-1 font-mono text-lg font-bold tabular-nums">
                    {score.home} x {score.away}
                  </span>
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="text-2xl leading-none">{flag(match.away)}</span>
                    <span className="truncate text-sm font-semibold">{match.away}</span>
                  </div>
                </div>

                <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {match.venue}
                </span>

                <Separator />

                <div className="flex flex-col gap-0.5">
                  {participants.map((name) => (
                    <GuessRow
                      key={name}
                      name={name}
                      guess={guesses[match.id]?.[name]}
                      score={score}
                      match={match}
                      onChange={(guess) => onSetGuess(match.id, name, guess)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </ScrollArea>
  )
}
