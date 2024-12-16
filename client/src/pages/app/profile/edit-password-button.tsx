import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import { EditPasswordDialog } from "./edit-password-dialog";

interface EditPasswordButtonProps {
  userId: string;
}

export function EditPasswordButton({ userId }: EditPasswordButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="w-full font-bold"
        variant="secondary"
        onClick={() => setDialogIsOpen(true)}
      >
        <Lock className="h-4 w-4" />
        Editar senha
      </Button>
      <EditPasswordDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        userId={userId}
      />
    </>
  );
}
