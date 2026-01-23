import CartNavbar from "@/components/module/CartNavbar/CartNavbar";
import ListMenu from "@/components/module/ListMenu/ListMenu";
import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";
import SearchMobile from "@/components/module/SearchMobile/SearchMobile";
import SearchMobileMenu from "@/components/module/SearchMobileMenu/SearchMobileMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MenuMobileJSX />
      <SearchMobileMenu />
      <Navbar />
      <ListMenu />
      <SearchMobile />
      <CartNavbar/>
      {children}
    </>
  );
}
