"use client";
import { AxiosError } from "axios";
import { useState } from "react";

import { userApi } from "~/services";
import { UpdateUserData } from "~/types";

import { useTranslations } from "next-intl";
import { useCustomSnackbar } from "../use-toast";

export function useUpdateInfo() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showSnackbar } = useCustomSnackbar();

  const getUserApi = userApi("public");

  const handleUpdateInfo = async (updateUserData: UpdateUserData) => {
    setIsLoading(true);

    try {
      await getUserApi.changeInfo(updateUserData);

      showSnackbar(t("profile.form.submit"), "success");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;

        showSnackbar(errorMessage, "error");
        return errorMessage;
      }
      showSnackbar(t("loginPage.unknownError"), "error");
      return "Unknown error occurred";
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleUpdateInfo };
}
