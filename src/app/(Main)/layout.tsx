import ListMenu from "@/module/ListMenu/ListMenu";
import MenuMobileJSX from "@/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/module/Navbar/Navbar";
import SearchMobile from "@/module/SearchMobile/SearchMobile";
import SearchMobileMenu from "@/module/SearchMobileMenu/SearchMobileMenu";

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
      {children}
    </>
  );
}
