import { Box, Typography } from "@mui/material";
import { memo } from "react";

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography sx={{ padding: 1, fontWeight: 600, fontSize: 16, textAlign: "center", width: "100%" }}>
        &copy;{currentYear} F2 elearning
      </Typography>
    </Box>
  );
});
