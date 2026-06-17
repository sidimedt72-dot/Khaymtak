"use client";

import { CartItems, useCartStore } from "@/features/carts";
import { useToast } from "@/components/ui/use-toast";
import { AuthUser, Session } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase/client";
import useWishlistStore from "@/features/wishlists/useWishlistStore";

type SupabaseAuthContextType = {
  user: AuthUser | null;
  session: Session | null;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
  user: null,
  session: null,
});

export const useAuth = () => {
  const client = useContext(SupabaseAuthContext);
  return client;
};

interface SupabaseAuthProviderProps {
  children: React.ReactNode;
}

export const SupabaseAuthProvider: React.FC<SupabaseAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const removeAllCartStorage = useCartStore((s) => s.removeAllProducts);
  const setWishlist = useWishlistStore((s) => s.setWishlist);
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      switch (_event) {
        case "INITIAL_SESSION":
          break;
        case "PASSWORD_RECOVERY":
          supabase.auth.signOut();
          setUser(null);
          break;

        case "SIGNED_IN": {
          const signedInUser = session?.user;
          if (!signedInUser) break;

          const { cart } = JSON.parse(
            localStorage.getItem("cart") ?? '{"cart":{}}',
          ) as {
            cart: CartItems;
          };

          const storageCarts = Object.entries(cart).map(
            ([productId, productValue]) => ({
              id: nanoid(),
              productId,
              quantity: productValue.quantity,
              userId: signedInUser.id,
            }),
          );

          supabase
            .from("carts")
            .insert(storageCarts)
            .then((data) => {
              // console.log("sync Cart Data Res", data)
            });

          supabase
            .from("wishlist")
            .select()
            .eq("user_id", signedInUser.id)
            .then((data) => {
              const wishlistItems = {};

              data?.data?.forEach((item) => {
                wishlistItems[item.product_id] = {
                  createdAt: item.created_at,
                  updatedAt: item.create_at,
                };
              });

              setWishlist(wishlistItems);
            });

          toast({
            title: "Welcome Back.",
            description: "Your are arleady signed in.",
          });
          break;
        }
        case "SIGNED_OUT":
          setUser(null);
          removeAllCartStorage();
          break;

        case "TOKEN_REFRESHED":
        case "USER_UPDATED":
        case "MFA_CHALLENGE_VERIFIED":
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseAuthContext.Provider value={{ user, session }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};
