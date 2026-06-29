import { useState } from "react"
import { Trophy, Plus, Trash2, Link2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Barra de ligas estilo Cartola: cada liga é um bolão isolado (participantes e
// palpites separados). Os resultados dos jogos são os mesmos para todas.
export default function LeagueBar({ leagues, currentId, onSelect, onCreate, onRemove }) {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  const current = leagues.find((l) => l.id === currentId)

  const handleCreate = (e) => {
    e.preventDefault()
    const trimmed = newName.trim()
    if (!trimmed) {
      toast.error("Dê um nome para a liga.")
      return
    }
    if (leagues.some((l) => l.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`Já existe uma liga chamada "${trimmed}".`)
      return
    }
    onCreate(trimmed)
    setNewName("")
    setCreating(false)
  }

  const handleDelete = () => {
    onRemove(currentId)
    setConfirmDelete(false)
  }

  const handleCopyLink = async () => {
    if (!currentId) return
    const link = `${window.location.origin}${window.location.pathname}?liga=${currentId}`
    try {
      await navigator.clipboard.writeText(link)
      toast.success(`Link da liga "${current?.name}" copiado! Mande pros amigos. 🔗`)
    } catch {
      toast.error("Não foi possível copiar. Link: " + link)
    }
  }

  const selectItems = leagues.map((l) => ({ value: l.id, label: l.name }))

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-card/50 p-3">
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <Trophy className="size-4 text-gold" />
        Liga
      </div>

      <Select value={currentId ?? ""} onValueChange={onSelect} items={selectItems}>
        <SelectTrigger className="min-w-44 flex-1 sm:flex-none">
          <SelectValue placeholder="Selecione uma liga" />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" onClick={() => setCreating(true)}>
        <Plus className="size-4" /> Nova liga
      </Button>

      {current && (
        <Button
          variant="outline"
          size="sm"
          className="border-green-500/50 text-green-400 hover:border-green-500 hover:bg-green-500/10 hover:text-green-300"
          onClick={handleCopyLink}
        >
          <Link2 className="size-4" /> Copiar link
        </Button>
      )}

      {current && leagues.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="size-4" />
          <span className="hidden sm:inline">Excluir</span>
        </Button>
      )}

      {/* Criar nova liga */}
      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova liga</DialogTitle>
            <DialogDescription>
              Crie um bolão separado para outro grupo de amigos. Os participantes e palpites não se
              misturam com as outras ligas.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <Input
              autoFocus
              placeholder="Ex.: Amigos do Trabalho"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              maxLength={40}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreating(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Plus className="size-4" /> Criar liga
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Excluir liga atual */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir a liga "{current?.name}"?</DialogTitle>
            <DialogDescription>
              Todos os participantes e palpites desta liga serão apagados. Os resultados dos jogos
              não são afetados. Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="size-4" /> Excluir liga
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
