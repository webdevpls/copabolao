import { useState } from "react"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { MATCHES, flag, formatMatchDate, getRound } from "@/data/matches"
import { isValidScore, isValidGuess, guessStatus, outcomeLabel, OUTCOME_SHORT } from "@/lib/scoring"

function ParticipantDialog({ name, guesses, scores, open, onClose }) {
  if (!name) return null

  const withGuess = MATCHES.filter((m) => isValidGuess(guesses[m.id]?.[name]))
  const finished = withGuess.filter((m) => isValidScore(scores[m.id]))
  const pending = withGuess.filter((m) => !isValidScore(scores[m.id]))

  const hits = finished.filter(
    (m) => guessStatus(guesses[m.id]?.[name], scores[m.id]) === "hit"
  ).length
  const misses = finished.length - hits
  const pct = finished.length > 0 ? Math.round((hits / finished.length) * 100) : 0

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-md flex-col gap-0 overflow-hidden rounded-2xl p-0">

        {/* Cabeçalho fixo */}
        <DialogHeader className="shrink-0 px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 shrink-0">
              <AvatarFallback className="bg-primary/15 text-lg font-bold text-primary">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <DialogTitle className="text-lg">{name}</DialogTitle>
              <DialogDescription className="text-xs">
                {finished.length} finalizados · {pending.length} pendentes com palpite
              </DialogDescription>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-muted/30">
            <div className="py-3 text-center">
              <p className="text-2xl font-bold text-primary">{hits}</p>
              <p className="text-[11px] text-muted-foreground">Acertos</p>
            </div>
            <div className="py-3 text-center">
              <p className="text-2xl font-bold text-destructive">{misses}</p>
              <p className="text-[11px] text-muted-foreground">Erros</p>
            </div>
            <div className="py-3 text-center">
              <p className="text-2xl font-bold">{hits}</p>
              <p className="text-[11px] text-muted-foreground">Pontos</p>
            </div>
          </div>

          {finished.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <Progress value={pct} className="h-1.5 flex-1" />
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {pct}% aproveit.
              </span>
            </div>
          )}
        </DialogHeader>

        <Separator />

        {/* Lista scrollável */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 px-5 py-4">

            {/* Finalizados */}
            {finished.length > 0 && (
              <section className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Finalizados
                </p>
                {finished
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((match) => {
                    const guess = guesses[match.id]?.[name]
                    const score = scores[match.id]
                    const hit = guessStatus(guess, score) === "hit"
                    return (
                      <div
                        key={match.id}
                        className={`flex items-start gap-3 rounded-xl border p-3 ${
                          hit
                            ? "border-primary/25 bg-primary/8"
                            : "border-destructive/25 bg-destructive/8"
                        }`}
                      >
                        {hit
                          ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                          : <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                        }
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug">
                            {flag(match.home)} {match.home} × {match.away} {flag(match.away)}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Rodada {getRound(match.date)} · {formatMatchDate(match.date)} · Grupo {match.group}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs tabular-nums">
                              {score.home} × {score.away}
                            </span>
                            <span className={`text-xs font-semibold ${hit ? "text-primary" : "text-destructive"}`}>
                              {OUTCOME_SHORT[guess]} — {outcomeLabel(guess, match)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </section>
            )}

            {/* Pendentes */}
            {pending.length > 0 && (
              <section className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Pendentes
                </p>
                {pending
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((match) => {
                    const guess = guesses[match.id]?.[name]
                    return (
                      <div
                        key={match.id}
                        className="flex items-start gap-3 rounded-xl border border-border/50 p-3"
                      >
                        <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground/50" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug">
                            {flag(match.home)} {match.home} × {match.away} {flag(match.away)}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Rodada {getRound(match.date)} · {formatMatchDate(match.date)} · Grupo {match.group}
                          </p>
                          <p className="mt-1.5 text-xs">
                            <span className="text-muted-foreground">Palpite: </span>
                            <span className="font-semibold">
                              {OUTCOME_SHORT[guess]} — {outcomeLabel(guess, match)}
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </section>
            )}

            {withGuess.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                {name} ainda não fez nenhum palpite.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default function RankingTable({ ranking, guesses, scores }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Classificação</CardTitle>
          <CardDescription>
            1 ponto por resultado correto · toque no nome para ver detalhes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Participante</TableHead>
                <TableHead className="text-center">J</TableHead>
                <TableHead className="text-center">V</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">Pts</TableHead>
                <TableHead className="hidden text-right sm:table-cell">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Nenhum participante ainda. Adicione na aba "Participantes".
                  </TableCell>
                </TableRow>
              )}
              {ranking.map((row, index) => {
                const isLeader = index === 0 && row.points > 0
                return (
                  <TableRow
                    key={row.name}
                    className={`cursor-pointer ${isLeader ? "bg-gold/10 hover:bg-gold/15" : "hover:bg-muted/50"}`}
                    onClick={() => setSelected(row.name)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7 shrink-0">
                          <AvatarFallback
                            className={isLeader
                              ? "bg-gold/20 text-gold text-xs font-bold"
                              : "bg-primary/15 text-primary text-xs font-bold"
                            }
                          >
                            {row.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`text-sm font-medium underline-offset-2 hover:underline ${isLeader ? "text-gold" : ""}`}>
                          {row.name}
                        </span>
                        {isLeader && (
                          <Badge className="hidden border-transparent bg-gold/20 text-gold hover:bg-gold/20 sm:inline-flex">
                            👑 Líder
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm">{row.played}</TableCell>
                    <TableCell className="text-center font-mono text-sm text-primary">{row.wins}</TableCell>
                    <TableCell className="text-center font-mono text-sm text-destructive">{row.losses}</TableCell>
                    <TableCell className="text-center font-mono text-sm font-bold">{row.points}</TableCell>
                    <TableCell className="hidden text-right font-mono text-sm text-muted-foreground sm:table-cell">
                      {row.pct}%
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ParticipantDialog
        name={selected}
        guesses={guesses}
        scores={scores}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
