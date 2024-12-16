import { api } from "@/lib/axios";

interface MakeCheckInRequest {
  gymId: string;
}

export async function makeCheckIn({ gymId }: MakeCheckInRequest) {
  await api.post(`gyms/${gymId}/check-ins`);
}
