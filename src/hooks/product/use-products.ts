"use client";
import { AxiosError } from "axios";
import { useState } from "react";

import { productApi } from "~/services";
import { PaginationMeta, Product } from "~/types";

import { QueryConfig } from "../use-query-config";
import { useCustomSnackbar } from "../use-toast";

export function useProducts() {
  const { showSnackbar } = useCustomSnackbar();

  const getProductApi = productApi("public");

  const [dataProducts, setDataProducts] = useState<[Product] | []>([]);
  const [metaData, setMetaData] = useState<PaginationMeta | undefined>(undefined);

  const handleGetProducts = async (query: QueryConfig) => {
    try {
      const response = await getProductApi.getAllProducts(query);

      setDataProducts(response.data.data);
      setMetaData(response.data.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showSnackbar(errorMessage, "error");
      }
      showSnackbar("Unknown error occurred", "error");
    }
  };

  return {
    metaData,
    dataProducts,
    handleGetProducts
  };
}
