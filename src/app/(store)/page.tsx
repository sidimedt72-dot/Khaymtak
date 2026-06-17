import { getCurrentUser } from "@/features/users/actions";
import { Icons } from "@/components/layouts/icons";
import { Shell } from "@/components/layouts/Shell";
import { buttonVariants } from "@/components/ui/button";
import { CollectionCardFragment } from "@/features/collections";
import {
  ProductCard,
  ProductCardFragment,
  ProductCardSkeleton,
} from "@/features/products";
import { DocumentType, gql } from "@/gql";
import { getClient } from "@/lib/urql";
import { cn, keytoUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

const CATEGORIES = [
  {
    label: "Tentes",
    slug: "tentes-structures",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f29da8c4f3?w=600&h=600&fit=crop",
    description: "Chapiteaux & structures",
  },
  {
    label: "Mobilier",
    slug: "mobilier",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=600&fit=crop",
    description: "Tables, chaises & lounge",
  },
  {
    label: "Stands",
    slug: "stands-scenographie",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop",
    description: "Exposition & salons",
  },
  {
    label: "Éclairage",
    slug: "eclairage-son",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop",
    description: "Lumière & ambiance",
  },
];

export default async function Home() {
  const currentUser = await getCurrentUser();

  const { data } = await getClient().query(LandingRouteQuery, {
    user_id: currentUser?.id,
  });

  if (data === null) return notFound();

  return (
    <main>
      <HeroSection />
      <CategoryStrip />
      <Shell>
        <ProductSubCollectionsCircles
          collections={data.collectionScrollCards?.edges ?? []}
        />

        {data.products?.edges ? (
          <FeaturedProductsCards products={data.products.edges} />
        ) : null}

        <CollectionGrid />
        <DifferentFeatureCards />
        <CTASection />
      </Shell>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
      <Image
        alt="Événement avec tente et mobilier"
        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=1200&fit=crop"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent border border-accent/30 rounded-full backdrop-blur-sm">
            Location événementielle
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Donnez vie à vos
            <br />
            <span className="text-gradient-gold">événements</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            Tentes, stands, mobilier et équipements — tout le matériel
            professionnel pour mariages, salons, festivals et événements
            d&apos;entreprise.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-accent/25",
              )}
            >
              Voir le catalogue
            </Link>
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-white/40 text-white rounded-full px-8 py-6 text-base backdrop-blur-sm hover:bg-white/10 hover:text-white",
              )}
            >
              Demander un devis
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/15">
            {[
              { value: "500+", label: "Références" },
              { value: "24h", label: "Devis rapide" },
              { value: "100%", label: "Livraison & reprise" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  return (
    <section className="bg-primary py-4 overflow-x-auto">
      <div className="container flex gap-6 md:gap-10 items-center justify-center md:justify-start">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors whitespace-nowrap text-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

interface CollectionsCardsProps {
  collections: { node: DocumentType<typeof CollectionCardFragment> }[];
}

function ProductSubCollectionsCircles({ collections }: CollectionsCardsProps) {
  const items =
    collections.length > 0
      ? collections.map(({ node }) => ({
          label: node.label,
          slug: node.slug,
          image: keytoUrl(node.featuredImage.key),
          alt: node.featuredImage.alt,
        }))
      : CATEGORIES.map((c) => ({
          label: c.label,
          slug: c.slug,
          image: c.image,
          alt: c.label,
        }));

  return (
    <section className="py-16 md:py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Nos catégories
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Parcourez notre catalogue par type de matériel pour trouver exactement
          ce dont vous avez besoin.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((item) => (
          <Link
            href={`/collections/${item.slug}`}
            key={item.slug}
            className="group"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary shadow-sm group-hover:shadow-lg transition-all duration-300">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-white font-semibold text-lg">{item.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface FeaturedProductsCardsProps {
  products: { node: DocumentType<typeof ProductCardFragment> }[];
}

function FeaturedProductsCards({ products }: FeaturedProductsCardsProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            Populaires
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Matériel en vedette
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Les équipements les plus demandés pour vos événements, disponibles à
            la location dès maintenant.
          </p>
        </div>
        <Link
          href="/shop"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "rounded-full self-start md:self-auto",
          )}
        >
          Voir tout le catalogue →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        <Suspense
          fallback={[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={`Product-Skeleton-${index}`} />
          ))}
        >
          {products.map(({ node }) => (
            <ProductCard key={`product-card-${node.id}`} product={node} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function CollectionGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-h-none lg:max-h-[600px]">
        <div className="relative col-span-1 lg:col-span-2 h-[400px] lg:h-full rounded-2xl overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Mariage en extérieur"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
              Mariages & Réceptions
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Créez l&apos;ambiance
              <br />
              parfaite
            </h3>
            <p className="text-white/70 max-w-md mb-8">
              Chapiteaux élégants, mobilier design et décoration pour un mariage
              inoubliable.
            </p>
            <Link
              href="/collections/tentes-structures"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-fit px-8",
              )}
            >
              Découvrir
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 h-full">
          <div className="relative flex-1 min-h-[250px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Stand d'exposition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h4 className="text-white font-display text-xl font-semibold">
                Salons & Expositions
              </h4>
              <p className="text-white/60 text-sm mt-1">
                Stands modulaires professionnels
              </p>
            </div>
          </div>

          <div className="relative flex-1 min-h-[250px] rounded-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Festival en plein air"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h4 className="text-white font-display text-xl font-semibold">
                Festivals & Événements
              </h4>
              <p className="text-white/60 text-sm mt-1">
                Structures grand format
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferentFeatureCards() {
  const features = [
    {
      Icon: Icons.truck,
      title: "Livraison & Installation",
      description:
        "Nous livrons, installons et récupérons le matériel sur votre site événementiel.",
    },
    {
      Icon: Icons.tag,
      title: "Tarifs Transparents",
      description:
        "Prix à la journée, à la semaine ou au week-end. Devis gratuit et sans engagement.",
    },
    {
      Icon: Icons.shield,
      title: "Matériel Premium",
      description:
        "Équipements professionnels entretenus et contrôlés avant chaque location.",
    },
    {
      Icon: Icons.clock,
      title: "Réactivité 24h",
      description:
        "Devis sous 24h, support dédié et flexibilité pour vos dates et besoins.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          Pourquoi LocaEvent ?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Un service complet de location pour que vous puissiez vous concentrer
          sur l&apos;essentiel : votre événement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ Icon, title, description }, index) => (
          <div
            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300"
            key={`FeatureCards_${index}`}
          >
            <div className="flex justify-center items-center w-14 h-14 mx-auto mb-5 rounded-xl bg-accent/10">
              <Icon width={28} height={28} className="text-accent" />
            </div>
            <h4 className="font-display text-lg font-semibold mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="my-16 md:my-24 rounded-3xl overflow-hidden bg-primary relative">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop"
          fill
          className="object-cover"
          alt=""
        />
      </div>
      <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
          Prêt à organiser votre événement ?
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
          Contactez-nous pour un devis personnalisé. Notre équipe vous
          accompagne de A à Z dans la location de votre matériel.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-6 text-base font-semibold",
            )}
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/shop"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-primary-foreground/30 text-primary-foreground rounded-full px-10 py-6 hover:bg-primary-foreground/10",
            )}
          >
            Parcourir le catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
