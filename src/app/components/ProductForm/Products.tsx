"use client";

import { Product, ProductVariant } from "@/app/lib/shopify/types";
import { Input, InputTypes } from "./Input/Input";

import { ProductWrapper } from "./styled";
import { useState } from "react";
import { getProduct } from "@/app/lib/shopify";

export default function Products({
  products,
  type,
  name,
}: {
  products: Product[] | ProductVariant[];
  type: InputTypes;
  name: string;
}) {
  const defaultCheckedItems = Object.fromEntries(
    products.map((p) => [p.id, false])
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [checkedItems, setCheckedItems] = useState(defaultCheckedItems);

  const handleItemChecked =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: e.target.checked,
      }));
    };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "comic-books") {
      const product = await getProduct(e.target.value);
      setProduct(product);
      return;
    }
    setProduct(null);
  };

  return (
    <ProductWrapper name={name}>
      {name !== "send-in-item" &&
        name !== "addOns" &&
        products.map((product) => (
          <Input
            product={product}
            key={product.id}
            type={type}
            name={name}
            label={product.title}
            value={product.title}
          />
        ))}
      {name === "send-in-item" && (
        <Input
          products={products}
          type="text"
          onChange={handleChange}
          name={name}
          label={name}
        />
      )}
      {product && product.variants.length > 0 && (
        <Input
          products={product?.variants}
          type="text"
          name="variant"
          label={product?.options[0].name}
        />
      )}
      {name == "addOns" &&
        products.map((addOn) => (
          <div key={addOn.id}>
            <Input
              product={addOn}
              type={type}
              label={addOn.title}
              onChange={handleItemChecked(addOn.id)}
            />
            {checkedItems[addOn.id] && (
              <Input label={`${addOn.title} *`} name={addOn.id} type="text" />
            )}
          </div>
        ))}
    </ProductWrapper>
  );
}
