
import { BsBasketFill } from "react-icons/bs";
export default function Cart() {
  return (
    <div>
      <button className=" cursor-pointer bg-blue-600 text-white rounded-full p-2">
        <BsBasketFill size={19} />
      </button>
    </div>
  );
}
