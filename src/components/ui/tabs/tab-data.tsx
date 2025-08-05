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
        { label: t("addressBook"), path: "#" },
        { label: t("paymentOptions"), path: "#" }
      ]
    },
    {
      section: t("myOrders"),
      items: [
        { label: t("myReturns"), path: "#" },
        { label: t("myCancellations"), path: "#" }
      ]
    },
    {
      section: t("myWishlist"),
      items: [{ label: t("wishlist"), path: "/wish-list" }]
    }
  ];
}
