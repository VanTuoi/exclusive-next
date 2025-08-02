"use client";
import { Box, Container, Toolbar, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { ReactNode } from "react";

import { Footer, Header } from "~/components/ui";

const APP_BAR_HEIGHT_DESKTOP = 75;
const APP_BAR_HEIGHT_MOBILE = 50;

interface RootLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: RootLayoutProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: theme.palette.background.default }}>
      <AppBar
        enableColorOnDark
        elevation={1}
        color="inherit"
        position="fixed"
        sx={{
          height: {
            md: APP_BAR_HEIGHT_DESKTOP,
            sm: APP_BAR_HEIGHT_MOBILE
          },
          transition: theme.transitions.create(["height", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          bgcolor: theme.palette.background.paper
        }}
      >
        <Toolbar>
          <Container maxWidth="lg">
            <Header />
          </Container>
        </Toolbar>
      </AppBar>
      <Container
        component={"main"}
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          marginTop: {
            md: `${APP_BAR_HEIGHT_DESKTOP}px`,
            sm: `${APP_BAR_HEIGHT_MOBILE}px`
          },
          p: 0,
          width: "100%",
          minHeight: "80vh"
        }}
      >
        {children}
      </Container>
      <Box sx={{ backgroundColor: theme.palette.secondary.light, color: theme.palette.grey[50] }}>
        <Footer />
      </Box>
    </Box>
  );
}
