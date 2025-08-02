"use client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, FormControl, FormHelperText, Stack, TextField, Typography, useTheme } from "@mui/material";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRegister } from "~/hooks";

import { Logo, PasswordInput } from "~/components/ui";

const formSchema = z
  .object({
    name: z
      .string({ required_error: "Vui lòng nhập tên" })
      .min(1, { message: "Tên không được để trống" })
      .max(30, { message: "Tên không được vượt quá 30 ký tự" }),
    email: z
      .string({ required_error: "Vui lòng nhập email" })
      .min(1, { message: "Email không được để trống" })
      .max(50, { message: "Email không được vượt quá 50 ký tự" })
      .email({ message: "Email không hợp lệ" }),
    password: z
      .string({ required_error: "Vui lòng nhập mật khẩu" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .max(50, { message: "Mật khẩu không được vượt quá 50 ký tự" }),
    password_confirmation: z
      .string({ required_error: "Vui lòng nhập lại mật khẩu" })
      .min(1, { message: "Xác nhận mật khẩu không được để trống" })
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Mật khẩu xác nhận không khớp"
  });

export const RegisterForm = memo(() => {
  const theme = useTheme();
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "JONE",
      email: "jone2@example.com",
      password: "12345678",
      password_confirmation: "12345678"
    }
  });

  const { loading, error, register: handleRegister } = useRegister(() => router.push("/login"));

  useEffect(() => {
    if (error?.errors) {
      Object.entries(error.errors).forEach(([field, messages]) => {
        messages.forEach((message) => {
          setError(field as keyof z.infer<typeof formSchema>, {
            type: "server",
            message
          });
        });
      });
    }
  }, [error, setError]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleRegister(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2
      }}
    >
      <Card
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: {
            sx: "auto",
            sm: 350
          },
          padding: 4,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Stack spacing={3}>
          <Logo />
          <Typography variant="h4" component="h1" textAlign="left">
            Đăng ký
          </Typography>

          <FormControl error={Boolean(errors.name)}>
            <TextField
              label="Tên"
              placeholder="Tên của bạn"
              variant="outlined"
              required
              fullWidth
              {...register("name")}
              error={Boolean(errors.name)}
            />
            <FormHelperText>{errors.name?.message}</FormHelperText>
          </FormControl>

          <FormControl error={Boolean(errors.email)}>
            <TextField
              label="Email"
              type="email"
              placeholder="Email của bạn"
              variant="outlined"
              required
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>

          <PasswordInput
            label="Mật khẩu"
            placeholder="Mật khẩu của bạn"
            register={register}
            errors={errors}
            name="password"
          />
          <PasswordInput
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            register={register}
            errors={errors}
            name="password_confirmation"
          />

          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            loading={loading}
            disabled={!isValid || loading}
          >
            Đăng ký
          </LoadingButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <Typography variant="h5" sx={{ marginRight: 1 }}>
              Bạn đã có tài khoản?
            </Typography>
            <Typography variant="h5" color="primary" sx={{ cursor: "pointer" }} onClick={() => router.push("login")}>
              Đăng nhập ngay
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
});
