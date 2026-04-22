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
    <div className="w-full">
      <div className="divide-y border rounded-xl overflow-hidden
        border-gray-200 dark:border-gray-700">

        {feaState.map((feature: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-2 px-4 py-3 text-sm
            bg-white even:bg-gray-50
            dark:bg-gray-900 dark:even:bg-gray-800"
          >
            <span className="text-gray-500 dark:text-gray-400">
              {feature.name}
            </span>

            <span className="font-medium text-gray-800 dark:text-gray-200">
              {feature.value}
            </span>
          </div>
        ))}
      </div>

      {feaState.length < total && (
        <button
          onClick={getFea}
          className="mt-4 font-medium text-blue-600 hover:text-blue-800
          dark:text-blue-400 dark:hover:text-blue-300"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}
