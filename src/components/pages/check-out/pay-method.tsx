import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import { memo, useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import { CardInput } from "./cart-input";
import { IconBank } from "./icon-bank";

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

    const appearance = {
      theme: (theme.palette.mode === "dark" ? "night" : "stripe") as "night" | "stripe" | "flat"
    };

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

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
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography sx={{ width: "100%" }} variant="h4">
                  {t("checkout.payMethod.bank")}
                </Typography>
                <IconBank />
              </Box>
            }
          />
          <Box sx={{ width: { xs: "100%", md: "400px" } }} display={"flex"} flexDirection={"column"} gap={2}>
            {selectedType === "bank" && (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: 120,
                  currency: "usd",
                  locale: (locale as StripeElementLocale) || "en",
                  appearance
                }}
              >
                <CardInput isSubmitting={isSubmitting} setIsValidCard={setIsValidCard} />
              </Elements>
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
