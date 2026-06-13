import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function RankingTable({ ranking }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Classificação</CardTitle>
        <CardDescription>
          Acertar o resultado (vitória, empate ou derrota) vale 1 ponto · empate decidido por
          ordem alfabética
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
                  className={isLeader ? "bg-gold/10 hover:bg-gold/15" : undefined}
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
                      <span className={`font-medium ${isLeader ? "text-gold" : ""}`}>
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
  )
}
