import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { memo } from "react";

import { default as useThemeStore } from "~/stores/theme";

export const ThemeToggle = memo(() => {
  const { type, setType } = useThemeStore();

  const toggleTheme = () => {
    setType(type === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {type === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
});
