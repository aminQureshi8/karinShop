import { useState } from "react";

export default function Features({
  features,
  id,
}: {
  features: any;
  id: string;
}) {
  const [feaState, setFeaState] = useState(features);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(Infinity);

  const getFea = async () => {
    const res = await fetch(`/api/product/${id}/${page + 1}`);
    const result = await res.json();

    if (!res.ok) return;

    setFeaState((prev: any) => [...prev, ...result.features]);
    setTotal(result.total);
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      {feaState.map((feature: any, index: number) => (
        <div key={index} className="mb-3 flex items-center justify-around pb-2">
          <h4 className="font-bold mb-2">{feature.name}</h4>
          <p>{feature.value}</p>
        </div>
      ))}

      {feaState.length < total && (
        <button onClick={getFea} className="text-blue-500 cursor-pointer">
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}
