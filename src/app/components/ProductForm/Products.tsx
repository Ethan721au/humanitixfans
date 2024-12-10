import { Product } from "@/app/lib/shopify/types";
import { Input, InputTypes } from "./Input/Input";

import { ProductWrapper } from "./styled";

export default function Products({
  products,
  type,
  name,
}: {
  products: Product[];
  type: InputTypes;
  name: string;
}) {
  return (
    <ProductWrapper name={name}>
      {products
        .filter((p) => p.productType === "")
        .map((product) => (
          <Input
            product={product}
            key={product.id}
            type={type}
            name={name}
            label={product.title}
          />
        ))}
    </ProductWrapper>
  );
}
