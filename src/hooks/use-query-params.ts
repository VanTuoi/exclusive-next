"use client";

import { useSearchParams } from "next/navigation";
import { QueryConfig } from "./use-query-config";

export const useQueryParams = (): QueryConfig => {
  const params = useSearchParams();

  return {
    page: params.get("page") || undefined,
    limit: params.get("limit") || undefined,
    sort_by: params.get("sort_by") || undefined,
    order: params.get("order") || undefined,
    name: params.get("name") || undefined,
    price_min: params.get("price_min") || undefined,
    price_max: params.get("price_max") || undefined,
    rating_filter: params.get("rating_filter") || undefined,
    exclude: params.get("exclude") || undefined,
    category: params.get("category") || undefined
  };
};
