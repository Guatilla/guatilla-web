export const NAV_LINKS = [
  { href: "/shop", label: "Butikk" },
  { href: "/origen", label: "Opprinnelse" },
  { href: "/about", label: "Om oss" },
];

export const FOOTER_LINKS = {
  brand: [
    { href: "/about", label: "Om oss" },
    { href: "/origen", label: "Direkte handel" },
    { href: "/journal", label: "Feltjournal" },
  ],
  transparency: [
    { href: "/about", label: "Vår modell" },
    { href: "/about", label: "Rettferdig prising" },
    { href: "/journal", label: "Feltjournal" },
  ],
};

export const SITE_ROUTES = {
  home: "/",
  kaffe: "/kaffe",
  shop: "/shop",
  about: "/about",
  origen: "/origen",
  journal: "/journal",
  cart: "/cart",
  contact: "/contact",
} as const;
