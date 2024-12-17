import { api } from "@/lib/axios";

interface DeleteGymRequest {
  gymId: string;
}

export async function deleteGym({ gymId }: DeleteGymRequest) {
  await api.delete(`gyms/${gymId}`);
}
