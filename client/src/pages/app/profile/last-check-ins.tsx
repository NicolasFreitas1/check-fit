import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIn } from "@/types/check-in";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
interface LastCheckInsProps {
  checkIns: CheckIn[];
}

export function LastCheckIns({ checkIns }: LastCheckInsProps) {
  const navigate = useNavigate();

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between border-b-2">
        <CardTitle className="font-bold">Meus últimos Check-ins</CardTitle>
        <Button
          variant="outline"
          className="font-bold"
          onClick={() => navigate("/check-ins", { replace: true })}
        >
          Ver mais
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3 p-3">
          {checkIns.length > 0 ? (
            checkIns.map((checkIn) => (
              <div className="flex items-center justify-start" key={checkIn.id}>
                <div className="flex items-center justify-center gap-3">
                  <li className="list-disc justify-center mt-2">
                    <p className="text-sm font-bold ">{checkIn.gymName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(checkIn.createdAt, {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </p>
                  </li>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <li className="list-disc items-center font-bold mt-2">
                  Nenhum check-in registrado ainda
                </li>
              </div>
            </div>
          )}
        </ul>
      </CardContent>
    </ScrollArea>
  );
}
