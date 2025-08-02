"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

import { authApi } from "~/services";
import { ResponseData, UserData } from "~/types";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = (onSuccessCallback?: () => void) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setErrorMessage(null);

    const res = await signIn("credentials", {
      ...credentials,
      redirect: false
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Đăng nhập thành công");
      router.push("/");
      onSuccessCallback?.();
    } else {
      setErrorMessage("Sai tài khoản hoặc mật khẩu");
      toast.error("Đăng nhập thất bại");
    }
  };

  return {
    login,
    loading,
    errorMessage
  };
};

export const useRegister = (onSuccessCallback?: () => void) => {
  const {
    mutate: register,
    isPending,
    data: mutationData,
    error
  } = useMutation({
    mutationFn: async (
      userData: Omit<UserData, "id" | "email_verified_at" | "created_at" | "updated_at">
    ): Promise<UserData | null> => {
      const res = await authApi("public").register(userData);
      return res.data.data;
    },
    onSuccess: () => {
      onSuccessCallback?.();
      toast.success("Đã tạo tài khoản thành công");
    },
    onError: (err) => {
      const apiError = err as unknown as ResponseData<null>;
      toast.error(apiError.message || "Lỗi khi tạo tài khoản");
    }
  });

  return {
    data: mutationData,
    register,
    loading: isPending,
    error: error as ResponseData<null> | null
  };
};

export const useLogout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return { handleLogout };
};
