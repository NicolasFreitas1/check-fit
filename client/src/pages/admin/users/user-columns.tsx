import { User } from "@/context/AuthContext";
import { ColumnDef } from "@tanstack/react-table";
import { ListCheckInsButton } from "./list-check-ins-button";

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
          <ListCheckInsButton user={user} />
        </div>
      );
    },
  },
];
