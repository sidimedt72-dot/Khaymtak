import db from "../db";
import * as schema from "../schema";
import { InsertProducts } from "../schema";

const products: InsertProducts[] = [
  {
    id: "1",
    name: "Chapiteau 10x20m",
    slug: "chapiteau-10x20",
    description: `Chapiteau professionnel de 200m², idéal pour mariages et réceptions. Structure aluminium, toile PVC blanche, parois latérales incluses. Installation et démontage par nos équipes.`,
    featured: true,
    badge: "new_product",
    rating: "4.8",
    tags: ["tente", "mariage", "extérieur"],
    featuredImageId: "1",
    collectionId: "1",
    stock: 5,
  },
  {
    id: "2",
    name: "Table ronde 10 personnes",
    slug: "table-ronde-10",
    description: `Table ronde élégante pour 10 convives, diamètre 180cm. Nappe et housses de chaises disponibles en option. Parfaite pour réceptions et galas.`,
    rating: "4.5",
    featured: true,
    featuredImageId: "2",
    collectionId: "2",
    badge: "featured",
    stock: 50,
  },
  {
    id: "3",
    name: "Stand modulaire 3x3m",
    slug: "stand-modulaire-3x3",
    featured: true,
    description: `Stand d'exposition modulaire 9m² avec murs, comptoir d'accueil et éclairage LED intégré. Montage rapide, personnalisable avec vos visuels.`,
    rating: "4.9",
    featuredImageId: "3",
    collectionId: "3",
    stock: 12,
  },
  {
    id: "4",
    name: "Chaise Napoléon blanche",
    slug: "chaise-napoleon-blanche",
    featured: true,
    description: `Chaise Napoléon en résine blanche, empilable. L'indispensable pour tout événement chic. Coussin disponible en option.`,
    rating: "4.7",
    featuredImageId: "4",
    collectionId: "2",
    badge: "best_sale",
    stock: 200,
  },
  {
    id: "5",
    name: "Projecteur LED RGB 50W",
    slug: "projecteur-led-rgb-50w",
    featured: true,
    description: `Projecteur LED RGB télécommandé, 50W. Créez des ambiances lumineuses spectaculaires pour vos soirées et événements.`,
    rating: "4.6",
    featuredImageId: "1",
    collectionId: "4",
    badge: "best_sale",
    stock: 30,
  },
];

const seedProducts = async () => {
  try {
    await db.delete(schema.products);
    await db
      .insert(schema.products)
      .values(products)
      .onConflictDoNothing()
      .returning();
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};

export default seedProducts;
