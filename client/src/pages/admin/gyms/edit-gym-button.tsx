import { Button } from "@/components/ui/button";
import { Gym } from "@/types/gym";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditGymButtonProps {
  gym: Gym;
}

export function EditGymButton({ gym }: EditGymButtonProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => navigate(`/admin/gyms/${gym.id}/edit`)}
      >
        <Pencil />
      </Button>
    </>
  );
}
