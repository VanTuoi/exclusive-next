import { PhoneOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const ItemPhone = memo(({ dataPhone }: { dataPhone?: string[] }) => {
  const t = useTranslations();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={3}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" gap={2}>
        <IconButton
          size="large"
          sx={(theme) => ({
            height: 40,
            width: 40,
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark
            }
          })}
        >
          <PhoneOutlined />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "16px" }}>
          {t("contact.info.phone.title")}
        </Typography>
      </Box>
      <Typography variant="h5">{t("contact.info.phone.content")}</Typography>
      {dataPhone?.map((item) => (
        <Typography key={item} variant="h5">
          {t("contact.info.phone.text")}: +{item}
        </Typography>
      ))}
    </Box>
  );
});
