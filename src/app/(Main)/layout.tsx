import CartNavbar from "@/components/module/CartNavbar/CartNavbar";
import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";
import SearchMobile from "@/components/module/SearchMobile/SearchMobile";
import SearchMobileMenu from "@/components/module/SearchMobileMenu/SearchMobileMenu";
import ListMenuContainer from "@/components/module/ListMenu/ListMenuContainer";
import Providers from "../redux/Providers";

export const metadata = {
  title: "فروشگاه اینترنتی دیجی‌مارکت | خرید لوازم دیجیتال، آرایشی و بهداشتی",
  description:
    "دیجی‌مارکت، فروشگاه آنلاین خرید لوازم دیجیتال، گوشی موبایل، لپ تاپ، لوازم آرایشی و بهداشتی، تجهیزات شخصی، لوازم جانبی و هزاران محصول با بهترین قیمت و ارسال سریع.",
  keywords: [
    "خرید آنلاین",
    "فروشگاه اینترنتی",
    "لوازم دیجیتال",
    "آرایشی",
    "بهداشتی",
    "گوشی موبایل",
    "لپ تاپ",
    "خرید لوازم جانبی",
    "بهترین قیمت",
    "ارسال سریع",
  ],
  openGraph: {
    title: "فروشگاه اینترنتی دیجی‌مارکت | خرید بهترین کالاها",
    description:
      "خرید آسان لوازم دیجیتال، آرایشی و بهداشتی با بهترین قیمت و تنوع بالا از دیجی‌مارکت.",
    url: "https://example.com",
    siteName: "دیجی‌مارکت",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دیجی‌مارکت | فروشگاه آنلاین",
    description:
      "فروشگاه اینترنتی خرید لوازم دیجیتال، آرایشی و بهداشتی با بهترین قیمت.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <MenuMobileJSX />
        <SearchMobileMenu />
        <Navbar />
        <ListMenuContainer />
        <SearchMobile />
        <CartNavbar />
      </Providers>
      {/* <NotificationInit/> */}
      {children}
    </>
  );
}
