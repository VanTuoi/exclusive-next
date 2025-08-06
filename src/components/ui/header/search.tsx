"use client";

import Image from "next/image";
import Link from "next/link";

import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useDebounce, useProducts, useQueryConfig } from "~/hooks";

export const Search = memo(() => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const t = useTranslations("common.header");
  const queryConfig = useQueryConfig();
  const { dataProducts, handleGetProducts } = useProducts();

  const [searchTerm, setSearchTerm] = useState(queryConfig.name || "");
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      const newQueryConfig = {
        ...queryConfig,
        page: "1",
        name: searchTerm
      };
      handleGetProducts(newQueryConfig);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [debouncedSearchTerm]);

  if (isSmallScreen) {
    return (
      <IconButton color="default" aria-label="Search" onClick={() => router.push("/products")}>
        <SearchIcon />
      </IconButton>
    );
  }

  return (
    <Autocomplete
      id="search-autocomplete"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      options={dataProducts}
      getOptionLabel={(option) => option.title}
      noOptionsText={t("noResult")}
      disableClearable
      popupIcon={null}
      sx={{
        display: isSmallScreen ? "none" : "flex",
        width: 250,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        mx: 1.5,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          p: 0,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
            pt: "8px",
            pl: "12px"
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t("searchTitle")}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: "-30px" }}>
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            )
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id} style={{ listStyle: "none" }}>
          <Link
            href={`/product/${option.id}/${option.title}`}
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: theme.palette.common.black }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                color: theme.palette.text.primary,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              <Grid container alignItems="center" gap={1}>
                <Image
                  src={option.image[0].url}
                  alt={option.title}
                  width={50}
                  height={50}
                  style={{ borderRadius: 4 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.category}
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Link>
        </li>
      )}
    />
  );
});
