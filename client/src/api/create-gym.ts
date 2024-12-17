import { api } from "@/lib/axios";

interface CreateGymRequest {
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
}

export async function createGym({
  description,
  latitude,
  longitude,
  name,
  phone,
}: CreateGymRequest) {
  await api.post("gyms", { description, latitude, longitude, name, phone });
}
