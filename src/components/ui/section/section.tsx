/* eslint-disable @typescript-eslint/no-explicit-any */
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTranslations } from "next-intl";
import { Children, cloneElement, isValidElement, memo, ReactElement, ReactNode } from "react";

import { PromotionPeriod } from "./promotion-period";

interface SectionProps {
  title: string;
  content?: string | null;
  timePromotion?: string | null;
  multiRow?: number;
  nextItem?: boolean;
  viewAll?: "top-right" | "bottom" | "none";
  variantButton?: "contained" | "outlined" | "text";
  handleViewAll?: () => void;
  handleChangeStep?: ({ step }: { step: "next" | "previous" }) => void;
  children: ReactNode;
}

export const Section = memo(
  ({
    title,
    content = null,
    timePromotion = null,
    multiRow = 1,
    nextItem = false,
    viewAll = "none",
    variantButton = "contained",
    handleChangeStep,
    handleViewAll,
    children
  }: SectionProps) => {
    const theme = useTheme();

    const t = useTranslations();

    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

    const childrenWithProps = Children.map(children, (child) => {
      if (
        isValidElement(child) &&
        typeof child.type !== "string" &&
        (child.type as any).displayName === "SliderProducts"
      ) {
        return cloneElement(child as ReactElement<any>, {
          multirow: multiRow,
          handleChangeStep
        });
      }
      return child;
    });

    return (
      <Box>
        <Stack direction={"column"} alignItems={"flex-start"} gap={2}>
          <Stack spacing={2} direction={"row"} alignItems={"center"} sx={{ color: theme.palette.secondary.main }}>
            <Box
              sx={{
                height: "40px",
                width: "20px",
                borderRadius: "4px",
                backgroundColor: theme.palette.secondary.main
              }}
            ></Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
              {title}
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between"
            }}
          >
            {(content || timePromotion) && (
              <Stack
                spacing={{
                  xs: 3,
                  md: 5,
                  lg: 10
                }}
                direction={{
                  xs: "column-reverse",
                  md: "row"
                }}
                alignItems={{
                  xs: "flex-start",
                  md: "flex-end"
                }}
              >
                {content && (
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "18px",
                        md: "28px"
                      },
                      lineHeight: {
                        xs: "18px",
                        md: "36px"
                      },
                      fontWeight: 600,
                      fontFamily: "Inter",
                      letterSpacing: "0.04em"
                    }}
                  >
                    {content}
                  </Typography>
                )}
                {timePromotion && <PromotionPeriod time={timePromotion} type="outlined" />}
              </Stack>
            )}
            {nextItem ? (
              <Stack direction={"row"} gap={1}>
                <IconButton
                  aria-label="fingerprint"
                  color="inherit"
                  onClick={() => handleChangeStep?.({ step: "previous" })}
                  sx={{ backgroundColor: theme.palette.background.default, height: "50px", width: "50px" }}
                >
                  <WestIcon />
                </IconButton>
                <IconButton
                  aria-label="fingerprint"
                  color="inherit"
                  onClick={() => handleChangeStep?.({ step: "next" })}
                  sx={{ backgroundColor: theme.palette.background.default, height: "50px", width: "50px" }}
                >
                  <EastIcon />
                </IconButton>
              </Stack>
            ) : (
              <Box></Box>
            )}
            {viewAll === "top-right" && (
              <Button variant={variantButton} size={!isSmallDisplay ? "large" : "medium"} onClick={handleViewAll}>
                {t("home.buttonViewAll")}
              </Button>
            )}
          </Stack>
          {childrenWithProps}
          {viewAll === "bottom" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                mt: 3
              }}
            >
              <Button variant={variantButton} size={!isSmallDisplay ? "large" : "medium"} onClick={handleViewAll}>
                {t("home.buttonViewAll")}
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    );
  }
);
