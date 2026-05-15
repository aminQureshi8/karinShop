import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";
import SideBarMemo from "./SideBarMemo";
import ListMenuContainer from "@/components/module/ListMenu/ListMenuContainer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ListMenuContainer />
      <Suspense fallback={<></>}>
        <MenuMobileJSX isAdmin={true} />
      </Suspense>

      <div className="container mx-auto font-danaMed">
        <div className="grid grid-cols-12 gap-5  mt-5">
          <SideBarMemo />
          <div className="col-span-12 md:col-span-9">{children}</div>
        </div>
      </div>
    </>
  );
}
