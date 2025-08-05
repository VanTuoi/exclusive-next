"use client";
import { AxiosError } from "axios";
import { useState } from "react";

import { Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useSearch() {
  const { showSnackbar } = useCustomSnackbar();

  const [dataProductByName, setDataProductByName] = useState<[Product] | []>([]);

  const handleGetProductByName = async (name: string = "") => {
    try {
      if (!name || name === "") {
        setDataProductByName([]);
        return;
      }

      setDataProductByName([]);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showSnackbar(errorMessage, "error");
      }
      showSnackbar("Unknown error occurred", "error");
    }
  };

  return {
    dataProductByName,
    handleGetProductByName
  };
}
