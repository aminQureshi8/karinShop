import React from "react";

export default function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <div className="relative overflow-x-auto bg-neutral-primary-soft rounded-lg shadow-xs rounded-base border border-gray-200 dark:border-gray-700 border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          {children}
        </table>
      </div>
    </div>
  );
}
