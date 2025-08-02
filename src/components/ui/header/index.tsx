import { Box } from "@mui/material";
import { memo } from "react";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { User } from "./user";

export const Header = memo(() => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
      }}
    >
      <Logo />
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <ThemeToggle />
        <User />
      </Box>
    </Box>
  );
});
