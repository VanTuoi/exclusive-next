"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";

import { CardInput } from "./cart-input";

interface Props {
  isSubmitting: boolean;
  setIsValidCard: (status: boolean) => void;
  locale: string;
  mode: "light" | "dark";
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function StripeCardForm({ isSubmitting, setIsValidCard, locale, mode }: Props) {
  const appearance = {
    theme: (mode === "dark" ? "night" : "stripe") as "night" | "stripe" | "flat"
  };

  return (
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
  );
}
