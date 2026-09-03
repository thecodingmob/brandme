"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type SiteUser = {
  isLoggedIn: boolean;
  role: string;
} | null;

type SiteChromeProps = {
  children: React.ReactNode;
  user: SiteUser;
};

export default function SiteChrome({ children, user }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
