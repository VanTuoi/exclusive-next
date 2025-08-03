import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const CopyRight = memo(() => {
  const t = useTranslations("common");
  const theme = useTheme();

  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ height: "64px", paddingY: 3, width: "100%" }}>
      <Typography
        sx={{ padding: 0, textAlign: "center", width: "100%", color: theme.palette.common.white }}
        variant="h4"
      >
        &copy; {t("footer.copy", { currentYear })}
      </Typography>
    </Box>
  );
});
