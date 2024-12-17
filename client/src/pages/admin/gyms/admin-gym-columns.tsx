import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Gym } from "@/types/gym";
import { formatPhone } from "@/utils/phone-formater";
import { ColumnDef } from "@tanstack/react-table";
import { GymDetailsButton } from "../../../components/gym-details-button";
import { DeleteGymButton } from "./delete-gym-button";

export const adminGymColumns: ColumnDef<Gym>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row: { original: gym } }) =>
      new Date(gym.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row: { original: gym } }) => {
      return formatPhone(gym.phone);
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: gym } }) => {
      return (
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GymDetailsButton gymId={gym.id} />
              </TooltipTrigger>
              <TooltipContent>Detalhes da academia</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DeleteGymButton gymId={gym.id} />
              </TooltipTrigger>
              <TooltipContent>Deletar academia</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
