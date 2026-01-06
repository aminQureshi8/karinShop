
import ThemeChange from "./ThemeChange";
import UserNavbar from "./UserNavbar";
import Cart from "./Cart";
export default function Buttons() {
  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        <UserNavbar />
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
