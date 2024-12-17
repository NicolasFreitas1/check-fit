import { CheckIn } from "@/types/check-in";
import { ColumnDef } from "@tanstack/react-table";

export const checkInByUserColumns: ColumnDef<CheckIn>[] = [
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
];
