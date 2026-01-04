import MenuMobileJSX from "@/module/MenuMobile/MenuMobileJSX";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <MenuMobileJSX/>
  {children}</>;
}
