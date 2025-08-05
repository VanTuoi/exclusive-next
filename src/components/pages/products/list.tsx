"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductComponent } from "~/components/ui/section";
import { useHome, useProducts, useQueryConfig } from "~/hooks";
import { ProductsQueryParams } from "~/types";
import { createSearchString } from "~/utils/query";

export const ListProducts = () => {
  const t = useTranslations("products");
  const locale = useLocale();
  const router = useRouter();
  const queryConfig = useQueryConfig();
  const { dataAllCategories } = useHome();
  const { dataProducts, metaData, handleGetProducts } = useProducts();

  const [searchTerm, setSearchTerm] = useState(queryConfig.name || "");
  const [selectedCategory, setSelectedCategory] = useState(queryConfig.category || "");

  const SORT_BY_OPTIONS: { value: ProductsQueryParams["sort_by"]; label: string }[] = [
    { value: "name", label: t("name") },
    { value: "price", label: t("price") }
  ];

  const ORDER_OPTIONS: { value: ProductsQueryParams["order"]; label: string }[] = [
    { value: "asc", label: t("asc") },
    { value: "desc", label: t("desc") }
  ];

  useEffect(() => {
    handleGetProducts(queryConfig);
  }, []);

  const handleSearch = () => {
    const newQueryConfig = {
      ...queryConfig,
      page: "1",
      name: searchTerm,
      category: selectedCategory
    };
    handleGetProducts(newQueryConfig);
    router.push(createSearchString(newQueryConfig));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedCategory(value);

    const newQueryConfig = {
      ...queryConfig,
      page: "1",
      name: searchTerm,
      category: value
    };

    handleGetProducts(newQueryConfig);
    router.push(createSearchString(newQueryConfig));
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    const newQueryConfig = {
      ...queryConfig,
      page: String(newPage)
    };
    handleGetProducts(newQueryConfig);
    router.push(createSearchString(newQueryConfig));
  };

  return (
    <Box width="100%" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box pb={3} display="flex" gap={2}>
        <TextField
          size="medium"
          placeholder={t("search_placeholder")}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { sm: "100%", md: "350px" },
            borderRadius: 3
          }}
          InputProps={{
            sx: {
              height: 40,
              borderRadius: 3
            }
          }}
        />

        <Button variant="contained" sx={{ borderRadius: 3, width: "100px" }} onClick={handleSearch}>
          {t("search")}
        </Button>
      </Box>

      <Box mb={4} display="flex" gap={2} width="100%" justifyContent="space-between" flexWrap="wrap">
        <Select
          size="small"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{ minWidth: 200, borderRadius: 2 }}
        >
          <MenuItem value="">{t("all_categories")}</MenuItem>
          {dataAllCategories.map((cat) => (
            <MenuItem key={cat.url} value={cat.url}>
              {cat.name[locale as keyof typeof cat.name] || cat.name.en}
            </MenuItem>
          ))}
        </Select>

        <Stack direction={"row"} spacing={1}>
          <Select
            size="small"
            value={queryConfig.sort_by || ""}
            onChange={(e) => {
              const newQueryConfig = {
                ...queryConfig,
                sort_by: e.target.value as ProductsQueryParams["sort_by"],
                page: "1"
              };
              handleGetProducts(newQueryConfig);
              router.push(createSearchString(newQueryConfig));
            }}
            displayEmpty
            sx={{ minWidth: 200, borderRadius: 2 }}
          >
            <MenuItem value="">{t("sort_by")}</MenuItem>
            {SORT_BY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={queryConfig.order || ""}
            onChange={(e) => {
              const newQueryConfig = {
                ...queryConfig,
                order: e.target.value as ProductsQueryParams["order"],
                page: "1"
              };
              handleGetProducts(newQueryConfig);
              router.push(createSearchString(newQueryConfig));
            }}
            displayEmpty
            sx={{ minWidth: 150, borderRadius: 2 }}
          >
            <MenuItem value="">{t("order")}</MenuItem>
            {ORDER_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
        {dataProducts.map((product) => (
          <Card key={product.id} elevation={2} sx={{ width: 250, height: 350 }}>
            <CardContent>
              <ProductComponent product={product} />
            </CardContent>
          </Card>
        ))}
      </Box>

      {metaData && metaData.pages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={metaData.pages}
            page={Number(metaData.page)}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
