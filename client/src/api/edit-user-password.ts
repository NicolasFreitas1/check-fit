import { api } from "@/lib/axios";

interface EditUserPasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export async function editUserPassword({
  newPassword,
  oldPassword,
  userId,
}: EditUserPasswordRequest) {
  await api.patch(`accounts/${userId}/password`, {
    oldPassword,
    newPassword,
  });
}
