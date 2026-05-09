"use client";

import { useEffect, useState } from "react";
import ConBlogs from "./ConBlogs/ConBlogs";
import FilterBlog from "./Filter/FilterCom";
import Pagination from "@/components/module/Pagination/Pagination";

export default function ContainerWebLog() {
  const [blogs, setBlogs] = useState([]);

  const [checkType, setCheckType] = useState("all");
  const [listType, setListType] = useState("pop");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getAndFilterBlogs = async () => {
    try {
      const res = await fetch(
        `/api/blog/filter?filter=${listType}&category=${checkType}&page=${currentPage}`,
      );
      const data = await res.json();
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);

      console.log(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAndFilterBlogs();
  }, [listType, checkType, currentPage]);

  return (
    <div className="grid grid-cols-12 gap-5 mt-5">
      <div className="max-sm:col-span-12 col-span-3">
        <div>
          <FilterBlog
            checkType={checkType}
            setCheckType={setCheckType}
            setListType={setListType}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="max-sm:col-span-12 max-sm:row-start-1 col-span-9">
        
        <ConBlogs
          blogs={JSON.parse(JSON.stringify(blogs))}
          listType={listType}
          setListType={setListType}
          isLoading={isLoading}
        />
        {totalPages !== 0 && !(totalPages === 1) && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
