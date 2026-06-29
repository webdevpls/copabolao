import { Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GROUPS, PHASES } from "@/data/matches"

const STATUS_ITEMS = [
  { value: "all", label: "Todos" },
  { value: "finished", label: "Finalizados" },
  { value: "pending", label: "Pendentes" },
]

const PHASE_ITEMS = [
  { value: "all", label: "Todas" },
  ...PHASES.map((p) => ({ value: p.key, label: p.label })),
]

const GROUP_ITEMS = [
  { value: "all", label: "Todos" },
  ...GROUPS.map((g) => ({ value: g, label: `Grupo ${g}` })),
]

function FilterSelect({ label, value, onChange, items }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Select value={value} onValueChange={onChange} items={items}>
        <SelectTrigger className="min-w-32 flex-1 sm:flex-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default function MatchFilters({ filters, onChange }) {
  const set = (key) => (value) => onChange({ ...filters, [key]: value })
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/50 p-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <Filter className="size-4 text-primary" />
        Filtros
      </div>
      <FilterSelect label="Status" value={filters.status} onChange={set("status")} items={STATUS_ITEMS} />
      <FilterSelect label="Fase" value={filters.round} onChange={set("round")} items={PHASE_ITEMS} />
      <FilterSelect label="Grupo" value={filters.group} onChange={set("group")} items={GROUP_ITEMS} />
    </div>
  )
}
