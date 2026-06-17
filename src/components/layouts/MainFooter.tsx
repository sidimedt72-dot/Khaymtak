import { NavItemWithOptionalChildren } from "@/types";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import Branding from "./Branding";
import { siteConfig } from "@/config/site";
import SocialMedias from "./SocialMedias";

function MainFooter() {
  const footerSiteMap: NavItemWithOptionalChildren[] = [
    {
      title: "Catalogue",
      items: [
        {
          title: "Tentes & Structures",
          href: "/collections/tentes-structures",
          items: [],
        },
        {
          title: "Mobilier",
          href: "/collections/mobilier",
          items: [],
        },
        {
          title: "Stands & Scénographie",
          href: "/collections/stands-scenographie",
          items: [],
        },
        {
          title: "Éclairage & Son",
          href: "/collections/eclairage-son",
          items: [],
        },
        {
          title: "Nouveautés",
          href: "/shop",
          items: [],
        },
      ],
    },
    {
      title: "Services",
      items: [
        {
          title: "Livraison & Installation",
          href: "/shop",
          items: [],
        },
        {
          title: "Devis personnalisé",
          href: "/shop",
          items: [],
        },
        {
          title: "Conditions de location",
          href: "/shop",
          items: [],
        },
        {
          title: "FAQ",
          href: "/shop",
          items: [],
        },
      ],
    },
    {
      title: "À propos",
      items: [
        {
          title: "Notre histoire",
          href: "/shop",
          items: [],
        },
        {
          title: "Nos réalisations",
          href: "/shop",
          items: [],
        },
        {
          title: "Partenaires",
          href: "/shop",
          items: [],
        },
        {
          title: "Contact",
          href: "/shop",
          items: [],
        },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-20 md:mt-32">
      <div className="container pb-10 pt-10 md:pt-14">
        <div className="hidden md:grid grid-cols-5 mb-16 gap-x-16 place-content-between">
          <div className="max-w-md col-span-5 lg:col-span-2">
            <h3 className="font-display text-2xl font-semibold mb-2">
              Restez informé
            </h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Recevez nos offres et nouveautés pour vos prochains événements.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-3 col-span-5 lg:col-span-3 gap-x-8 max-w-[680px]">
            {footerSiteMap.map(({ title, items }, index) => (
              <div key={index}>
                <p className="font-semibold mb-4 text-accent">{title}</p>
                <div className="flex flex-col gap-y-2.5">
                  {items?.map((i, idx) => (
                    <Link
                      href={i.href || ""}
                      key={idx}
                      className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                    >
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex gap-x-5 justify-between flex-col md:flex-row md:items-center items-start">
          <div className="flex flex-col md:flex-row gap-x-6 md:items-center items-start mb-4 md:mb-0">
            <Branding className="[&_span]:text-primary-foreground [&_.text-accent]:text-accent" />
            <div className="text-xs text-primary-foreground/60 mt-2 md:mt-0">
              <p>{siteConfig.address}</p>
              <p>
                {siteConfig.phone} /{" "}
                <Link
                  className="hover:underline hover:text-accent transition-colors"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </Link>
              </p>
            </div>
          </div>

          <SocialMedias containerClassName="mr-0 md:mr-4" />
        </div>

        <p className="text-center text-xs text-primary-foreground/40 mt-8">
          © {new Date().getFullYear()} LocaEvent — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

export default MainFooter;
