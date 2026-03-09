"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { setCart } from "./slices/Cart/Cart";
import { setWhish } from "./slices/Whish/Whish";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWhish = localStorage.getItem("whish");

    if (savedCart) {
      store.dispatch(setCart(JSON.parse(savedCart)));
    }

    if (savedWhish) {
      store.dispatch(setWhish(JSON.parse(savedWhish)));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
