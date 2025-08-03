import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslations } from "next-intl";
import { useAuth } from "~/hooks/auth";
import { validateString } from "~/utils";

export const ForgetPasswordForm = memo(() => {
  const t = useTranslations("forgetPassword");

  const formSchema = z.object({
    contactField: validateString(t("validation.contactField"))
  });

  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid }
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactField: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const message = await handleLogin(data.contactField, "");
      switch (message) {
        case "1":
          setError("contactField", { type: "manual", message: t("error.notFound") });
          break;
        default:
          setError("contactField", { type: "manual", message: t("error.unknown") });
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "36px",
            lineHeight: "30px",
            fontFamily: "Inter",
            fontWeight: 500,
            letterSpacing: "0.04em"
          }}
        >
          {t("title")}
        </Typography>
        <Typography variant="h4" component="h1" textAlign="left">
          {t("subtitle")}
        </Typography>
        <FormControl error={Boolean(errors.contactField)}>
          <TextField
            label={t("contactLabel")}
            type="text"
            placeholder={t("contactPlaceholder")}
            variant="standard"
            required
            fullWidth
            {...register("contactField")}
            error={Boolean(errors.contactField)}
          />
          <FormHelperText>{errors.contactField?.message}</FormHelperText>
        </FormControl>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <LoadingButton
            sx={{ fontSize: "16px", height: "56px", fontWeight: 500 }}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
          >
            {t("submitButton")}
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
});
