import { listGyms, ListGymsResponse } from "@/api/list-gyms";
import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { gymColumns } from "./gym-columns";
import { GymTableFilter } from "./gym-table-filter";

export function Gyms() {
  const [searchParams, setSearchParams] = useSearchParams();

  const gymName = searchParams.get("gymName");

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);

  const [gyms, setGyms] = useState<ListGymsResponse | undefined>(undefined);

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  async function fetchGyms(
    gymNameFilter: string | null | undefined,
    page: number
  ) {
    const gymsResponse = await listGyms({
      gymName: gymNameFilter,
      page,
      perPage: 8,
    });

    setGyms(gymsResponse);
  }

  useEffect(() => {
    fetchGyms(gymName, pageIndex);
  }, [gymName, pageIndex]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Academias</h1>
        <div className="space-y-2.5">
          <GymTableFilter />
          <div className="border rounded-md">
            {gyms && <DataTable columns={gymColumns} data={gyms.gyms} />}
          </div>
          {gyms && (
            <Pagination
              onPageChange={handlePagination}
              pageIndex={gyms.actualPage}
              perPage={gyms.perPage}
              totalCount={gyms.amount}
              totalPages={gyms.totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}
