import { ResponseData } from "~/types";

import { UserData, UserInput } from "~/types/user";

import { getApi } from "~/utils/api-selector";

export const usersApi = (type: "public" | "private" = "public") => {
  const api = getApi(type);

  return {
    getUsers: (params?: { search?: string }) => api.get<ResponseData<UserData[]>>("/users", { params }),

    getUser: (id: string) => api.get<ResponseData<UserData>>(`/users/${id}`),

    createUser: (user: Partial<UserInput>) => api.post<ResponseData<UserData>>("/users", user),

    updateUser: (id: string, user: Partial<UserInput>) => api.put<ResponseData<UserData>>(`/users/${id}`, user),

    deleteUser: (id: string) => api.delete<ResponseData<null>>(`/users/${id}`)
  };
};
