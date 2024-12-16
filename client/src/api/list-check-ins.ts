import { api } from "@/lib/axios";
import { CheckIn } from "@/types/check-in";

export interface ListCheckInsQuery {
  page?: number | null;
  perPage?: number | null;
}

export interface ListCheckInsResponse {
  checkIns: {
    id: string;
    gymId: string;
    userId: string;
    createdAt: string;
    gym: {
      id: string;
      name: string;
      description: string;
      phone: string;
      latitude: number;
      longitude: number;
      createdAt: string;
    };
  }[];
  amount: number;
  totalPages: number;
  actualPage: number;
  perPage: number;
}

export interface ListCheckInsResult {
  checkIns: CheckIn[];
  amount: number;
  totalPages: number;
  actualPage: number;
  perPage: number;
}

export async function listCheckIns({
  page,
  perPage,
}: ListCheckInsQuery): Promise<ListCheckInsResult> {
  const response = await api.get<ListCheckInsResponse>("accounts/check-ins", {
    params: { page, per_page: perPage },
  });

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
