import SideBar from "@/components/module/admin/SideBar/SideBar";
import ListMenu from "@/components/module/ListMenu/ListMenu";
import MenuMobileJSX from "@/components/module/MenuMobile/MenuMobileJSX";
import Navbar from "@/components/module/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ListMenu />
      <MenuMobileJSX />

      <div className="container mx-auto font-danaMed">
        <div className="grid grid-cols-12 gap-5  mt-5">
          <div className="max-md:hidden md:col-span-3">
            <SideBar />
          </div>
          <div className="col-span-12 md:col-span-9">{children}</div>
        </div>
      </div>
    </>
  );
}
