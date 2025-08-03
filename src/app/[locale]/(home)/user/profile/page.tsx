"use client";

import { Box } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

import { ProfileForm, useUserTabs, VerticalTabs } from "~/components/ui";
import { BreadcrumbsComponent } from "~/components/ui/breadcrumbs";
import { Path } from "~/types";

const UserPage = () => {
  const locale = useLocale();
  const t = useTranslations("common.breadcrumbs");
  const tabs = useUserTabs();

  const paths: Path[] = [
    { title: t("home"), link: `/${locale}` },
    { title: t("account"), link: `/${locale}/my-account` }
  ];

  return (
    <Box paddingBottom={2}>
      <BreadcrumbsComponent paths={paths} />
      <VerticalTabs tabs={tabs}>
        <ProfileForm />
      </VerticalTabs>
    </Box>
  );
};

export default UserPage;
