import { CheckCircle2, XCircle, Minus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  OUTCOMES,
  OUTCOME_SHORT,
  isValidScore,
  isValidGuess,
  guessStatus,
  outcomeLabel,
} from "@/lib/scoring"

function StatusIcon({ status }) {
  const config = {
    hit: { Icon: CheckCircle2, className: "text-primary", label: "Acertou o resultado" },
    miss: { Icon: XCircle, className: "text-destructive", label: "Errou o palpite" },
    none: { Icon: Minus, className: "text-muted-foreground", label: "Não palpitou" },
  }[status]
  const { Icon, className, label } = config
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex cursor-default" />}>
        <Icon className={`size-4.5 ${className}`} />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

// Linha de palpite de um participante para um jogo.
// Palpite é 1X2: vitória do mandante (1), empate (X) ou vitória do visitante (2).
// Sempre editável via botões 1/X/2 (salvo automaticamente); em jogos finalizados
// mostra também o ícone ✅/❌/— atualizado conforme o palpite.
export default function GuessRow({ name, guess, score, match, onChange, readOnly = false }) {
  const finished = isValidScore(score)
  const hasGuess = isValidGuess(guess)

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/40">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-6">
          <AvatarFallback className="bg-secondary text-[10px] font-semibold">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm">{name}</span>
      </div>

      <div className="flex items-center gap-2.5">
        {readOnly ? (
          hasGuess ? (
            <Badge variant="secondary" className="font-mono">
              {OUTCOME_SHORT[guess]}
              <span className="font-sans font-normal text-muted-foreground">
                {outcomeLabel(guess, match)}
              </span>
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )
        ) : (
          <ToggleGroup
            size="sm"
            variant="outline"
            spacing={1}
            value={hasGuess ? [guess] : []}
            onValueChange={(values) => onChange(values[0] ?? null)}
          >
            {OUTCOMES.map((outcome) => (
              <ToggleGroupItem
                key={outcome}
                value={outcome}
                title={outcomeLabel(outcome, match)}
                aria-label={`${outcomeLabel(outcome, match)} — palpite de ${name}`}
                className="h-7 w-8 font-mono data-pressed:border-primary/50 data-pressed:bg-primary/20 data-pressed:text-primary"
              >
                {OUTCOME_SHORT[outcome]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
        {finished && <StatusIcon status={guessStatus(guess, score)} />}
      </div>
    </div>
  )
}
