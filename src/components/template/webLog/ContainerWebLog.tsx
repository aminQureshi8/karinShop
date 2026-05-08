"use client";

import { useEffect, useState } from "react";
import ConBlogs from "./ConBlogs/ConBlogs";
import FilterBlog from "./Filter/FilterCom";

export default function ContainerWebLog() {
  const [blogs, setBlogs] = useState([]);

  const [checkType, setCheckType] = useState("all");
  const [listType, setListType] = useState("pop");

  useEffect(() => {
    const getAndFilterBlogs = async (listType: string) => {
      const res = await fetch(`/api/blog/filter?filter=${listType}`);
      const data = await res.json();
      setBlogs(data);
    };

    getAndFilterBlogs(listType);
  }, [listType]);

  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="max-sm:col-span-12 col-span-3">
        <div>
          <FilterBlog />
        </div>
      </div>
      <div className="max-sm:col-span-12 max-sm:row-start-1 col-span-9">
        <ConBlogs
          blogs={JSON.parse(JSON.stringify(blogs))}
          listType={listType}
          setListType={setListType}
        />
      </div>
    </div>
  );
}
