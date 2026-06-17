import { getCurrentUser, isAdmin } from "@/features/users/actions";
import MainFooter from "@/components/layouts/MainFooter";
import Navbar from "@/components/layouts/MainNavbar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode };

async function AdminLayout({ children }: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in?from=/admin/dashboard");
  }

  if (!isAdmin(currentUser)) {
    redirect("/sign-in?error=Accès admin requis");
  }

  return (
    <main>
      <Navbar adminLayout={true} />
      {children}
      <MainFooter />
    </main>
  );
}

export default AdminLayout;
