// "use client";

// import { useParams } from "next/navigation";
// import { createContext, useContext, useMemo } from "react";

// type ProductState = {
//   [key: string]: string;
// } & {
//   image?: string;
// };

// type ProductContextType = {
//   state: ProductState;
//   updateOption: (name: string, value: string) => ProductState;
//   updateImage: (index: string) => ProductState;
// };

// const ProductContext = createContext<ProductContextType | undefined>(undefined);

// export const ProductProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const params = useParams();

//   const value = useMemo(
//     () => ({
//       params,
//       // state,
//       // updateOption,
//       // updateImage,
//     }),
//     [params]
//   );

//   return (
//     <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
//   );
// };

// export function useProduct() {
//   const context = useContext(ProductContext);

//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }

//   return context;
// }
