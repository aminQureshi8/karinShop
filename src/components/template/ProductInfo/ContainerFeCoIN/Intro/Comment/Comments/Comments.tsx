"use client";

import { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";
export default function Comments({
  comments,
  id,
  userID,
}: {
  comments: any;
  id: string;
  userID: string;
}) {
  const [commentState, setCommentState] = useState([...comments]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(Infinity);
  // const [isOk, setIsOk] = useState(true);
  const [isUserCommented, setIsUserCommented] = useState("");

  const getComments = async () => {
    const res = await fetch(`/api/comments/${id}/${page + 1}`);
    const result = await res.json();

    if (!res.ok) return;

    setCommentState((prev: any) => [...prev, ...result.comments]);

    setTotal(result.total);
    setPage((prev) => prev + 1);
  };

  const rateUser = async (id: string, isOk: boolean) => {
    const res = await fetch(
      `/api/comments/${id}?isLike=${isOk}&user=${userID}`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );

  

    const data = await res.json();

  

    if (res.ok) {
      if (!data.isOk) {
        setCommentState((pre) =>
          pre.map((c) =>
            c._id === id ? { ...c, dislikesCount: c.dislikesCount + 1 } : c,
          ),
        );
      } else {
        setCommentState((pre) =>
          pre.map((c) =>
            c._id === id ? { ...c, likesCount: c.likesCount + 1 } : c,
          ),
        );
      }
    }

    if (res.status === 400) {
      setIsUserCommented(data.ok ? "ok" : "not");
    }
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
                <p className="text-sm leading-8">{com.comment}</p>
              </div>
              <div className="flex items-center justify-between dark:text-gray-400">
                <div className="flex items-center gap-3 text-xs">
                  <p>
                    {com.user.email
                      .slice(0, 5)
                      .padEnd(com.user.email.length, "*")}
                  </p>

                  <p>{new Date(com.createdAt).toLocaleDateString("fa-IR")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs">
                      <p>آیا این دیدگاه برایتان مفید بود؟</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1">
                        <p className="text-red-500 ss02">{com.dislikesCount}</p>
                        <div
                          className="rounded-lg p-2 cursor-pointer"
                          onClick={() => {
                            rateUser(com._id, false);
                          }}
                        >
                          <BiDislike size={19} className="text-red-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-green-500 ss02">{com.likesCount}</p>
                        <div
                          className={` ${isUserCommented === "ok" && "border border-green-500"} rounded-lg p-2 cursor-pointer`}
                          onClick={() => {
                            rateUser(com._id, true);
                          }}
                        >
                          <BiLike size={19} className="text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {commentState.length > total && (
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
