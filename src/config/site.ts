import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LocaEvent",
  description:
    "Location de matériel événementiel — tentes, stands, mobilier et équipements pour tous vos événements.",
  url: "https://locaevent.fr",
  address: "12 Avenue des Événements, 75008 Paris, France",
  phone: "+33 1 23 45 67 89",
  email: "contact@locaevent.fr",
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
