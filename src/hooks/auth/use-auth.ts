"use client";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "~/services";
import { useAuthStore } from "~/stores";
import { UserDataRegister } from "~/types";
import { useCustomSnackbar } from "../use-toast";

export function useAuth() {
  const { setInfo, setToken } = useAuthStore();
  const { showSnackbar } = useCustomSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCallBack = searchParams.get("urlCallBack");
  const t = useTranslations();

  const getAuthApi = authApi("public");
  const getAuthApiServer = authApi("private");

  const handleLogin = async (emailAddress: string, currentPassword: string) => {
    try {
      const res = await getAuthApi.login({ emailAddress, currentPassword });

      if (res.data.success) {
        setToken(res.data.data.accessToken);
        localStorage.setItem("isLogin", "true");
        showSnackbar(t("loginPage.loginSuccess"), "success");
        router.push(typeof urlCallBack === "string" ? urlCallBack : "/");
      } else {
        showSnackbar(t("loginPage.unknownError"), "error");
        return null;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data?.message;
      }
      return t("loginPage.unknownError");
    }
  };

  const handleLoginWithGoogle = async (accessToken: string) => {
    try {
      const res = await getAuthApi.loginWithGoogle(accessToken);
      if (res.data.success) {
        localStorage.setItem("isLogin", "true");
        setToken(res.data.data.accessToken);
        showSnackbar(t("loginPage.loginGoogleSuccess"), "success");
        router.push(typeof urlCallBack === "string" ? urlCallBack : "/");
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data?.message;
      }
      return t("loginPage.unknownError");
    }
  };

  const handleRegister = async (userData: UserDataRegister) => {
    try {
      const res = await getAuthApiServer.register(userData);

      if (res.data.success) {
        showSnackbar(t("signUpPage.registerSuccess"), "success");
        router.push("/auth/login");
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data?.message;
      }
      return t("loginPage.unknownError");
    }
  };

  const handleLogout = async () => {
    try {
      await getAuthApi.logout();
      setInfo(null);
      setToken(null);
      localStorage.removeItem("isLogin");
      showSnackbar(t("signUpPage.logoutSuccess"), "success");
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showSnackbar(errorMessage || t("loginPage.unknownError"), "error");
      } else {
        showSnackbar(t("loginPage.unknownError"), "error");
      }
    }
  };

  return { handleLogin, handleLoginWithGoogle, handleRegister, handleLogout };
}
