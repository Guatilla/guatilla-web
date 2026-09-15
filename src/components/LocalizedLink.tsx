"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

type LocalizedLinkProps = ComponentProps<typeof NextLink>;

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const locale = useLocale();
  const localizedHref = typeof href === "string" ? localizePath(href, locale) : href;

  return <NextLink href={localizedHref} {...props} />;
}
