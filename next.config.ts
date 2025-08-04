// eslint-disable-next-line check-file/filename-naming-convention
import withBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

const withNextIntl = createNextIntlPlugin();

export default withAnalyzer(withNextIntl(nextConfig));
