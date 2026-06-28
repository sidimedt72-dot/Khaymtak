import { getCurrentUser } from "@/features/users/actions";
import { Icons } from "@/components/layouts/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  ProductCard,
  ProductCardFragment,
  ProductCardSkeleton,
} from "@/features/products";
import { DocumentType, gql } from "@/gql";
import { getClient } from "@/lib/urql";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/layouts/Reveal";
import ContactForm from "@/components/layouts/ContactForm";
import WhatsAppButton from "@/components/layouts/WhatsAppButton";
import SwipeRow from "@/components/layouts/SwipeRow";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Heavy, interactive, below-the-fold — code-split into its own client chunk.
const BeforeAfterSlider = dynamic(
  () => import("@/components/layouts/BeforeAfterSlider"),
  {
    loading: () => (
      <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-secondary md:aspect-[16/10]" />
    ),
  },
);

const LandingRouteQuery = gql(/* GraphQL */ `
  query LandingRouteQuery($user_id: UUID) {
    products: productsCollection(
      filter: { featured: { eq: true } }
      first: 4
      orderBy: [{ created_at: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...ProductCardFragment
        }
      }
    }

    wishlistCollection(filter: { user_id: { eq: $user_id } }) {
      edges {
        node {
          product_id
        }
      }
    }

    cartsCollection(filter: { user_id: { eq: $user_id } }) {
      edges {
        node {
          product_id
          quantity
        }
      }
    }

    collectionScrollCards: collectionsCollection(
      first: 6
      orderBy: [{ order: DescNullsLast }]
    ) {
      edges {
        node {
          id
          ...CollectionCardFragment
        }
      }
    }
  }
`);

