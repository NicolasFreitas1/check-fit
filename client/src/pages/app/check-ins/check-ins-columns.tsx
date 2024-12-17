import { CheckIn } from "@/types/check-in";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteCheckInButton } from "./delete-check-in-button";
import { GymDetailsButton } from "@/components/gym-details-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const checkInColumns: ColumnDef<CheckIn>[] = [
  {
    accessorKey: "gymName",
    header: "Academia",
  },
  {
    accessorKey: "createdAt",
    header: "Feito em",
    cell: ({ row: { original: checkIn } }) =>
      new Date(checkIn.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: checkIn } }) => {
      return (
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GymDetailsButton gymId={checkIn.gymId} />
              </TooltipTrigger>
              <TooltipContent>Detalhes da academia</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DeleteCheckInButton checkInId={checkIn.id} />
              </TooltipTrigger>
              <TooltipContent>Deletar check-in</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
