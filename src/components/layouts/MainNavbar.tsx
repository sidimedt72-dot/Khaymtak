import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { CartLink, CartNav } from "../../features/carts";
import { UserNav } from "@/features/auth";
import { Icons } from "./icons";
import Branding from "./Branding";
import MobileNavbar from "./MobileNavbar";
import SearchInput from "./SearchInput";
import { SideMenu } from "./SideMenu";
import { ThemeToggle } from "./ThemeToggle";
import NavbarShell from "./NavbarShell";

interface MainNavbarProps {
  adminLayout?: boolean;
}

async function MainNavbar({ adminLayout = false }: MainNavbarProps) {
  return (
    <NavbarShell className={cn(!adminLayout && "max-md:hidden")}>
      <div
        className={cn(
          adminLayout
            ? "mx-auto px-[3rem] max-w-[2500px] py-3"
            : "container py-4",
        )}
      >
        <div className="hidden md:flex gap-x-8 justify-between items-center">
          {/* Menu & branding */}
          <div className="flex gap-x-4 items-center">
            <SideMenu />
            <Branding />
          </div>

          {adminLayout ? (
            <></>
          ) : (
            <div className="flex-1 max-w-md mx-auto">
              <Suspense>
                <SearchInput />
              </Suspense>
            </div>
          )}

          {/* Nav Action */}
          <div className="flex gap-x-5 relative items-center">
            <ThemeToggle />

            <Suspense>
              <UserNav />
            </Suspense>

            <Link href={"/wish-list"} aria-label="Liste de souhaits">
              <Icons.heart className="w-[18px] h-[18px] transition-colors hover:text-accent" />
            </Link>

            <Suspense fallback={<CartLink productCount={0} />}>
              {!adminLayout && <CartNav />}
            </Suspense>
          </div>
        </div>

        <MobileNavbar adminLayout={adminLayout} />
      </div>
    </NavbarShell>
  );
}

export default MainNavbar;
