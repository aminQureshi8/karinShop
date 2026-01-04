import ThemeChange from "./Buttons/ThemeChange";
import Logo from "./Logo/Logo";
import MenuMobile from "./MenuMobile/MenuMobile";

export default function NavbarResponsive() {
  return (
    <div className="pt-3  border-b-2 border-gray-200 dark:border-gray-700 pb-3">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <MenuMobile />
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <ThemeChange />
        </div>
      </div>
    </div>
  );
}
