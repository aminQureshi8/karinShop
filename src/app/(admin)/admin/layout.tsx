import SideBar from "@/components/module/admin/SideBar/SideBar";
import ListMenu from "@/components/module/ListMenu/ListMenu";
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

      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-5  mt-5">
          <div className="col-span-3">
            <SideBar />
          </div>
          <div className="col-span-7">{children}</div>
        </div>
      </div>
    </>
  );
}
