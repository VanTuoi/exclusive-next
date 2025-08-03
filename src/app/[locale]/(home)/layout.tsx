"use client";
import { Box, Container, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { ReactNode } from "react";

import { Footer, Header } from "~/components/ui";
import { ScrollToTopButton } from "~/components/ui/buttons/scroll-to-top";
import { AddToCart, ViewMore } from "~/components/ui/section/dialog";

export default function MainLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: theme.palette.background.default }}>
      <AppBar
        enableColorOnDark
        elevation={1}
        color="inherit"
        position="static"
        sx={{
          bgcolor: theme.palette.background.paper
        }}
      >
        <Header />
      </AppBar>
      <Container
        disableGutters
        component={"main"}
        sx={{
          mt: 1,
          paddingX: "4px",
          overflowX: "hidden",
          minHeight: "100vh"
        }}
      >
        {children}
      </Container>
      <Footer />
      <ViewMore />
      <AddToCart />
      <ScrollToTopButton />
    </Box>
  );
}
