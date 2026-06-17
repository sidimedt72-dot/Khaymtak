import db from "../db";
import * as schema from "../schema";

const medias = [
  {
    id: "1",
    key: "https://images.unsplash.com/photo-1519167758481-83f29da8c4f3?w=800&h=600&fit=crop",
    alt: "Tentes et chapiteaux",
  },
  {
    id: "2",
    key: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    alt: "Mobilier événementiel",
  },
  {
    id: "3",
    key: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Stands et scénographie",
  },
  {
    id: "4",
    key: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    alt: "Éclairage événementiel",
  },
];

const seedMedias = async () => {
  try {
    await db.delete(schema.medias);
    const insertedMedia = await db
      .insert(schema.medias)
      .values(medias)
      .returning();
    console.log(`Medias are added to the DB.`, insertedMedia);
  } catch (err) {
    console.log("Error happen while inserting Media", err);
  }
};
export default seedMedias;
