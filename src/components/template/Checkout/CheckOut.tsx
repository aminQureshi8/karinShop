
import CheckOutForm from "./Form/CheckOutForm";

export default function CheckOut({id} : {id : string}) {
  return (
    <div className="mt-8">
      <CheckOutForm id={id} />
    </div>
  );
}
