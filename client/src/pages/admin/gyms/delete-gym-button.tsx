import { deleteGym } from "@/api/delete-gym";
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
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteGymButtonProps {
  gymId: string;
}

export function DeleteGymButton({ gymId }: DeleteGymButtonProps) {
  const navigate = useNavigate();

  async function handleDeleteGym() {
    try {
      await deleteGym({ gymId });
      toast.success("Academia deletada com sucesso!");
      navigate(0);
    } catch (error) {
      toast.error("Algo deu errado ao deletar seu Academia");
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza de que deseja excluir esta academia?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Todos os check-ins vinculados à ela serão deletados também. Esta
            ação é permanente e não poderá ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteGym}
            className="bg-destructive text-white hover:bg-destructive"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
