import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import postgres from "postgres";

import { env } from "@/env.mjs";

type AuthUserRow = {
  id: string;
  email: string | null;
  raw_user_meta_data: Record<string, unknown> | null;
  raw_app_meta_data: Record<string, unknown> | null;
};

const pg = postgres(env.DATABASE_URL, { prepare: false });

function mapRowToUser(row: AuthUserRow): User {
  const appMetadata = row.raw_app_meta_data ?? {};

  return {
    id: row.id,
    email: row.email ?? undefined,
    user_metadata: (row.raw_user_meta_data ?? {}) as User["user_metadata"],
    app_metadata: appMetadata as User["app_metadata"],
    role: appMetadata.isAdmin ? "admin" : "user",
    aud: "authenticated",
    created_at: "",
  } as User;
}

export function hasServiceRoleKey() {
  return Boolean(env.DATABASE_SERVICE_ROLE?.trim());
}

export function createServiceRoleClient() {
  if (!hasServiceRoleKey()) {
    throw new Error(
      "DATABASE_SERVICE_ROLE manquant dans .env — requis pour cette action admin.",
    );
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.DATABASE_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function listAuthUsers({
  page = 1,
  perPage = 10,
}: {
  page?: number;
  perPage?: number;
}) {
  const rows = await pg<AuthUserRow[]>`
    SELECT id, email, raw_user_meta_data, raw_app_meta_data
    FROM auth.users
    ORDER BY created_at DESC
    LIMIT ${perPage}
    OFFSET ${(page - 1) * perPage}
  `;

  return rows.map(mapRowToUser);
}

export async function getAuthUserById(userId: string) {
  const [row] = await pg<AuthUserRow[]>`
    SELECT id, email, raw_user_meta_data, raw_app_meta_data
    FROM auth.users
    WHERE id = ${userId}
    LIMIT 1
  `;

  if (!row) return null;

  return { user: mapRowToUser(row) };
}

export async function promoteUserToAdmin(userId: string) {
  const [row] = await pg<{ id: string; email: string | null }[]>`
    UPDATE auth.users
    SET raw_app_meta_data =
      coalesce(raw_app_meta_data, '{}'::jsonb) || '{"isAdmin": true}'::jsonb
    WHERE id = ${userId}
    RETURNING id, email
  `;

  if (!row) return null;

  await pg`
    INSERT INTO public.profiles (id, email, is_admin)
    VALUES (${row.id}, ${row.email}, true)
    ON CONFLICT (id) DO UPDATE
    SET is_admin = true, email = EXCLUDED.email
  `;

  return row;
}
