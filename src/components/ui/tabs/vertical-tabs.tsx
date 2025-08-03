"use client";

import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SubTab {
  label: string;
  path: string;
}

interface NestedTab {
  section: string;
  items: SubTab[];
}

interface Props {
  tabs: NestedTab[];
  children: React.ReactNode;
}

export function VerticalTabs({ tabs, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isActive = (path: string) => pathname === `/${locale}${path}`;

  return (
    <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 4 }}>
      <Box sx={{ width: 300 }}>
        {tabs.map((group, i) => (
          <Box key={i} mb={3}>
            <Typography variant="h5" gutterBottom>
              {group.section}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {group.items.map((item, j) => (
                <Button
                  key={j}
                  onClick={() => router.push(`/${locale}${item.path}`)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: isActive(item.path) ? "bold" : "normal",
                    color: isActive(item.path) ? "primary.main" : "text.primary",
                    backgroundColor: isActive(item.path) ? "action.hover" : "transparent",
                    pl: 2
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}
