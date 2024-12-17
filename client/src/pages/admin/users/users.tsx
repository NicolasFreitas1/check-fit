import { listUsers, ListUsersResponse } from "@/api/list-users";
import { Pagination } from "@/components/pagination";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { userColumns } from "./user-columns";
import { UserTableFilter } from "./user-table-filter";

export function Users() {
  const [searchParams, setSearchParams] = useSearchParams();

  const userName = searchParams.get("userName");

  const pageIndex = z.coerce.number().parse(searchParams.get("page") ?? 1);
  const perPageIndex = z.coerce
    .number()
    .parse(searchParams.get("per_page") ?? 20);

  const [users, setUsers] = useState<ListUsersResponse | undefined>(undefined);

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

  async function fetchUsers(
    userNameFilter: string | null | undefined,
    page: number,
    perPage: number
  ) {
    const usersResponse = await listUsers({
      userName: userNameFilter,
      page,
      perPage,
    });

    setUsers(usersResponse);
  }

  useEffect(() => {
    fetchUsers(userName, pageIndex, perPageIndex);
  }, [userName, pageIndex, perPageIndex]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <div className="space-y-2.5">
          <UserTableFilter />
          <div className="overflow-hidden">
            {users && <DataTable columns={userColumns} data={users.users} />}
          </div>
          {users && (
            <Pagination
              onPageChange={handlePagination}
              onPerPageChange={handlePerPagePagination}
              pageIndex={users.actualPage}
              perPageIndex={users.perPage}
              perPage={users.perPage}
              totalCount={users.amount}
              totalPages={users.totalPages}
              hasPerPage
            />
          )}
        </div>
      </div>
    </>
  );
}
