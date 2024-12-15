import { api } from "@/lib/axios";
import { Gym } from "@/types/gym";

export interface ListGymsQuery {
  page?: number | null;
  perPage?: number | null;
  gymName?: string | null;
}

export interface ListGymsResponse {
  gyms: Gym[];
  amount: number;
  totalPages: number;
  actualPage: number;
  perPage: number;
}

export async function listGyms({ gymName, page, perPage }: ListGymsQuery) {
  const { data } = await api.get<ListGymsResponse>("gyms", {
    params: {
      page,
      per_page: perPage,
      gymName,
    },
  });

  return data;
}
