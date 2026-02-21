import React from "react";

export default function Comments({ comments }: { comments: any }) {
  return (
    <div className="d divide-y-2 space-y-4 divide-gray-200 dark:divide-gray-700">
      {comments.map((com: any) => (
        <div className="flex flex-col gap-3 pb-4">
          <h2>{com.title}</h2>
          <div>
            <div>
              {com.isApproved ? (
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
    </div>
  );
}
