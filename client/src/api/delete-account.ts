import { api } from "@/lib/axios";

export async function deleteAccount() {
  await api.delete("accounts");
}
