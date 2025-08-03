import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, Grid, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";

import { useSearch } from "~/hooks";

export const Search = memo(() => {
  const { dataProductByName, handleGetProductByName } = useSearch();
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const t = useTranslations("common.header");

  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleGetProductByName(e.target.value);
    setOpen(true);
  };

  return (
    <Autocomplete
      id="search-autocomplete"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      options={dataProductByName}
      getOptionLabel={(option) => option.title}
      noOptionsText={t("noResult")}
      sx={{
        display: isSmallScreen ? "none" : "flex",
        width: 243,
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
          onChange={handleInputChange}
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
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <Box
            key={key}
            component="li"
            {...restProps}
            sx={{
              p: 1,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.action.hover
              }
            }}
            onClick={() => {
              router.push(`/${option.category}/${option.id}/${option.title}`);
              setOpen(false);
            }}
          >
            <Grid container alignItems="center" gap={1}>
              <Image src={option.image[0].url} alt={option.title} width={50} height={50} style={{ borderRadius: 4 }} />
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
        );
      }}
    />
  );
});
