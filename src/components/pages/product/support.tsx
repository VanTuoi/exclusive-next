import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { CustomLink } from "~/components/ui";

export const SupportProduct = memo(() => {
  const t = useTranslations();

  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      gap={1}
      sx={{ border: "1px solid", borderRadius: "4px", borderColor: theme.palette.grey[300] }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1} padding={1}>
        <LocalShippingOutlinedIcon />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "14px", lineHeight: "16px" }}>
            {t("productDetail.support.deliver.title")}:
          </Typography>
          <CustomLink
            href="#"
            variant="h5"
            maxLength={200}
            underline={true}
            underlineThickness={1}
            sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "14px" }}
          >
            {t("productDetail.support.deliver.content")}
          </CustomLink>
        </Box>
      </Box>
      <Divider orientation="horizontal" variant="fullWidth" flexItem />
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={1} padding={1}>
        <AssignmentReturnOutlinedIcon />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "14px", lineHeight: "16px" }}>
            {t("productDetail.support.return.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "14px", display: "inline-block" }}
          >
            {t("productDetail.support.return.content")}
          </Typography>
          <Typography>
            <CustomLink
              href="#"
              variant="h6"
              underline={true}
              underlineThickness={1}
              sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "14px" }}
            >
              {t("productDetail.support.return.details")}
            </CustomLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
