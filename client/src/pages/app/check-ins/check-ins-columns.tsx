import { CheckIn } from "@/types/check-in";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

export const checkInColumns: ColumnDef<CheckIn>[] = [
  {
    accessorKey: "gymName",
    header: "Academia",
  },
  {
    accessorKey: "createdAt",
    header: "Feito em",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="flex space-x-1 items-center justify-normal">
          <Eye height={24} width={24} />
          <Trash height={24} width={24} />
        </div>
      );
    },
  },
];
