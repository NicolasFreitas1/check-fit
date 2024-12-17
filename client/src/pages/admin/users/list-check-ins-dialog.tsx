import { ListCheckInsResult } from "@/api/list-check-ins";
import { listCheckInsByUser } from "@/api/list-check-ins-by-user";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { checkInByUserColumns } from "./check-ins-by-user-columns";

interface ListCheckInsDialogProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ListCheckInsDialog({
  user,
  isOpen,
  setIsOpen,
}: ListCheckInsDialogProps) {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [perPageIndex, setPerPageIndex] = useState(5);

  const [checkIns, setCheckIns] = useState<ListCheckInsResult | undefined>(
    undefined
  );

  function handlePagination(pageIndex: number) {
    setPageIndex(pageIndex + 1);
  }

  function handlePerPagePagination(perPage: number) {
    setPerPageIndex(perPage);
  }

  async function fetchCheckIns(page: number, perPage: number, userId: string) {
    const checkInsResponse = await listCheckInsByUser({
      page,
      perPage,
      userId,
    });

    setCheckIns(checkInsResponse);
  }

  useEffect(() => {
    fetchCheckIns(pageIndex, perPageIndex, user.id);
  }, [pageIndex, perPageIndex, user.id]);

  useEffect(() => {}, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check-ins de {user.name}</DialogTitle>
        </DialogHeader>
        {checkIns && (
          <DataTable columns={checkInByUserColumns} data={checkIns.checkIns} />
        )}
        {checkIns && (
          <Pagination
            onPageChange={handlePagination}
            onPerPageChange={handlePerPagePagination}
            perPageIndex={checkIns.perPage}
            pageIndex={checkIns.actualPage}
            perPage={checkIns.perPage}
            totalCount={checkIns.amount}
            totalPages={checkIns.totalPages}
            hasPerPage={false}
          />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Voltar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
