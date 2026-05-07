"use client";

import { useEffect, useState } from "react";
import ConBlogs from "./ConBlogs/ConBlogs";

export default function ContainerWebLog() {
  const [blogs, setBlogs] = useState([]);

  const [checkType, setCheckType] = useState("all");
  const [listType, setListType] = useState("pop");

  useEffect(() => {
    getAndFilterBlogs();
  }, []);

  const getAndFilterBlogs = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setBlogs(data);
  };

  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="max-sm:col-span-12 col-span-3">
        <div>
          {/* <FilterCom */}
          {/* setListType={setListType}
          checkType={checkType}
          setCheckType={setCheckType}
          inStock={inStock}
          setInStock={setInStock}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          minLimit={minLimit}
          maxLimit={maxLimit}
          step={1000} */}
          {/* /> */}
        </div>
      </div>
      <div className="max-sm:col-span-12 max-sm:row-start-1 col-span-9">
        <ConBlogs
          blogs={JSON.parse(JSON.stringify(blogs))}
          //   listType={listType}
          //   setListType={setListType}
        />
      </div>
    </div>
  );
}
