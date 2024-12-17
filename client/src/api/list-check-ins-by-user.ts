import { api } from "@/lib/axios";
import { ListCheckInsResponse } from "./list-check-ins";

export interface ListCheckInsByUserQuery {
  userId: string;
  page?: number | null;
  perPage?: number | null;
}

export async function listCheckInsByUser({
  userId,
  page,
  perPage,
}: ListCheckInsByUserQuery) {
  const response = await api.get<ListCheckInsResponse>(
    `accounts/${userId}/check-ins`,
    {
      params: { page, per_page: perPage },
    }
  );

  const checkInsDetails = {
    ...response.data,
    checkIns: response.data.checkIns.map((checkIn) => {
      return {
        id: checkIn.id,
        gymId: checkIn.gymId,
        userId: checkIn.userId,
        createdAt: checkIn.createdAt,
        gymName: checkIn.gym.name,
        gymDescription: checkIn.gym.description,
        gymPhone: checkIn.gym.phone,
        gymLatitude: checkIn.gym.latitude,
        gymLongitude: checkIn.gym.longitude,
        gymCreatedAt: checkIn.gym.createdAt,
      };
    }),
  };

  return checkInsDetails;
}
