import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

interface PaginationNumber {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  totalPages: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  totalCount,
  onPageChange,
  totalPages,
}: PaginationNumber) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 2)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(totalPages - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
