import { deleteAccount } from "@/api/delete-account";
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
import { useAuth } from "@/context/AuthContext";
import { UserMinus } from "lucide-react";
import { toast } from "sonner";

export function DeleteAccountButton() {
  const { logout } = useAuth();

  async function handleDeleteAccount() {
    try {
      await deleteAccount();
      logout();
    } catch (error) {
      toast.error("Algo deu errado ao deletar sua conta");
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full font-bold" variant="destructive">
          <UserMinus className="h-4 w-4" />
          Deletar perfil
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza de que deseja excluir seu perfil?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é permanente e não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive text-white hover:bg-destructive"
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
