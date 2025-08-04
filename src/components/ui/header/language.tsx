"use client";
import { useSearchParams } from "next/navigation";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import React, { memo, useState } from "react";

import { usePathname, useRouter } from "~/i18n/navigation";

import { ThemeToggle } from "./theme-toggle";

const LANGUAGES = [
  {
    key: "en",
    translationKey: "language.english"
  },
  {
    key: "vi",
    translationKey: "language.vietnamese"
  },
  {
    key: "ja",
    translationKey: "language.japanese"
  },
  { key: "zh", translationKey: "language.chinese" }
];

export const LanguageSelect = memo(() => {
  const theme = useTheme();
  const t = useTranslations("common.header");
  const tLang = useTranslations("common.header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLocaleChange = (newLocale: string) => {
    handleClose();
    router.push({ pathname, query: Object.fromEntries(searchParams.entries()) }, { locale: newLocale });
  };

  return (
    <Box
      sx={{
        color: theme.palette.common.white,
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center"
      }}
    >
      <ThemeToggle />
      <Tooltip title={t("selectLanguage")}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleOpen}>
          <Typography>{tLang(LANGUAGES.find((l) => l.key === locale)?.translationKey || "")}</Typography>
          <IconButton sx={{ p: 0, ml: 0.5 }} onClick={handleOpen} aria-label="Toggle dropdown change language">
            <KeyboardArrowDownIcon sx={{ color: theme.palette.common.white }} fontSize="small" />
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            color: "white",
            mt: 1
          }
        }}
      >
        {LANGUAGES.map((item) => (
          <MenuItem
            key={item.key}
            selected={item.key === locale}
            onClick={() => handleLocaleChange(item.key)}
            sx={{
              justifyContent: "center",
              color: theme.palette.common.white,
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.1)"
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)"
              }
            }}
          >
            <Typography variant="body2" sx={{ color: "inherit" }}>
              {tLang(item.translationKey)}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
});
