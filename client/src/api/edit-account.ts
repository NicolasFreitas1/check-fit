import { api } from "@/lib/axios";

interface EditAccountRequest {
  userId: string;
  email: string;
  name: string;
}

export async function editAccount({ email, name, userId }: EditAccountRequest) {
  await api.put(`accounts/${userId}`, {
    name,
    email,
  });
}
