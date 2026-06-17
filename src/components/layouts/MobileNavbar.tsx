import { Suspense } from "react";
import CartNav from "../../features/carts/components/CartNav";
import Branding from "./Branding";
import MobileSearchInput from "./MobileSearchInput";
import { SideMenu } from "./SideMenu";
import CartLink from "../../features/carts/components/CartLink";
import { ThemeToggle } from "./ThemeToggle";

type Props = { adminLayout: boolean };

function MobileNavbar({ adminLayout }: Props) {
  return (
    <div className="md:hidden flex gap-x-8 justify-between items-center h-[64px]">
      <div className="flex gap-x-3 items-center">
        <SideMenu />
        <MobileSearchInput />
      </div>

      <Branding />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Suspense fallback={<CartLink productCount={0} />}>
          {!adminLayout && <CartNav />}
        </Suspense>
      </div>
    </div>
  );
}

export default MobileNavbar;
