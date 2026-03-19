"use client";

import { createContext, useContext, useState } from "react";

const BrandContext = createContext<any>(null);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandState, setBrandState] = useState([]);

  return (
    <BrandContext.Provider value={{ brandState, setBrandState }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
