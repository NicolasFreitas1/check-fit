import { User } from "@/context/AuthContext";
import { api } from "@/lib/axios";

export interface ListUsersQuery {
  page?: number | null;
  perPage?: number | null;
  userName?: string | null;
}

export interface ListUsersResponse {
  users: User[];
  amount: number;
  totalPages: number;
  actualPage: number;
  perPage: number;
}

export async function listUsers({ userName, page, perPage }: ListUsersQuery) {
  const { data } = await api.get<ListUsersResponse>("users", {
    params: {
      page,
      per_page: perPage,
      userName,
    },
  });

  return data;
}
