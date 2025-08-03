"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, FormHelperText, Stack, TextField, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { maxLength, minLength, regexSchema, validateString } from "~/utils";

import { PasswordInput } from "~/components/ui/inputs";

import { useAuth } from "~/hooks/auth";

import { useTranslations } from "next-intl";
import { LoginWithGoogle } from "../buttons/login-with-google";
import { CustomLink } from "../links";

export const SignUpForm = memo(() => {
  const t = useTranslations("signUpPage");
  const theme = useTheme();

  const formSchema = z.object({
    name: validateString("Name")
      .and(minLength(1, t("validate.minLength", { objectName: t("validate.name"), minimumValue: 1 })))
      .and(maxLength(50, t("validate.maxLength", { objectName: t("validate.name"), maximumValue: 50 }))),

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

  const { handleRegister } = useAuth();

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
      name: "Mr Alan",
      contactField: "example@gmail.com",
      password: "1234a@"
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const message = await handleRegister(data);

    if (!message) return;
    switch (message) {
      case "phone":
        setError("contactField", { type: "manual", message: "User contactField not found" });
        break;
      case "password":
        setError("password", { type: "manual", message: "Incorrect password" });
        break;
      default:
        setError("contactField", { type: "manual", message: "An unknown error occurred" });
        break;
    }
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
        <FormControl error={Boolean(errors.name)}>
          <TextField
            disabled={isSubmitting}
            label={t("form.name.label")}
            type="text"
            placeholder={t("form.name.placeholder")}
            variant="standard"
            required
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
          />
          <FormHelperText>{errors.name?.message}</FormHelperText>
        </FormControl>
        <FormControl error={Boolean(errors.contactField)}>
          <TextField
            disabled={isSubmitting}
            label={t("form.contact.label")}
            type="text"
            placeholder={t("form.contact.placeholder")}
            variant="standard"
            required
            fullWidth
            {...register("contactField")}
            error={Boolean(errors.contactField)}
          />
          <FormHelperText>{errors.contactField?.message}</FormHelperText>
        </FormControl>
        <PasswordInput
          disabled={isSubmitting}
          variant="standard"
          label={t("form.password.label")}
          placeholder={t("form.password.placeholder")}
          register={register}
          errors={errors}
          name="password"
        />
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
          {t("button")}
        </LoadingButton>
        <LoginWithGoogle isLoading={isSubmitting} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end"
          }}
        >
          <CustomLink href="/auth/login" variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            {t("linkLogin")}
          </CustomLink>
        </Box>
      </Stack>
    </Box>
  );
});
