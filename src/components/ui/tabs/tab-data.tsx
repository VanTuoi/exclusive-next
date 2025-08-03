import { useTranslations } from "next-intl";

interface SubTab {
  label: string;
  path: string;
}

interface NestedTab {
  section: string;
  items: SubTab[];
}

export function useUserTabs(): NestedTab[] {
  const t = useTranslations("profile.tabs");

  return [
    {
      section: t("manageAccount"),
      items: [
        { label: t("myProfile"), path: "/user/profile" },
        { label: t("addressBook"), path: "/user/address" },
        { label: t("paymentOptions"), path: "/user/payments" }
      ]
    },
    {
      section: t("myOrders"),
      items: [
        { label: t("myReturns"), path: "/user/returns" },
        { label: t("myCancellations"), path: "/user/cancellations" }
      ]
    },
    {
      section: t("myWishlist"),
      items: [{ label: t("wishlist"), path: "/wish-list" }]
    }
  ];
}
