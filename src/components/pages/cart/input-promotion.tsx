import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCustomSnackbar } from "~/hooks";
import { usePromotionStore } from "~/stores";

import { useTranslations } from "next-intl";
import { usePromotion } from "~/hooks/cart";

const promoCodeSchema = z.object({
  promoCode: z
    .string()
    .min(1, { message: "Promo code is required" })
    .regex(/^[A-Z0-9]{5,10}$/, { message: "Invalid promo code format" })
});

export const PromoCodeInput: React.FC = memo(() => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset
  } = useForm<z.infer<typeof promoCodeSchema>>({
    mode: "onChange",
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      promoCode: "DISCOUNT20"
    }
  });

  const t = useTranslations();

  const { handleGetPromotion } = usePromotion();

  const { showSnackbar } = useCustomSnackbar();

  const { promotions, addPromotion } = usePromotionStore();

  const onSubmit = async (data: z.infer<typeof promoCodeSchema>) => {
    const dataPromotion = await handleGetPromotion(data.promoCode);

    if (dataPromotion) {
      if (promotions.some((item) => item.promoCode === dataPromotion.promoCode)) {
        showSnackbar("This code has been applied", "warning");
      } else {
        addPromotion(dataPromotion);
        showSnackbar("Add promotion successfully", "success");
      }
    } else {
      setError("promoCode", { type: "manual", message: "Invalid promo code" });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent={"center"}>
        <TextField
          label={t("cart.inputCoupon")}
          variant="outlined"
          size="small"
          {...register("promoCode")}
          error={!!errors.promoCode}
          helperText={errors.promoCode?.message}
          sx={{
            flexGrow: 1,
            height: "25px",
            width: { xs: "100%", md: "300px" },
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "16px"
          }}
        />
        <Button
          variant="contained"
          size="medium"
          sx={{ width: { xs: "100%", md: "200px" } }}
          type="submit"
          disabled={!!errors.promoCode || isSubmitting}
        >
          {t("cart.buttonCoupon")}
        </Button>
      </Stack>
    </form>
  );
});
