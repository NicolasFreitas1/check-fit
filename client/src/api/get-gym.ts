import { api } from "@/lib/axios";
import { Gym } from "@/types/gym";

interface GetGymRequest {
  gymId: string;
}

interface GetGymResponse {
  gym: Gym;
}

export async function getGym({ gymId }: GetGymRequest) {
  const response = await api.get<GetGymResponse>(`gyms/${gymId}`);

  return response.data.gym;
}
