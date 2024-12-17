import { api } from "@/lib/axios";

interface DeleteCheckInRequest {
  checkInId: string;
}

export async function deleteCheckIn({ checkInId }: DeleteCheckInRequest) {
  await api.delete(`check-ins/${checkInId}`);
}
