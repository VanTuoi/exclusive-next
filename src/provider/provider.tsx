"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";

import theme from "~/theme";

import { LoadingBar } from "~/components/ui";

import useThemeStore from "~/stores/theme";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  const { type } = useThemeStore();
  const muiTheme = useMemo(() => theme({ type }), [type]);

  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={muiTheme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {children}
            <Toaster position="bottom-left" />
            <LoadingBar />
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
