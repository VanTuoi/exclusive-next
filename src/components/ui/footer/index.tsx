import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { JSX, memo } from "react";

import { useHome } from "~/hooks";

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "~/assets/icons";

import { Logo } from "../header/logo";

import { CopyRight } from "./copy-right";
import { SendMailComponent } from "./send-mail";

type FooterItem = {
  name: string;
  url: string;
};

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  Facebook: <FacebookIcon />,
  Twitter: <TwitterIcon />,
  Instagram: <InstagramIcon />,
  Linkedin: <LinkedinIcon />
};

export const Footer = memo(() => {
  const t = useTranslations("common");
  const { dataSupport, dataSocial } = useHome();
  const FOOTER_ITEMS = t.raw("footer.sections") as { title: string; items: FooterItem[] }[];

  const handleClick = (url: string) => window.open(url, "_blank");

  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: "6px", md: 5, lg: 0 },
        color: "white",
        bgcolor: "black"
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            pt: 10
          }}
          gap={3}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            <Logo justifyContent="flex-start" />
            <Typography variant="h3" sx={{ color: "white" }}>
              {t("footer.subscribe")}
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h4" sx={{ color: "white" }}>
                {t("footer.sale")}
              </Typography>
              <SendMailComponent />
            </Box>
          </Box>

          {dataSupport.length > 0 && (
            <FooterColumn
              title={t("footer.support")}
              items={dataSupport.map((item: { name?: string; title?: string; url?: string; value?: string }) => ({
                name: item.value || "",
                url: item.url || item.value || ""
              }))}
            />
          )}

          {FOOTER_ITEMS.map((column, idx) => (
            <FooterColumn key={idx} title={column.title} items={column.items} />
          ))}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <Typography variant="h3" sx={{ color: "white" }}>
              {t("footer.downloadApp.title")}
            </Typography>
            <Typography variant="h5" sx={{ color: "white" }}>
              {t("footer.downloadApp.content")}
            </Typography>
            <Box display="flex" gap={2}>
              <Image src="/assets/imgs/qr-code.webp" width={80} height={80} alt="qrcode" />
              <Box display="flex" flexDirection="column" gap={1}>
                <Image src="/assets/imgs/google-play.webp" width={110} height={40} alt="Google Play" />
                <Image src="/assets/imgs/app-store.webp" width={110} height={40} alt="App Store" />
              </Box>
            </Box>
            <Box display="flex" gap={3} mt={2}>
              {dataSocial?.map(({ title, value }) => (
                <Box key={title} onClick={() => handleClick(value)} sx={{ cursor: "pointer" }}>
                  {SOCIAL_ICONS[title] || null}
                </Box>
              ))}
            </Box>
          </Box>

          <CopyRight />
        </Box>
      </Container>
    </Box>
  );
});

const FooterColumn: React.FC<{ title: string; items: FooterItem[] }> = ({ title, items }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 175
      }}
    >
      <Typography variant="h3" sx={{ color: "white" }}>
        {title}
      </Typography>
      {items.map(({ name, url }, idx) => (
        <Typography key={idx} variant="h4" onClick={() => router.push(url)} sx={{ cursor: "pointer", color: "white" }}>
          {name}
        </Typography>
      ))}
    </Box>
  );
};
