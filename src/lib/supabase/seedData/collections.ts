import db from "../db";
import * as schema from "../schema";

const collections = [
  {
    id: "1",
    label: "Tentes & Structures",
    slug: "tentes-structures",
    title: "Tentes, Chapiteaux & Structures",
    description:
      "Structures modulaires, chapiteaux et tentes pour tous types d'événements en extérieur. Installation et démontage inclus.",
    featuredImageId: "1",
    order: 10,
  },
  {
    id: "2",
    label: "Mobilier",
    title: "Mobilier Événementiel",
    slug: "mobilier",
    description:
      "Tables, chaises, canapés, bars et mobilier lounge pour créer l'ambiance parfaite à votre événement.",
    featuredImageId: "2",
    order: 9,
  },
  {
    id: "3",
    label: "Stands & Scénographie",
    title: "Stands & Éléments de Scénographie",
    slug: "stands-scenographie",
    description:
      "Stands d'exposition modulaires, kakémonos, comptoirs et éléments de scénographie pour salons professionnels.",
    featuredImageId: "3",
    order: 8,
  },
  {
    id: "4",
    label: "Éclairage & Son",
    title: "Éclairage & Équipements Son",
    slug: "eclairage-son",
    description:
      "Éclairage d'ambiance, projecteurs, enceintes et équipements audiovisuels pour sublimer votre événement.",
    featuredImageId: "4",
    order: 7,
  },
];

const seedCollections = async () => {
  try {
    await db.delete(schema.collections);

    const insertedCollections = await db
      .insert(schema.collections)
      .values(collections)
      .onConflictDoNothing()
      .returning();
    if (insertedCollections != null)
      console.log(`collections are added to the DB.`);
  } catch (err) {
    console.log("Error happen while inserting collections", err);
  }
};

export default seedCollections;
