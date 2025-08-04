"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

import { Cart } from "./cart";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Search } from "./search";
import { TopHeader } from "./top";
import { User } from "./user";
import { WishList } from "./wish-list";

export const Header = memo(() => {
  const theme = useTheme();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      <TopHeader />
      <Box
        maxWidth={"lg"}
        sx={{
          marginTop: isSmallDisplay ? 1 : 5,
          marginBottom: 1,
          paddingX: "4px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center"
        }}
      >
        <Logo color={theme.palette.mode === "light" ? "black" : "white"} />
        <Nav />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1
          }}
        >
          <Search />
          <WishList />
          <Cart />
          <User />
        </Box>
      </Box>
    </Box>
  );
});
