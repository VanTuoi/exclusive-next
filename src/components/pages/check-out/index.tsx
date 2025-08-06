"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, Grid, Stack, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCustomSnackbar } from "~/hooks";
import { useAuthStore, useCartStore } from "~/stores";
import { DeliveryFormData } from "~/types";
import { minLength, regexSchema, validateString } from "~/utils";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PromoCodeInput } from "../cart/input-promotion";
import { Total } from "../cart/total";
import { AddressInput } from "./address-text-field";
import { BorderlessInput } from "./borderless-text-field";
import { ControlledCheckbox } from "./check-box-save";
import { ItemProduct } from "./item-product";
import { PayMethod } from "./pay-method";

export const CheckOutComponents = memo(() => {
  const { items, removeAllInCart } = useCartStore();
  const { showSnackbar } = useCustomSnackbar();
  const { userData } = useAuthStore();
  const router = useRouter();
  const t = useTranslations();
  const theme = useTheme();

  const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false);
  const [isSaveFormToLocal, setIsSaveFormToLocal] = useState<boolean>(false);
  const [typePayMethod, setTypePayMethod] = useState<"bank" | "cash">("cash");
  const [isValidCard, setIsValidCard] = useState<boolean>(false);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<DeliveryFormData | null>(null);
  const [dataFormSaveSession, setDataFormSaveSession] = useState<DeliveryFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(() => {
    return Object.values(items).reduce((acc, { product, quantity }) => acc + product.finalPrice * quantity, 0);
  }, [items]);

  const formSchema = z.object({
    firstName: validateString("First Name").and(minLength(1, t("checkout.form.validate.required"))),
    companyName: z.string().optional(),
    streetAddress: z.string().optional(),
    apartment: z.string().optional(),
    city: validateString("Town/City").and(minLength(1, t("checkout.form.validate.required"))),
    phoneNumber: z
      .string()
      .and(minLength(1, t("checkout.form.validate.required")))
      .and(regexSchema(/^[0-9]{10,15}$/, t("checkout.form.validate.phoneNumber"))),
    emailAddress: validateString("Email Address").and(minLength(1, t("checkout.form.validate.required")))
  });

  const {
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
    trigger,
    watch
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {}
  });

  const onChange = (name: keyof DeliveryFormData, value: string) => {
    setValue(name, value);
    trigger(name);
    const updatedValues = {
      firstName: getValues("firstName"),
      companyName: getValues("companyName"),
      streetAddress: getValues("streetAddress") || "",
      apartment: getValues("apartment"),
      city: getValues("city"),
      phoneNumber: getValues("phoneNumber"),
      emailAddress: getValues("emailAddress")
    };
    setDataForm(updatedValues);

    if (name === "streetAddress" && value) {
      const addressParts = value.split(", ");
      if (addressParts.length > 1) {
        const city = addressParts[addressParts.length - 2];
        setValue("city", city);
      }
    }
    setIsValidForm(isValid);
  };

  const handleSetValue = (name: keyof DeliveryFormData, value: string) => {
    onChange(name, value);
  };

  const formValues = watch();

  useEffect(() => {
    setIsValidForm(isValid);
  }, [formValues, isValid]);

  useEffect(() => {
    const savedData = sessionStorage.getItem("checkoutData") || localStorage.getItem("checkoutData");
    if (savedData) {
      setDataFormSaveSession(JSON.parse(savedData));
      setIsValidForm(true);
    }
  }, []);

  useEffect(() => {
    if (userData ?? dataFormSaveSession) {
      setValue("firstName", userData?.firstName ?? dataFormSaveSession?.firstName ?? "");
      setValue("companyName", dataFormSaveSession?.companyName ?? "");
      setValue("streetAddress", dataFormSaveSession?.streetAddress ?? "");
      setValue("apartment", dataFormSaveSession?.apartment ?? "");
      setValue("city", dataFormSaveSession?.city ?? "");
      setValue("phoneNumber", userData?.phone ?? dataFormSaveSession?.phoneNumber ?? "");
      setValue("emailAddress", userData?.emailAddress ?? dataFormSaveSession?.emailAddress ?? "");
      setDataForm({
        firstName: userData?.firstName ?? "",
        companyName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phoneNumber: userData?.phone ?? "",
        emailAddress: userData?.emailAddress ?? ""
      });
    } else {
      setValue("firstName", "name");
      setValue("streetAddress", "Ninh Kieu");
      setValue("companyName", "");
      setValue("city", "Can Tho");
      setValue("phoneNumber", "0123456789");
      setValue("emailAddress", "text@gmail.com");
      setDataForm({
        firstName: "name",
        companyName: "",
        streetAddress: "Ninh Kieu",
        apartment: "",
        city: "Can Tho",
        phoneNumber: "0123456789",
        emailAddress: "text@gmail.com"
      });
    }
  }, [userData, dataFormSaveSession]);

  const handleSubmit = async () => {
    const haveValidForm = await trigger();

    if (haveValidForm) {
      if (userData && localStorage.getItem("isLogin") === "true") {
        setIsSubmitting(true);
        sessionStorage.removeItem("checkoutData");
        removeAllInCart();
        showSnackbar("Payment successful", "success");
      } else {
        if (isSaveFormToLocal) {
          localStorage.setItem("checkoutData", JSON.stringify(dataForm));
        } else {
          sessionStorage.setItem("checkoutData", JSON.stringify(dataForm));
        }
        router.push("/auth/login?urlCallBack=/checkout");
      }
    }
  };

  return (
    <Grid container sx={{ width: "100%" }} spacing={1}>
      {Object.values(items).length > 0 ? (
        <>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Card
                  component="form"
                  noValidate
                  sx={{
                    width: { xs: "100%", md: "470px" },
                    boxShadow: theme.palette.mode === "light" ? theme.shadows[1] : theme.shadows[3],
                    p: 3
                  }}
                >
                  <Stack spacing={3}>
                    <Typography
                      textAlign={"left"}
                      variant="h3"
                      sx={{
                        width: "100%",
                        fontSize: "2rem",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        letterSpacing: "0.04em"
                      }}
                    >
                      {t("checkout.title")}
                    </Typography>
                    <Box sx={{ gap: 3, mt: 2, display: "flex", flexDirection: "column" }}>
                      <BorderlessInput
                        label={t("checkout.form.firstName.label")}
                        required={true}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"firstName"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("firstName", value)}
                      />
                      <BorderlessInput
                        label={t("checkout.form.companyName.label")}
                        required={false}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"companyName"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("companyName", value)}
                      />
                      <AddressInput
                        cityName="city"
                        setValue={handleSetValue}
                        label={t("checkout.form.streetAddress.label")}
                        required={false}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"streetAddress"}
                        variant="outlined"
                      />
                      <BorderlessInput
                        label={t("checkout.form.apartment.label")}
                        required={false}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"apartment"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("apartment", value)}
                      />
                      <BorderlessInput
                        label={t("checkout.form.city.label")}
                        required={true}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"city"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("city", value)}
                      />
                      <BorderlessInput
                        label={t("checkout.form.phoneNumber.label")}
                        required={true}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"phoneNumber"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("phoneNumber", value)}
                      />
                      <BorderlessInput
                        label={t("checkout.form.emailAddress.label")}
                        required={true}
                        disabled={isSubmitting}
                        register={register}
                        errors={errors}
                        name={"emailAddress"}
                        variant="outlined"
                        onChange={(value) => handleSetValue("emailAddress", value)}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Box>

              <ControlledCheckbox isSaveFormToLocal={isSaveFormToLocal} setIsSaveFormToLocal={setIsSaveFormToLocal} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container size={{ xs: 12 }} spacing={1}>
              <Grid size={{ xs: 12, md: 12 }} alignItems={"flex-start"}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "324px",
                    width: { xs: "100%", md: "470px" },
                    padding: { xs: 0, md: 5 },
                    paddingLeft: 0
                  }}
                >
                  {Object.values(items).map((item, index) => (
                    <ItemProduct key={index} item={item} />
                  ))}
                  <Total subtotal={subtotal} shipping={t("checkout.shipping")} />
                  <Box sx={{ width: "100%" }}>
                    <PayMethod
                      isSubmitting={isSubmitting}
                      typePayMethod={typePayMethod}
                      changeTypePayMethod={setTypePayMethod}
                      setIsValidCard={setIsValidCard}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }} gap={1}>
                <PromoCodeInput />
                <Box sx={{ paddingY: 4 }}>
                  <Button
                    onClick={async () => {
                      setIsSubmitForm(true);
                      const haveValidForm = await trigger(); // Kích hoạt validation
                      if (haveValidForm && (typePayMethod !== "bank" || isValidCard)) {
                        handleSubmit(); // Gọi hàm submit nếu form hợp lệ
                      }
                    }}
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSubmitForm && (!isValidForm || (typePayMethod === "bank" && !isValidCard))}
                  >
                    {t("checkout.button")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid size={{ xs: 12, md: 12 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" textAlign={"center"}>
              {t("checkout.emptyCart")}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
});
