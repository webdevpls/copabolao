import { Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/40">
          <Trophy className="size-6 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
            Bolão da Copa do Mundo 2026
          </h1>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Fase de grupos · 11 a 27 de junho · EUA, Canadá e México
          </p>
        </div>
        <Badge variant="outline" className="hidden border-primary/40 text-primary sm:inline-flex">
          72 jogos
        </Badge>
      </div>
    </header>
  )
}
