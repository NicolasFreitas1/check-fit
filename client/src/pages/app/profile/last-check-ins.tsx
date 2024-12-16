import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIn } from "@/types/check-in";
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
        {checkIns.length > 0 ? (
          checkIns.map((checkIn) => (
            <div className="flex items-center justify-between" key={checkIn.id}>
              <div className="flex items-center gap-3">
                <li className="list-disc items-center justify-center mt-2">
                  <p className="text-sm font-bold ">{checkIn.gymName}</p>
                  <p className="text-sm text-muted-foreground">
                    Feito em:{" "}
                    {new Date(checkIn.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
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
      </CardContent>
    </ScrollArea>
  );
}
