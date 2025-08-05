"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { CustomSnackbar, LoadingBar } from "~/components/ui";
import { useThemeStore } from "~/stores";
import theme from "~/theme";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  const { type } = useThemeStore();
  const locale = useLocale();
  const muiTheme = useMemo(() => theme({ type, locale }), [type, locale]);

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
