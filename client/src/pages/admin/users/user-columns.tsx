import { User } from "@/context/AuthContext";
import { ColumnDef } from "@tanstack/react-table";
import { ListCheckInsButton } from "./list-check-ins-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row: { original: user } }) =>
      new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: user } }) => {
      return (
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ListCheckInsButton user={user} />
              </TooltipTrigger>
              <TooltipContent>Check-ins do usuário</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
