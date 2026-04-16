import CartNavbar from "@/components/module/CartNavbar/CartNavbar";
import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";
import SearchMobile from "@/components/module/SearchMobile/SearchMobile";
import SearchMobileMenu from "@/components/module/SearchMobileMenu/SearchMobileMenu";
import ListMenuContainer from "@/components/module/ListMenu/ListMenuContainer";
import Providers from "../redux/Providers";

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
        <ListMenuContainer />
        <SearchMobile />
        <CartNavbar />
      {/* <NotificationInit/> */}
      {children}
    </>
  );
}
