import { Button } from "@/components/ui/button";
import { Gym } from "@/types/gym";
import { Eye } from "lucide-react";
import { useState } from "react";
import { GymDetailsDialog } from "./gym-details-dialog";

interface GymDetailsButtonProps {
  gym: Gym;
}

export function GymDetailsButton({ gym }: GymDetailsButtonProps) {
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
        gym={gym}
      />
    </>
  );
}
