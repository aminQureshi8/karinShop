import CartNavbar from "@/components/module/CartNavbar/CartNavbar";
import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";
import SearchMobile from "@/components/module/SearchMobile/SearchMobile";
import SearchMobileMenu from "@/components/module/SearchMobileMenu/SearchMobileMenu";
import ListMenuContainer from "@/components/module/ListMenu/ListMenuContainer";
import { Suspense } from "react";
import MenuSkeleton from "@/components/loading/SkeletonMenu";

export const metadata = {
  title: "فروشگاه اینترنتی کارین شاپ | خرید لوازم دیجیتال، آرایشی و بهداشتی",
  description:
    "کارین شاپ، فروشگاه آنلاین خرید لوازم دیجیتال، گوشی موبایل، لپ تاپ، لوازم آرایشی و بهداشتی، تجهیزات شخصی، لوازم جانبی و هزاران محصول با بهترین قیمت و ارسال سریع. ساخته شده توسط فلان شخص",
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
  authors: [
    {
      name: "Amin Qureyshi",
      url: "https://example.com",
    },
  ],
  openGraph: {
    title: "فروشگاه اینترنتی کارین شاپ | خرید بهترین کالاها",
    description:
      "خرید آسان لوازم دیجیتال، آرایشی و بهداشتی با بهترین قیمت و تنوع بالا از کارین شاپ. ساخته شده توسط فلان شخص",
    url: "https://example.com",
    siteName: "کارین شاپ",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کارین شاپ | فروشگاه آنلاین",
    description:
      "فروشگاه اینترنتی خرید لوازم دیجیتال، آرایشی و بهداشتی با بهترین قیمت. ساخته شده توسط فلان شخص",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<></>}>
        <MenuMobileJSX isAdmin={false} />
      </Suspense>
      <SearchMobileMenu />
      <Navbar />
      <Suspense fallback={<MenuSkeleton />}>
        <ListMenuContainer />
      </Suspense>
      <SearchMobile />
      <CartNavbar />
      {/* <NotificationInit/> */}
      {children}
    </>
  );
}
