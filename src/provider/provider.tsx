"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { CustomSnackbar, LoadingBar } from "~/components/ui";
import { useThemeStore } from "~/stores";
import theme from "~/theme";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  const { type } = useThemeStore();
  const muiTheme = useMemo(() => theme({ type }), [type]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <CustomSnackbar>
            <CssBaseline />
            {children}
            <Toaster position="bottom-left" />
            <LoadingBar />
          </CustomSnackbar>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
