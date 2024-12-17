import { listCheckIns, ListCheckInsResult } from "@/api/list-check-ins";
import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { checkInColumns } from "./check-ins-columns";

export function CheckIns() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 20);

  const [checkIns, setCheckIns] = useState<ListCheckInsResult | undefined>(
    undefined
  );

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  function handlePerPagePagination(perPage: number) {
    setSearchParams((state) => {
      state.set("per_page", perPage.toString());
      return state;
    });
  }

  async function fetchCheckIns(page: number, perPage: number) {
    const checkInsResponse = await listCheckIns({
      page,
      perPage,
    });

    setCheckIns(checkInsResponse);
  }

  useEffect(() => {
    fetchCheckIns(pageIndex, perPageIndex);
  }, [pageIndex, perPageIndex]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Check-ins</h1>
        <div className="space-y-2.5">
          <div className="border rounded-md">
            {checkIns && (
              <DataTable columns={checkInColumns} data={checkIns.checkIns} />
            )}
          </div>
          {checkIns && (
            <Pagination
              onPageChange={handlePagination}
              onPerPageChange={handlePerPagePagination}
              perPageIndex={checkIns.perPage}
              pageIndex={checkIns.actualPage}
              perPage={checkIns.perPage}
              totalCount={checkIns.amount}
              totalPages={checkIns.totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}
