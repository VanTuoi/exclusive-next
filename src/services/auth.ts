import { LoginData, ResponseData, UserData } from "~/types";
import { getApi } from "~/utils";

export const authApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    login: (user: Partial<UserData>) => api.post<ResponseData<LoginData>>("/login", user),
    register: (user: Partial<UserData>) => api.post<ResponseData<UserData>>("/register", user),
    logout: () => api.post<ResponseData<null>>("/logout")
  };
};
