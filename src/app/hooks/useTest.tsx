import { createContext, useContext } from "react";

const TestContext = createContext<number | undefined>(undefined);

export const TestProvider = ({ children }) => {
  const value = 4;
  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export function useTest() {
  const context = useContext(TestContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
