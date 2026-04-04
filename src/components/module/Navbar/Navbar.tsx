import Search from "./Search/Search";
import Logo from "./Logo/Logo";
import Buttons from "./Buttons/Buttons";
import NavbarResponsive from "./NavbarResponsive";
import Providers from "@/app/redux/Providers";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between container mx-auto max-lg:hidden pt-3 font-danaMed">
        <div>
          <Search />
        </div>
        <div>
          <Logo />
        </div>
        <div>
          <Providers>
            <Buttons />
          </Providers>
        </div>
      </div>

      <div className="lg:hidden">
        <NavbarResponsive />
      </div>
    </>
  );
};

export default Navbar;
