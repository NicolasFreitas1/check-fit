import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { GymDetailsDialog } from "./gym-details-dialog";

interface GymDetailsButtonProps {
  gymId: string;
}

export function GymDetailsButton({ gymId }: GymDetailsButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <Eye />
      </Button>
      <GymDetailsDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        gymId={gymId}
      />
    </>
  );
}
