"use client";

import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { memo, useState } from "react";

import { IconBank } from "./icon-bank";

const DynamicCardForm = dynamic(() => import("./stripe-card-form"), {
  ssr: false,
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" height={100}>
      <CircularProgress size={12} />
    </Box>
  )
});
interface PayMethodProps {
  isSubmitting: boolean;
  changeTypePayMethod: (type: "bank" | "cash") => void;
  typePayMethod: "bank" | "cash";
  setIsValidCard: (status: boolean) => void;
}

export const PayMethod = memo(
  ({ isSubmitting, changeTypePayMethod, setIsValidCard, typePayMethod }: PayMethodProps) => {
    const locale = useLocale();
    const theme = useTheme();
    const t = useTranslations();

    const [selectedType, setSelectedType] = useState<string>(typePayMethod);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      setSelectedType(selectedValue);
      changeTypePayMethod(selectedValue as "bank" | "cash");
    };

    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="payment-method-group-label"
          value={selectedType}
          name="payment-method-group"
          onChange={handleChange}
        >
          <FormControlLabel
            value="bank"
            sx={{ py: 1 }}
            control={<Radio />}
            label={
              <Box
                minWidth={{ xs: "280px", md: "370px" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ width: "100%" }} variant="h4">
                  {t("checkout.payMethod.bank")}
                </Typography>
                <IconBank />
              </Box>
            }
          />
          <Box sx={{ width: { xs: "100%", md: "400px" } }} display="flex" flexDirection="column" gap={2}>
            {selectedType === "bank" && (
              <DynamicCardForm
                isSubmitting={isSubmitting}
                setIsValidCard={setIsValidCard}
                locale={locale}
                mode={theme.palette.mode}
              />
            )}
          </Box>
          <FormControlLabel
            sx={{ py: 1 }}
            value="cash"
            control={<Radio />}
            label={<Typography variant="h4">{t("checkout.payMethod.cash")}</Typography>}
          />
        </RadioGroup>
      </FormControl>
    );
  }
);
