import { useState } from "react"
import { CheckCircle2, XCircle, Minus, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { MATCHES } from "@/data/matches"
import { flag, formatMatchDate, getRound } from "@/data/matches"
import { isValidScore, isValidGuess, guessStatus, outcomeLabel, OUTCOME_SHORT } from "@/lib/scoring"

function StatusIcon({ status }) {
  if (status === "hit")
    return <CheckCircle2 className="size-4 shrink-0 text-primary" />
  if (status === "miss")
    return <XCircle className="size-4 shrink-0 text-destructive" />
  if (status === "pending")
    return <Clock className="size-4 shrink-0 text-muted-foreground/60" />
  return <Minus className="size-4 shrink-0 text-muted-foreground/40" />
}

function ParticipantDialog({ name, guesses, scores, open, onClose }) {
  if (!name) return null

  // Jogos onde o participante tem palpite, separados por status
  const withGuess = MATCHES.filter((m) => isValidGuess(guesses[m.id]?.[name]))
  const finished = withGuess.filter((m) => isValidScore(scores[m.id]))
  const pending = withGuess.filter((m) => !isValidScore(scores[m.id]))

  const hits = finished.filter(
    (m) => guessStatus(guesses[m.id]?.[name], scores[m.id]) === "hit"
  ).length
  const misses = finished.length - hits

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary/15 text-base font-bold text-primary">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>
                {finished.length} jogos finalizados · {pending.length} pendentes
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Mini resumo */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/60 bg-muted/30 p-3">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{hits}</p>
            <p className="text-xs text-muted-foreground">Acertos</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-destructive">{misses}</p>
            <p className="text-xs text-muted-foreground">Erros</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{hits}</p>
            <p className="text-xs text-muted-foreground">Pontos</p>
          </div>
        </div>

        {finished.length > 0 && (
          <div className="flex items-center gap-2">
            <Progress value={finished.length > 0 ? (hits / finished.length) * 100 : 0} className="h-1.5 flex-1" />
            <span className="text-xs text-muted-foreground tabular-nums">
              {finished.length > 0 ? Math.round((hits / finished.length) * 100) : 0}% de aproveitamento
            </span>
          </div>
        )}

        <ScrollArea className="max-h-[52vh]">
          <div className="flex flex-col gap-4 pr-3">

            {/* Jogos finalizados */}
            {finished.length > 0 && (
              <section>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Finalizados
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="flex flex-col gap-1">
                  {finished
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((match) => {
                      const guess = guesses[match.id]?.[name]
                      const score = scores[match.id]
                      const status = guessStatus(guess, score)
                      return (
                        <div
                          key={match.id}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted/40"
                        >
                          <StatusIcon status={status} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {flag(match.home)} {match.home} × {match.away} {flag(match.away)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Rodada {getRound(match.date)} · {formatMatchDate(match.date)} · Grupo {match.group}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs tabular-nums">
                              {score.home} x {score.away}
                            </span>
                            <Badge
                              variant="outline"
                              className={
                                status === "hit"
                                  ? "border-primary/40 text-primary"
                                  : "border-destructive/40 text-destructive"
                              }
                            >
                              {OUTCOME_SHORT[guess]}
                              <span className="hidden font-sans font-normal sm:inline">
                                {" "}· {outcomeLabel(guess, match)}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </section>
            )}

            {/* Jogos pendentes com palpite */}
            {pending.length > 0 && (
              <section>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Pendentes
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="flex flex-col gap-1">
                  {pending
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((match) => {
                      const guess = guesses[match.id]?.[name]
                      return (
                        <div
                          key={match.id}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted/40"
                        >
                          <StatusIcon status="pending" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {flag(match.home)} {match.home} × {match.away} {flag(match.away)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Rodada {getRound(match.date)} · {formatMatchDate(match.date)} · Grupo {match.group}
                            </p>
                          </div>
                          <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                            {OUTCOME_SHORT[guess]}
                            <span className="hidden font-sans font-normal sm:inline">
                              {" "}· {outcomeLabel(guess, match)}
                            </span>
                          </Badge>
                        </div>
                      )
                    })}
                </div>
              </section>
            )}

            {withGuess.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
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
            Acertar o resultado (vitória, empate ou derrota) vale 1 ponto · clique no nome para ver os detalhes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Participante</TableHead>
                <TableHead className="text-center">J</TableHead>
                <TableHead className="text-center">V</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">Pts</TableHead>
                <TableHead className="text-right">%</TableHead>
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
                    <TableCell className="font-mono text-muted-foreground">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarFallback
                            className={
                              isLeader
                                ? "bg-gold/20 text-gold text-xs font-bold"
                                : "bg-primary/15 text-primary text-xs font-bold"
                            }
                          >
                            {row.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`font-medium underline-offset-2 hover:underline ${isLeader ? "text-gold" : ""}`}>
                          {row.name}
                        </span>
                        {isLeader && (
                          <Badge className="border-transparent bg-gold/20 text-gold hover:bg-gold/20">
                            👑 Líder
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono">{row.played}</TableCell>
                    <TableCell className="text-center font-mono text-primary">{row.wins}</TableCell>
                    <TableCell className="text-center font-mono text-destructive">
                      {row.losses}
                    </TableCell>
                    <TableCell className="text-center font-mono font-bold">{row.points}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
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
