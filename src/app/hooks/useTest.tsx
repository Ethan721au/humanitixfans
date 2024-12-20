"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useCart } from "./useCart";

type TestContextType = {
  cart: any;
  setVariable: (variable: any) => void;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart } = useCart();
  console.log(cart, "cart");
  const [variable, setVariable] = useState(
    cart?.lines[1]?.merchandise.product.handle
  );
  console.log(variable, "variable");
  const value = useMemo(
    () => ({
      cart,
      setVariable,
    }),
    []
  );

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export function useTest() {
  const context = useContext(TestContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
