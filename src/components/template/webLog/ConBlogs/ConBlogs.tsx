import React from "react";
import SwiperBlog from "../../Home/SwiperBlogs/SwiperBlog";

export default function ConBlogs({ blogs }) {
  return (
    <div>
      <div className="flex items-center gap-3 max-sm:text-xs">
        <div>
          <p>مرتب سازی:</p>
        </div>
        <ul className="flex items-center max-sm:gap-3 gap-5 *:cursor-pointer transition-colors dark:text-gray-400 *:hover:text-blue-500">
          {/* {listItems.map((li, index) => (
            <li
              onClick={() => setListType(li.id)}
              className={`${li.id === listType ? "text-blue-500" : ""}`}
              key={index}
            >
              {li.name}
            </li>
          ))} */}
        </ul>
      </div>
      <div className="mt-5 w-full">
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center mt-10">
            <p>محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="grid max-sm:grid-cols-1 grid-cols-3 gap-5">
            {blogs.map((blog: any) => (
              <div key={blog._id}>
                <SwiperBlog {...blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
