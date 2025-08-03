import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { memo, ReactNode } from "react";

interface SupportItemProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export const SupportItem = memo(({ icon, title, content }: SupportItemProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      borderRadius={2}
      border={`1px solid ${theme.palette.grey[400]}`}
      sx={{
        width: 270,
        height: 230,
        transition: "0.3s",
        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.common.white,
          "& svg, & svg h": {
            color: theme.palette.primary.main
          }
        }
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        p={2}
        sx={{
          backgroundColor: alpha(theme.palette.grey[100], 1),
          "& > *": {
            width: 40,
            height: 40
          }
        }}
      >
        {icon}
      </Box>
      <Stack p={1} spacing={1}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" sx={{ color: "inherit" }}>
          {title}
        </Typography>
        <Typography variant="body2" textAlign="center" sx={{ color: "inherit" }}>
          {content}
        </Typography>
      </Stack>
    </Box>
  );
});
