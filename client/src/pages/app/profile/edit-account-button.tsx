import { Button } from "@/components/ui/button";
import { User } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EditAccountDialog } from "./edit-account-dialog";

interface EditAccountButtonProps {
  user: User;
}

export function EditAccountButton({ user }: EditAccountButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="w-full font-bold"
        variant="secondary"
        onClick={() => setDialogIsOpen(true)}
      >
        <Pencil className="h-4 w-4" />
        Editar perfil
      </Button>
      <EditAccountDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        user={user}
      />
    </>
  );
}
