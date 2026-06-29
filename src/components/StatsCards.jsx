import { Crown, Users, CalendarCheck, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function StatCard({ icon: Icon, label, value, detail, accent = false, children }) {
  return (
    <Card className={accent ? "border-gold/40 bg-gold/5" : undefined}>
      <CardContent className="flex items-start gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
            accent ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`truncate text-lg font-bold ${accent ? "text-gold" : ""}`}>{value}</p>
          {detail && <p className="truncate text-xs text-muted-foreground">{detail}</p>}
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export default function StatsCards({ stats }) {
  const { leader, participantsCount, finished, total, totalHits } = stats
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        icon={Crown}
        label="Líder"
        value={leader ? leader.name : "—"}
        detail={leader ? `${leader.points} ${leader.points === 1 ? "ponto" : "pontos"}` : "Sem pontos ainda"}
        accent
      />
      <StatCard icon={Users} label="Participantes" value={participantsCount} detail="No bolão" />
      <StatCard
        icon={CalendarCheck}
        label="Jogos concluídos"
        value={`${finished}/${total}`}
        detail={`${Math.round((finished / total) * 100)}% da Copa`}
      >
        <Progress value={(finished / total) * 100} className="mt-1.5 h-1.5" />
      </StatCard>
      <StatCard icon={Target} label="Acertos totais" value={totalHits} detail="Resultados certos (1X2)" />
    </div>
  )
}
