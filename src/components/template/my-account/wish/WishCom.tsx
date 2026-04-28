import { BiHeart } from "react-icons/bi";
import WhishProduct from "./WishProduct";

export default function WhishCom() {
  return (
    <div className="font-danaMed">
      <div className="flex items-center gap-2">
        <BiHeart />
        <h2>محصولات مورد علاقه ی من</h2>
      </div>
      <div>
        <WhishProduct />
      </div>
    </div>
  );
}
