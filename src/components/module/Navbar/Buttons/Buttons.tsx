import ThemeChange from "./ThemeChange";
import UserNavbar from "./UserNavbar";
import Cart from "./Cart";
import { Suspense } from "react";
import UserNavbarLoading from "@/components/loading/UserNavbarLoading";
export default function Buttons() {
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <Suspense fallback={<UserNavbarLoading />}>
          <UserNavbar />
        </Suspense>
      </div>
      <div>
        <ThemeChange />
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
}
