import { User } from "@/types";
import { MOCK_USER } from "@/lib/mockData";

export async function fetchCurrentUser(userId: string): Promise<User> {
  await new Promise((res) => setTimeout(res, 300));
  if (userId !== MOCK_USER.id) throw new Error("User not found.");
  return MOCK_USER;
}
