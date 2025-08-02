import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersApi } from "~/services";
import { UserData, UserInput } from "~/types";

export const useGetUsers = (params?: { search?: string }) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      try {
        const res = await usersApi("private").getUsers(params);
        return res.data.data || [];
      } catch (err) {
        toast.error("Lỗi khi lấy danh sách người dùng");
        throw err;
      }
    },
    staleTime: 1000
  });

  return {
    data: data || [],
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useGetUserById = (id?: string) => {
  const {
    data,
    isFetching: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async (): Promise<UserData | null> => {
      if (!id) return null;
      const res = await usersApi("private").getUser(id);
      return res.data.data ?? null;
    },
    enabled: !!id,
    staleTime: 1000
  });

  return {
    data,
    loading,
    error: error as Error | null,
    refetch
  };
};

export const useCreateUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isPending: loading,
    error
  } = useMutation({
    mutationFn: async (userData: Partial<UserInput>): Promise<UserData | null> => {
      const res = await usersApi("private").createUser(userData);
      return res.data.data;
    },
    onSuccess: (newUser) => {
      if (newUser) {
        onSuccessCallback?.();
        toast.success(`Đã tạo người dùng ${newUser.name}`);
        queryClient.setQueryData<UserData[]>(["users"], (oldData) => (oldData ? [...oldData, newUser] : [newUser]));
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => {
      console.error("Error creating user:", err);
      toast.error("Lỗi khi tạo người dùng");
    }
  });

  const data = queryClient.getQueryData<UserData[]>(["users"]);

  return {
    data,
    createUser,
    loading,
    error: error as Error | null
  };
};

export const useUpdateUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: loading,
    error
  } = useMutation({
    mutationFn: async ({ id, userData }: { id: string; userData: Partial<UserInput> }): Promise<void> => {
      await usersApi("private").updateUser(id, userData);
    },
    onSuccess: (_data, { userData }) => {
      toast.success(`Đã cập nhật người dùng ${userData.name}`);
      onSuccessCallback?.();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Error updating user:", err);
      toast.error("Lỗi khi cập nhật người dùng");
    }
  });

  return {
    updateUser,
    loading,
    error: error as Error | null
  };
};

export const useDeleteUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending: loading,
    error
  } = useMutation({
    mutationFn: async (user: UserData): Promise<void> => {
      await usersApi("private").deleteUser(user.id);
    },
    onSuccess: (_data, user) => {
      toast.success(`Đã xóa người dùng ${user.name}`);
      onSuccessCallback?.();
      queryClient.setQueryData<UserData[]>(["users"], (oldData) => oldData?.filter((item) => item.id !== user.id));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.error("Error deleting user:", err);
      toast.error("Lỗi khi xóa người dùng");
    }
  });

  return {
    deleteUser,
    loading,
    error: error as Error | null
  };
};