async function getFeaturedProducts() {
  try {
    const currentUser = await getCurrentUser();
    const { data } = await getClient().query(LandingRouteQuery, {
      user_id: currentUser?.id,
    });
    return data?.products?.edges ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="-mt-[64px] overflow-x-clip">
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      {featuredProducts.length > 0 ? (
        <FeaturedProductsSection products={featuredProducts} />
      ) : null}
      <ExperienceSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}

/* ----------------------------- HERO ----------------------------- */

function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          alt="Réception de mariage de luxe sous chapiteau"
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2000&h=1300&fit=crop"
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />

      <div className="container relative z-10 pb-20 pt-32 md:pb-28">
        <div className="max-w-3xl">
          <p className="mb-6 animate-fade-up text-[11px] font-medium uppercase tracking-luxe-wide text-accent opacity-0 [animation-delay:200ms]">
            Maison de création événementielle · Paris
          </p>

          <h1 className="animate-fade-up font-display text-5xl font-light leading-[1.04] text-white opacity-0 [animation-delay:350ms] md:text-7xl lg:text-8xl">
            L&apos;art de créer
            <br />
            <span className="text-gradient-gold italic">l&apos;inoubliable</span>
          </h1>

          <p className="mt-8 max-w-xl animate-fade-up text-lg font-light leading-relaxed text-white/80 opacity-0 [animation-delay:500ms]">
            Scénographie sur-mesure, tentes d&apos;exception, décoration de
            mariage et réceptions VIP. Nous transformons chaque espace en une
            expérience sensorielle d&apos;exception.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 opacity-0 [animation-delay:650ms] sm:flex-row sm:gap-4 md:mt-11">
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 w-full rounded-full bg-accent px-9 text-[12px] font-medium uppercase tracking-luxe text-accent-foreground shadow-gold hover:bg-accent/90 sm:w-auto",
              )}
            >
              Composer mon événement
            </Link>
            <Link
              href="#realisations"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 w-full rounded-full border-white/40 bg-white/5 px-9 text-[12px] font-medium uppercase tracking-luxe text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto",
              )}
            >
              Découvrir nos réalisations
            </Link>
          </div>
        </div>

        <div className="mt-16 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8 opacity-0 [animation-delay:800ms]">
          {[
            { value: "12 ans", label: "d'excellence" },
            { value: "800+", label: "événements signés" },
            { value: "100%", label: "sur-mesure" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-light text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-luxe text-white/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-luxe text-white/50">
          Défiler
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

/* -------------------------- PHILOSOPHY -------------------------- */

function PhilosophySection() {
  const pillars = [
    {
      Icon: Icons.award,
      title: "Savoir-faire d'exception",
      description:
        "Une équipe d'artisans et de scénographes au service de votre vision.",
    },
    {
      Icon: Icons.truck,
      title: "Livraison & installation",
      description:
        "Logistique millimétrée, montage et reprise pris en charge de A à Z.",
    },
    {
      Icon: Icons.shield,
      title: "Matériel premium",
      description:
        "Tentes, mobilier et lumières haut de gamme entretenus avec soin.",
    },
    {
      Icon: Icons.clock,
      title: "Accompagnement dédié",
      description:
        "Un interlocuteur unique, disponible et réactif sous 24 heures.",
    },
  ];

  return (
    <section className="bg-background py-16 md:py-32">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
            La maison Khaymtak
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-light leading-tight md:text-5xl">
            Chaque détail compte. Chaque émotion est orchestrée.
          </h2>
          <div className="divider-gold mx-auto mt-8 w-24" />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-luxe sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, description }, i) => (
            <Reveal
              key={title}
              delay={i * 90}
              className="group bg-card p-8 transition-colors duration-500 hover:bg-secondary md:p-10"
            >
              <Icon className="h-7 w-7 text-accent" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-2xl font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SERVICES --------------------------- */

const SERVICES = [
  {
    title: "Tentes & Chapiteaux",
    description: "Structures d'exception, du chapiteau intimiste au grand volume.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=1400&fit=crop",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Décoration de mariage",
    description: "Une scénographie florale et lumineuse pensée pour vous.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=700&fit=crop",
  },
  {
    title: "Réception VIP",
    description: "Lounges, mobilier signature et accueil d'exception.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=700&fit=crop",
  },
  {
    title: "Scénographie & Installation",
    description: "De l'espace nu à la mise en scène complète.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=700&fit=crop",
  },
  {
    title: "Stands & Exposition",
    description: "Stands sur-mesure pour salons et lancements de marque.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=700&fit=crop",
  },
  {
    title: "Traiteur & Buffet",
    description: "Mise en place gastronomique et art de la table raffiné.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&h=700&fit=crop",
  },
  {
    title: "Mise en lumière",
    description: "Création d'ambiances par la lumière, du crépuscule à l'aube.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=700&fit=crop",
  },
];

type Service = (typeof SERVICES)[number];

function ServiceCard({
  service,
  className,
  sizes,
  mobile = false,
}: {
  service: Service;
  className?: string;
  sizes: string;
  mobile?: boolean;
}) {
  return (
    <Link
      href="#contact"
      className={cn(
        "group relative block overflow-hidden rounded-2xl shadow-luxe",
        className,
      )}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
          {service.title}
        </h3>
        <p
          className={cn(
            "text-sm text-white/75",
            mobile
              ? "mt-1"
              : "mt-1 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100",
          )}
        >
          {service.description}
        </p>
        <span
          className={cn(
            "mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-accent",
            !mobile &&
              "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          )}
        >
          Demander un devis →
        </span>
      </div>
    </Link>
  );
}

function ServicesSection() {
  return (
    <section className="bg-secondary/40 py-16 md:py-32">
      <div className="container">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
              Nos prestations
            </p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight md:mt-5 md:text-5xl">
              Un univers complet pour vos événements
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Sept savoir-faire réunis sous un même toit pour donner vie aux
            réceptions les plus exigeantes.
          </p>
        </Reveal>

        {/* Mobile: native swipe carousel */}
        <SwipeRow className="mt-8 md:hidden">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              mobile
              sizes="80vw"
              className="snap-item aspect-[3/4] w-[78%] shrink-0"
            />
          ))}
        </SwipeRow>

        {/* Desktop: bento grid */}
        <div className="mt-14 hidden auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 4) * 80}
              className={cn(service.span)}
            >
              <ServiceCard
                service={service}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="h-full w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- FEATURED PRODUCTS ---------------------- */

interface FeaturedProductsProps {
  products: { node: DocumentType<typeof ProductCardFragment> }[];
}

function FeaturedProductsSection({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-background py-16 md:py-32">
      <div className="container">
        <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
              Sélection
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight md:mt-4 md:text-5xl">
              Pièces signatures
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-luxe text-foreground md:text-[12px]"
          >
            <span className="hidden sm:inline">Tout le catalogue</span>
            <span className="sm:hidden">Tout voir</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
              ))}
            </div>
          }
        >
          {/* Mobile: swipe carousel */}
          <SwipeRow className="md:hidden">
            {products.map(({ node }) => (
              <div
                key={`m-product-${node.id}`}
                className="snap-item w-[62%] shrink-0"
              >
                <ProductCard product={node} />
              </div>
            ))}
          </SwipeRow>

          {/* Desktop: grid */}
          <div className="hidden grid-cols-4 gap-8 md:grid">
            {products.map(({ node }, i) => (
              <Reveal key={`product-card-${node.id}`} delay={i * 80}>
                <ProductCard product={node} />
              </Reveal>
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
}

/* -------------------------- EXPERIENCE -------------------------- */

function ExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-32">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
              L&apos;expérience Khaymtak
            </p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.1] md:text-6xl">
              De l&apos;espace nu à
              <br />
              <span className="text-gradient-gold italic">
                l&apos;événement inoubliable
              </span>
            </h2>
            <p className="mt-7 max-w-md text-base font-light leading-relaxed text-primary-foreground/70">
              Glissez le curseur et observez la métamorphose. Un terrain vide, un
              hangar, un jardin — nous révélons le potentiel de chaque lieu pour
              en faire le théâtre de vos plus beaux souvenirs.
            </p>

            <div className="mt-9 space-y-5">
              {[
                ["01", "Repérage & conception", "Visite du lieu et création de la scénographie."],
                ["02", "Installation sur-mesure", "Montage des structures, du mobilier et des lumières."],
                ["03", "Le jour J", "Une équipe dédiée présente du premier au dernier invité."],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-5">
                  <span className="font-display text-2xl font-light text-accent">
                    {num}
                  </span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-primary-foreground/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop"
              afterSrc="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=800&fit=crop"
              beforeLabel="Espace nu"
              afterLabel="Événement"
              beforeAlt="Espace vide avant aménagement"
              afterAlt="Réception aménagée"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- GALLERY --------------------------- */

const GALLERY = [
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1100&fit=crop",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=900&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=700&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=950&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=700&fit=crop",
];

function GallerySection() {
  return (
    <section id="realisations" className="bg-background py-16 md:py-32">
      <div className="container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
            Portfolio
          </p>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
            Nos plus belles réalisations
          </h2>
          <div className="divider-gold mx-auto mt-8 w-24" />
        </Reveal>

        <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 md:gap-6">
          {GALLERY.map((src, i) => (
            <Reveal
              key={src}
              delay={(i % 3) * 90}
              className="group mb-4 block overflow-hidden rounded-2xl shadow-luxe md:mb-6"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={src}
                  alt={`Réalisation événementielle ${i + 1}`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- CONTACT --------------------------- */

function ContactSection() {
  const details = [
    {
      Icon: Icons.user,
      label: "Téléphone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    {
      Icon: Icons.globe,
      label: "Adresse",
      value: siteConfig.address,
    },
    {
      Icon: Icons.receipt,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
  ];

  return (
    <section id="contact" className="bg-secondary/40 py-16 md:py-32">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-luxe text-accent">
              Parlons de votre projet
            </p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              Créons ensemble un moment d&apos;exception
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted-foreground">
              Confiez-nous votre vision. Notre équipe vous recontacte sous 24
              heures pour composer une proposition entièrement sur-mesure.
            </p>

            <div className="mt-10 space-y-6">
              {details.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <Link
                        href={href}
                        className="text-lg transition-colors hover:text-accent"
                      >
                        {value}
                      </Link>
                    ) : (
                      <p className="text-lg">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <WhatsAppButton>Discuter sur WhatsApp</WhatsAppButton>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card rounded-3xl p-7 shadow-luxe md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
