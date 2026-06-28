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
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground md:mt-36">
      <div className="container pb-10 pt-16 md:pt-24">
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-luxe text-accent">
            Maison événementielle
          </span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
            Composons ensemble votre
            <span className="text-gradient-gold"> prochain chef-d&apos;œuvre</span>
          </h2>
        </div>

        <div className="mb-16 hidden grid-cols-5 place-content-between gap-x-16 md:grid">
          <div className="col-span-5 max-w-md lg:col-span-2">
            <NewsletterForm />
          </div>

          <div className="col-span-5 grid max-w-[680px] grid-cols-3 gap-x-8 lg:col-span-3">
            {footerSiteMap.map(({ title, items }, index) => (
              <div key={index}>
                <p className="mb-5 text-[11px] font-medium uppercase tracking-luxe text-accent">
                  {title}
                </p>
                <div className="flex flex-col gap-y-3">
                  {items?.map((i, idx) => (
                    <Link
                      href={i.href || ""}
                      key={idx}
                      className="text-sm text-primary-foreground/65 transition-colors hover:text-accent"
                    >
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-x-5 border-t border-primary-foreground/10 pt-8 md:flex-row md:items-center">
          <div className="mb-4 flex flex-col items-start gap-x-8 md:mb-0 md:flex-row md:items-center">
            <Branding className="[&_span]:text-primary-foreground [&_.text-accent]:text-accent" />
            <div className="mt-3 text-xs text-primary-foreground/60 md:mt-0">
              <p>{siteConfig.address}</p>
              <p>
                {siteConfig.phone} /{" "}
                <Link
                  className="transition-colors hover:text-accent hover:underline"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </Link>
              </p>
            </div>
          </div>

          <SocialMedias
            containerClassName="mr-0 md:mr-4"
            itemsClassName="text-primary-foreground/60 hover:text-accent"
          />
        </div>

        <p className="mt-8 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Khaymtak Event — Maison de création
          événementielle. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default MainFooter;
