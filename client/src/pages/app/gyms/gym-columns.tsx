import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Gym } from "@/types/gym";
import { formatPhone } from "@/utils/phone-formater";
import { ColumnDef } from "@tanstack/react-table";
import { MakeCheckInButton } from "./make-check-in-button";

export const gymColumns: ColumnDef<Gym>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
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
                <MakeCheckInButton gymId={gym.id} gymName={gym.name} />
              </TooltipTrigger>
              <TooltipContent>Realizar check-in</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
