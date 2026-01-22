"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { setCart } from "./slices/Cart/Cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      store.dispatch(setCart(JSON.parse(savedCart)));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
