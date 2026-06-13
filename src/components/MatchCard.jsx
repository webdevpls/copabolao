import { useState } from "react"
import { CalendarDays, MapPin, ChevronDown, Check, Eraser, Flame } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import GuessRow from "@/components/GuessRow"
import { flag, formatMatchDate } from "@/data/matches"
import { isValidScore, isValidGuess } from "@/lib/scoring"
import { cn } from "@/lib/utils"

function TeamLabel({ team, align = "left" }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" && "flex-row-reverse text-right"
      )}
    >
      <span className="text-2xl leading-none">{flag(team)}</span>
      <span className="truncate text-sm font-semibold">{team}</span>
    </div>
  )
}

export default function MatchCard({
  match,
  score,
  guesses,
  participants,
  isToday,
  onSaveScore,
  onClearScore,
  onSetGuess,
}) {
  const finished = isValidScore(score)
  const [draft, setDraft] = useState({
    home: score?.home ?? "",
    away: score?.away ?? "",
  })
  const [open, setOpen] = useState(false)

  const guessCount = participants.filter((p) => isValidGuess(guesses?.[p])).length

  const handleSave = () => {
    const home = Number.parseInt(draft.home, 10)
    const away = Number.parseInt(draft.away, 10)
    if (Number.isNaN(home) || Number.isNaN(away) || home < 0 || away < 0) {
      toast.error("Informe os dois placares para salvar o resultado.")
      return
    }
    onSaveScore(match.id, { home, away })
    toast.success(`Placar salvo: ${match.home} ${home} x ${away} ${match.away}`)
  }

  const handleClear = () => {
    setDraft({ home: "", away: "" })
    onClearScore(match.id)
    toast.info("Placar oficial removido — jogo voltou a ficar pendente.")
  }

  return (
    <Card
      className={cn(
        "gap-3 py-4 transition-colors",
        isToday && "border-gold/60 ring-1 ring-gold/30 shadow-[0_0_24px_-12px_var(--gold)]"
      )}
    >
      <CardContent className="flex flex-col gap-3 px-4">
        {/* Cabeçalho: grupo, status e data/local */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="border-primary/40 text-primary">
            Grupo {match.group}
          </Badge>
          {isToday && (
            <Badge className="border-transparent bg-gold/20 text-gold hover:bg-gold/20">
              <Flame className="size-3" /> Hoje
            </Badge>
          )}
          <Badge variant={finished ? "secondary" : "outline"} className="text-muted-foreground">
            {finished ? "Encerrado" : "Aguardando"}
          </Badge>
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatMatchDate(match.date)} · {match.time}
          </span>
        </div>

        {/* Placar */}
        <div className="flex items-center gap-2">
          <TeamLabel team={match.home} />
          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              min="0"
              max="99"
              inputMode="numeric"
              placeholder="-"
              className="h-9 w-13 px-1 text-center font-mono text-base font-bold"
              value={draft.home}
              onChange={(e) => setDraft((d) => ({ ...d, home: e.target.value }))}
              aria-label={`Gols de ${match.home}`}
            />
            <span className="text-xs text-muted-foreground">x</span>
            <Input
              type="number"
              min="0"
              max="99"
              inputMode="numeric"
              placeholder="-"
              className="h-9 w-13 px-1 text-center font-mono text-base font-bold"
              value={draft.away}
              onChange={(e) => setDraft((d) => ({ ...d, away: e.target.value }))}
              aria-label={`Gols de ${match.away}`}
            />
          </div>
          <TeamLabel team={match.away} align="right" />
        </div>

        {/* Local + ações do placar oficial */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{match.venue}</span>
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            {finished && (
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <Eraser className="size-3.5" /> Limpar
              </Button>
            )}
            <Button size="sm" onClick={handleSave}>
              <Check className="size-3.5" /> Salvar placar
            </Button>
          </div>
        </div>

        <Separator />

        {/* Palpites */}
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "w-full justify-between text-muted-foreground"
            )}
          >
            <span>
              Ver palpites{" "}
              <span className="font-mono">
                ({guessCount}/{participants.length})
              </span>
            </span>
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-1 flex flex-col gap-0.5">
              {participants.length === 0 && (
                <p className="px-2 py-3 text-center text-xs text-muted-foreground">
                  Adicione participantes para registrar palpites.
                </p>
              )}
              {participants.length > 0 && (
                <p className="px-2 pb-1 text-[11px] text-muted-foreground">
                  1 = vitória {match.home} · X = empate · 2 = vitória {match.away}
                </p>
              )}
              {participants.map((name) => (
                <GuessRow
                  key={name}
                  name={name}
                  guess={guesses?.[name]}
                  score={score}
                  match={match}
                  onChange={(guess) => onSetGuess(match.id, name, guess)}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
