import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { DocumentType, gql } from "@/gql";
import { cn, keytoUrl } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddToCartButton } from "@/features/carts";
import { AddToWishListButton } from "@/features/wishlists";
import { Rating } from "@/components/ui/rating";
import { BadgeType } from "@/lib/supabase/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/layouts/icons";

type CardProps = React.ComponentProps<typeof Card>;

export type ProductCardProps = CardProps & {
  product: DocumentType<typeof ProductCardFragment>;
};

export const ProductCardFragment = gql(/* GraphQL */ `
  fragment ProductCardFragment on products {
    id
    name
    description
    rating
    slug
    badge
    price
    featuredImage: medias {
      id
      key
      alt
    }
    collections {
      id
      label
      slug
    }
  }
`);

export function ProductCard({
  className,
  product,
  ...props
}: ProductCardProps) {
  const { id, name, slug, featuredImage, badge, price } = product;

  return (
    <Card
      className={cn("group w-full border-0 rounded-none bg-transparent shadow-none py-0", className)}
      {...props}
    >
      <CardContent className="relative mb-5 overflow-hidden rounded-2xl bg-secondary p-0 shadow-luxe">
        <Link href={`/shop/${slug}`}>
          <Image
            src={keytoUrl(featuredImage.key)}
            alt={featuredImage.alt}
            width={400}
            height={400}
            className="aspect-square w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        {badge && (
          <Badge
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-luxe backdrop-blur-sm"
            variant={badge as BadgeType}
          >
            {badge}
          </Badge>
        )}

        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Suspense
            fallback={
              <Button className="h-9 w-9 rounded-full p-0" disabled>
                <Icons.basket className="h-4 w-4" />
              </Button>
            }
          >
            <AddToCartButton productId={id} />
          </Suspense>
        </div>
      </CardContent>

      <CardHeader className="mb-2 p-0">
        <CardTitle className="font-display text-xl font-medium md:text-2xl">
          <Link href={`/shop/${slug}`} className="transition-colors hover:text-accent">
            {name}
          </Link>
        </CardTitle>

        <div className="hidden md:block">
          <CardDescription className="line-clamp-1 max-w-[240px]">
            {product.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="flex items-center justify-between gap-x-2 p-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[10px] uppercase tracking-luxe text-muted-foreground">
            dès
          </span>
          <span className="text-base font-semibold">{price}€</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <Rating value={product.rating} precision={0.5} readOnly />
          </div>
          <Suspense
            fallback={
              <Button className="rounded-full p-3" variant="ghost" disabled>
                <Icons.heart className={"h-4 w-4 fill-none"} />
              </Button>
            }
          >
            <AddToWishListButton productId={product.id} />
          </Suspense>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
