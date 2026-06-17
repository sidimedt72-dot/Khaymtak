"use client";

import { SupabaseAuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import UrqlProvider from "./UrqlProvider";

export default function CustomProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseAuthProvider>
        <UrqlProvider>{children}</UrqlProvider>
      </SupabaseAuthProvider>
    </ThemeProvider>
  );
}
