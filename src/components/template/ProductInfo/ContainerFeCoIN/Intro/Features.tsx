import { useState } from "react";

export default function Features({ features, id }) {
  const [feaState, setFeaState] = useState([...features]);
  const [feaLength, setFeaLength] = useState(0)
  const [page, setPage] = useState(2);
  console.log("features", features);

  const getFea = async () => {
    const res = await fetch(`/api/product/${id}/${page}`);
    const result = await res.json();

    console.log(result);

    setFeaState(result.features);
    setFeaLength(result.featuresLength)
  };

  return (
    <div>
      {feaState.map((feature, index) => (
        <div key={index} className="mb-3">
          <h4 className="font-bold mb-2">{feature.name}</h4>
          <p>{feature.value}</p>
        </div>
      ))}
      {
        
      }
      <div>
        <button onClick={getFea} className="text-blue-500 cursor-pointer">
          مشاهده بیشتر
        </button>
      </div>
    </div>
  );
}
