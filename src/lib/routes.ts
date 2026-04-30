export const NAV_LINKS = [
  { href: "/shop", label: "Butikk" },
  { href: "/origen", label: "Opprinnelse" },
  { href: "/about", label: "Om oss" },
  { href: "/project-progress", label: "Fremdrift" },
];

export const FOOTER_LINKS = {
  brand: [
    { href: "/about", label: "Om oss" },
    { href: "/origen", label: "Direkte handel" },
    { href: "/project-progress", label: "Prosjektfremdrift" },
  ],
  transparency: [
    { href: "/about", label: "Vår modell" },
    { href: "/about", label: "Rettferdig prising" },
    { href: "/project-progress", label: "Sporbarhet" },
    { href: "/journal", label: "Feltjournal" },
  ],
};

export const SITE_ROUTES = {
  home: "/",
  shop: "/shop",
  about: "/about",
  origen: "/origen",
  journal: "/journal",
  projectProgress: "/project-progress",
  cart: "/cart",
  contact: "/contact",
} as const;
