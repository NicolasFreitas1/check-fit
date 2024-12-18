import { makeCheckIn } from "@/api/make-check-in";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { MapPinCheck } from "lucide-react";
import { toast } from "sonner";

interface MakeCheckInButtonProps {
  gymId: string;
  gymName: string;
}

export function MakeCheckInButton({ gymId, gymName }: MakeCheckInButtonProps) {
  async function handleMakeCheckIn() {
    try {
      await makeCheckIn({ gymId });
      toast.success("Check-in realizado com sucesso!");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        switch (error.status) {
          case 409:
            toast.error("Você já realizou um check-in no dia de hoje!");
            break;
          case 404:
            toast.error("Academia não encontrada!");
            break;
          case 400:
            toast.error("Erro ao realizar check-in!");
            break;
        }
        return;
      }

      toast.error("Erro ao realizar check-in!");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MapPinCheck />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja realizar check-in</AlertDialogTitle>
          <AlertDialogDescription>
            Você deseja realizar check-in na academia:{" "}
            <span className="text-sm text-muted-foreground font-bold">
              {gymName}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleMakeCheckIn}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
