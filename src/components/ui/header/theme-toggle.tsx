import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { memo } from "react";

import { useThemeStore } from "~/stores";

export const ThemeToggle = memo(() => {
  const { type, setType } = useThemeStore();

  const toggleTheme = () => {
    setType(type === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {type === "light" ? (
        <LightModeIcon sx={{ height: "20px", width: "20px" }} />
      ) : (
        <DarkModeIcon sx={{ height: "20px", width: "20px" }} />
      )}
    </IconButton>
  );
});
