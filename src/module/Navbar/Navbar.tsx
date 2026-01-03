import React from "react";
import Search from "./Search/Search";
import Logo from "./Logo/Logo";
import Buttons from "./Buttons/Buttons";

function Navbar() {
  return (
    <div className="flex justify-between pt-3">
      <div>
        <Search />
      </div>
      <div>
        <Logo />
      </div>
      <div>
        <Buttons />
      </div>
    </div>
  );
}

export default Navbar;
