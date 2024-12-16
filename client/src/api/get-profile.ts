import { User } from "@/context/AuthContext";
import { api } from "@/lib/axios";

export interface GetProfileResponse {
  user: User;
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("accounts/me");

  return response.data;
}
