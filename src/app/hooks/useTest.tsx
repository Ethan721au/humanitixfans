// "use client";

// import { createContext, useContext, useMemo, useState } from "react";

// type TestContextType = {
//   variable: any;
//   setVariable: (variable: any) => void;
// };

// const TestContext = createContext<TestContextType | undefined>(undefined);

// export const TestProvider = ({ children }: { children: React.ReactNode }) => {
//   const [variable, setVariable] = useState("");
//   const value = useMemo(
//     () => ({
//       variable,
//       setVariable,
//     }),
//     []
//   );

//   return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
// };

// export function useTest() {
//   const context = useContext(TestContext);

//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }

//   return context;
// }
