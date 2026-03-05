"use client";

import { useState } from "react";
import { FaRegSadTear } from "react-icons/fa";
export default function Comments({
  comments,
  id,
}: {
  comments: any;
  id: string;
}) {
  const [commentState, setCommentState] = useState([...comments]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(Infinity);

  const getComments = async () => {
    const res = await fetch(`/api/comments/${id}/${page + 1}`);
    const result = await res.json();


    if (!res.ok) return;

    setCommentState((prev: any) => [...prev, ...result.comments]);
    setTotal(result.total);
    setPage((prev) => prev + 1);
  };
  return (
    <>
      {commentState.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            <p>دیدگاهی وجود ندارد</p>
            <FaRegSadTear size={20} />
          </div>
        </div>
      ) : (
        <div className="divide-y-2 space-y-4 divide-gray-200 dark:divide-gray-700">
          {commentState.map((com: any) => (
            <div key={com._id} className="flex flex-col gap-3 pb-4">
              <h2>{com.title}</h2>
              <div>
                <div>
                  {com.isOk ? (
                    <div className="text-green-500">پیشنهاد می شود</div>
                  ) : (
                    <div className="text-red-500">پیشنهاد نمی شود</div>
                  )}
                </div>
              </div>
              <div>
                <p>{com.comment}</p>
              </div>
              <div>
                <p></p>
                <p>{com.createdAt.toString().slice(10, 30)}</p>
              </div>
            </div>
          ))}

          {commentState.length !== 0 && commentState.length < total && (
            <button
              onClick={getComments}
              className="text-blue-500 cursor-pointer"
            >
              مشاهده بیشتر
            </button>
          )}
        </div>
      )}
    </>
  );
}
