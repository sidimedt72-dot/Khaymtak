# LocaEvent — Location de matériel événementiel

Plateforme de location de matériel événementiel (tentes, stands, mobilier, éclairage...) basée sur [HiyoRi E-commerce](https://github.com/smile101603/HiyoRi-Ecommerce-Nextjs-Supabase).

## Stack technique

- **Next.js 14** (App Router)
- **Supabase** (auth + base de données)
- **GraphQL** (urql)
- **Drizzle ORM**
- **Stripe** (paiements)
- **Shadcn UI** + **Tailwind CSS**
- **AWS S3** (upload médias)

## Démarrage rapide

### 1. Prérequis

- Node.js 18+
- Compte [Supabase](https://supabase.com)
- Compte [Stripe](https://stripe.com) (paiements)
- Bucket AWS S3 (images)

### 2. Installation

```bash
cd event-rental-platform
npm install
cp .env.example .env
```

### 3. Configuration `.env`

Remplissez toutes les variables dans `.env` :

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase |
| `DATABASE_URL` | URL PostgreSQL (Supabase) |
| `DATABASE_SERVICE_ROLE` | Clé service role Supabase |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe |
| `NEXT_PUBLIC_S3_BUCKET` | Nom du bucket S3 |
| `NEXT_PUBLIC_S3_REGION` | Région AWS |
| `S3_ACCESS_KEY_ID` | Clé d'accès AWS |
| `S3_SECRET_ACCESS_KEY` | Clé secrète AWS |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |

### 4. Base de données

```bash
npm run db:push    # Créer les tables
npm run db:seed    # Insérer les données de démo
npm run codegen    # Générer les types GraphQL
```

### 5. Lancer le serveur

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Catégories de matériel (seed data)

- **Tentes & Structures** — Chapiteaux, tentes modulaires
- **Mobilier** — Tables, chaises, lounge
- **Stands & Scénographie** — Stands d'exposition
- **Éclairage & Son** — Projecteurs, enceintes

## Design

Identité visuelle **LocaEvent** :
- Palette navy + or/ambre
- Typographie : DM Sans + Playfair Display
- Homepage orientée location événementielle
- Images Unsplash pour la démo

## Structure du projet

```
src/
├── app/(store)/     # Pages publiques (accueil, catalogue, panier)
├── app/(admin)/     # CMS admin
├── app/(auth)/      # Connexion / inscription
├── components/      # Composants UI partagés
├── features/        # Modules métier (products, carts, search...)
├── config/          # Configuration site (navigation, branding)
└── lib/             # Utilitaires, Supabase, Stripe, S3
```

## Prochaines étapes suggérées

- [ ] Configurer Supabase + Stripe + S3
- [ ] Adapter le flux panier → réservation avec dates
- [ ] Ajouter un calendrier de disponibilité par produit
- [ ] Personnaliser les images (remplacer Unsplash par vos photos)
- [ ] Traduire les pages admin en français

## Licence

MIT — Basé sur le projet HiyoRi original.
