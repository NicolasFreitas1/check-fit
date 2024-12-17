import { api } from "@/lib/axios";

interface EditGymRequest {
  gymId: string;
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
}

export async function editGym({
  description,
  latitude,
  longitude,
  name,
  phone,
  gymId,
}: EditGymRequest) {
  await api.put(`gyms/${gymId}`, {
    description,
    latitude,
    longitude,
    name,
    phone,
  });
}
