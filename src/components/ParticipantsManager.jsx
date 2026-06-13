import { useState } from "react"
import { UserPlus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ParticipantsManager({ participants, ranking, onAdd, onRemove }) {
  const [name, setName] = useState("")
  const [toRemove, setToRemove] = useState(null)

  const pointsByName = Object.fromEntries(ranking.map((r) => [r.name, r.points]))

  const handleAdd = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error("Digite um nome para adicionar.")
      return
    }
    if (participants.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      toast.error(`"${trimmed}" já está no bolão.`)
      return
    }
    onAdd(trimmed)
    setName("")
    toast.success(`${trimmed} entrou no bolão! 🎉`)
  }

  const confirmRemove = () => {
    onRemove(toRemove)
    toast.info(`${toRemove} foi removido do bolão (palpites apagados).`)
    setToRemove(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar participante</CardTitle>
          <CardDescription>Novos participantes começam com 0 pontos e podem palpitar nos jogos pendentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              placeholder="Nome do participante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
            />
            <Button type="submit">
              <UserPlus className="size-4" /> Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {participants.map((p) => (
          <Card key={p} className="py-4">
            <CardContent className="flex items-center gap-3 px-4">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary/15 font-bold text-primary">
                  {p.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p}</p>
                <Badge variant="secondary" className="mt-0.5 font-mono text-xs">
                  {pointsByName[p] ?? 0} pts
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setToRemove(p)}
              >
                <Trash2 className="size-4" /> Remover
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={toRemove !== null} onOpenChange={(open) => !open && setToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover {toRemove}?</DialogTitle>
            <DialogDescription>
              Todos os palpites de {toRemove} serão apagados. Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToRemove(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              <Trash2 className="size-4" /> Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
