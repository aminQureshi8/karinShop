import React from "react";
import Search from "./Search/Search";

function Navbar() {
  return (
    <div className="flex justify-between pt-3">
      <div>
        <Search/>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Navbar;
