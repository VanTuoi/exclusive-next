"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Divider, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { maxLength, minLength, regexSchema, validateString } from "~/utils";

import { PasswordInput } from "~/components/ui/inputs";

import { useAuth } from "~/hooks/auth";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { LoginWithGoogle } from "../buttons/login-with-google";

export const LoginForm = memo(() => {
  const router = useRouter();
  const t = useTranslations("loginPage");
  const { handleLogin } = useAuth();

  const formSchema = z.object({
    contactField: validateString("Contact"),
    password: validateString("Password")
      .and(minLength(6, t("validate.minLength", { objectName: t("validate.password"), minimumValue: 6 })))
      .and(maxLength(50, t("validate.maxLength", { objectName: t("validate.password"), maximumValue: 50 })))
      .and(
        regexSchema(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
          t("validate.regexSchema", { objectName: t("validate.password"), minimumValue: 1 })
        )
      )
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactField: "example@gmail.com",
      password: "1234a@"
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await handleLogin(data.contactField, data.password);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h3" sx={{ fontSize: "24px", fontWeight: 600, textAlign: "center", py: 2 }}>
          {t("title")}
        </Typography>
        <Typography variant="h5" component="h5" textAlign="left">
          {t("content")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl error={Boolean(errors.contactField)}>
            <TextField
              disabled={isSubmitting}
              label={t("form.contact.label")}
              type="text"
              placeholder={t("form.contact.placeholder")}
              variant="standard"
              fullWidth
              required
              {...register("contactField")}
              error={Boolean(errors.contactField)}
            />
            <FormHelperText>{errors.contactField?.message}</FormHelperText>
          </FormControl>

          <PasswordInput
            disabled={isSubmitting}
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
            variant="standard"
            register={register}
            errors={errors}
            name="password"
          />
        </Box>

        <Box display="flex" flexDirection={"column"} justifyContent="space-between" alignItems="center" gap={1}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
            sx={{ fontWeight: 500, width: "100%", height: "56px", fontSize: "16px" }}
          >
            {t("button")}
          </LoadingButton>

          <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
            <Button variant="text" onClick={() => router.push("forget-password")}>
              {t("forgetPassword")}
            </Button>
          </Box>
        </Box>
        <Divider />
        <LoginWithGoogle isLoading={isSubmitting} />
      </Stack>
    </Box>
  );
});
