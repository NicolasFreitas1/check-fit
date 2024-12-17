import { Button } from "@/components/ui/button";
import { User } from "@/context/AuthContext";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ListCheckInsDialog } from "./list-check-ins-dialog";

interface ListCheckInsButtonProps {
  user: User;
}

export function ListCheckInsButton({ user }: ListCheckInsButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <ListCheckInsDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        user={user}
      />
    </>
  );
}
