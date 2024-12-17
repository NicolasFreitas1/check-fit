import { deleteCheckIn } from "@/api/delete-check-in";
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

interface DeleteCheckInButtonProps {
  checkInId: string;
}

export function DeleteCheckInButton({ checkInId }: DeleteCheckInButtonProps) {
  const navigate = useNavigate();

  async function handleDeleteCheckIn() {
    try {
      await deleteCheckIn({ checkInId });
      toast.success("Check-in deletado com sucesso!");
      navigate(0);
    } catch (error) {
      toast.error("Algo deu errado ao deletar seu check-in");
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
            Você deseja realmente deletar esse check-in?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCheckIn}
            className="bg-destructive text-white hover:bg-destructive"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
