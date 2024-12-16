import { Gym } from "@/types/gym";
import { formatPhone } from "@/utils/phone-formater";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

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
