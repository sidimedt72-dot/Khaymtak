import { CartSheet } from "@/features/carts";
import MainFooter from "@/components/layouts/MainFooter";
import Navbar from "@/components/layouts/MainNavbar";
import MobileTopBar from "@/components/layouts/MobileTopBar";
import MobileBottomNav from "@/components/layouts/MobileBottomNav";
import WhatsAppButton from "@/components/layouts/WhatsAppButton";
import { ReactNode } from "react";

type Props = { children: ReactNode };

async function StoreLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <MobileTopBar />

      <main className="pt-[64px] pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>

      <CartSheet />
      <MainFooter />

      {/* Clearance so footer content is not hidden behind the bottom tab bar */}
      <div className="h-safe-bottom md:hidden" aria-hidden />

      <WhatsAppButton variant="floating" />
      <MobileBottomNav />
    </>
  );
}

export default StoreLayout;
