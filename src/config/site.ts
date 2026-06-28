import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Khaymtak Event",
  description:
    "Maison de création événementielle de luxe — scénographie, tentes d'exception, décoration de mariage et réceptions VIP.",
  url: "https://khaymtak.com",
  address: "Nouakchott, Mauritanie",
  phone: "+222 33 37 37 58",
  whatsapp: "22233373758",
  email: "contact@khaymtak.com",
  mainNav: [
    {
      title: "Catalogue",
      href: "/shop",
      description: "Parcourez tout notre matériel disponible à la location.",
      items: [],
    },
    {
      title: "Tentes & Structures",
      href: "/collections/tentes-structures",
      description: "Tentes, chapiteaux et structures modulaires.",
      items: [],
    },
    {
      title: "Mobilier",
      href: "/collections/mobilier",
      description: "Tables, chaises, canapés et décoration.",
      items: [],
    },
    {
      title: "Stands & Scénographie",
      href: "/collections/stands-scenographie",
      description: "Stands d'exposition et éléments de scénographie.",
      items: [],
    },
    {
      title: "Contact",
      href: "/shop",
      description: "Contactez-nous pour un devis personnalisé.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],
};
