/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSession } from "next-auth/react";

import { UserData } from "~/types/user";

export function filterUser(user: UserData): Omit<UserData, "password" | "refreshToken" | "isDeleted"> {
  // const { password: _password } = user;
  return user;
}

export async function getNextAuthToken(): Promise<string | null> {
  const session = await getSession();
  return session?.accessToken ?? null;
}
