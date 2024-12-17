import { listGyms, ListGymsResponse } from "@/api/list-gyms";
import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { adminGymColumns } from "./admin-gym-columns";
import { GymTableFilter } from "@/components/gym-table-filter";
import { Button } from "@/components/ui/button";

export function AdminGyms() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const gymName = searchParams.get("gymName");

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 20);

  const [gyms, setGyms] = useState<ListGymsResponse | undefined>(undefined);

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

  async function fetchGyms(
    gymNameFilter: string | null | undefined,
    page: number,
    perPage: number
  ) {
    const gymsResponse = await listGyms({
      gymName: gymNameFilter,
      page,
      perPage,
    });

    setGyms(gymsResponse);
  }

  useEffect(() => {
    fetchGyms(gymName, pageIndex, perPageIndex);
  }, [gymName, pageIndex, perPageIndex]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Academias</h1>
        <div className="space-y-2.5">
          <div className="flex justify-between">
            <GymTableFilter />
            <Button
              className="text-bold text-white"
              onClick={() =>
                navigate("/admin/gyms/register", { replace: true })
              }
            >
              Cadastrar academia
            </Button>
          </div>
          <div className="overflow-hidden">
            {gyms && <DataTable columns={adminGymColumns} data={gyms.gyms} />}
          </div>
          {gyms && (
            <Pagination
              onPageChange={handlePagination}
              onPerPageChange={handlePerPagePagination}
              pageIndex={gyms.actualPage}
              perPageIndex={gyms.perPage}
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
