const configuredQrPath = process.env.NEXT_PUBLIC_VIPPS_QR_PATH?.trim();

export const COMMERCE_CONFIG = {
  currency: "NOK" as const,
  shippingOre: 0,
  discountOre: 0,
  vipps: {
    number: "66141",
    merchantName: "GUATILLA COMO",
    officialQrPath:
      configuredQrPath?.startsWith("/") && !configuredQrPath.startsWith("//")
        ? configuredQrPath
        : null,
  },
} as const;
