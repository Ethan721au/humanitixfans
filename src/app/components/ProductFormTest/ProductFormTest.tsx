"use client";

import { useCart } from "@/app/hooks/useCart";
import { useTest } from "@/app/hooks/useTest";
import { cartAttributes } from "@/app/lib/constants";
import { getCollectionProducts } from "@/app/lib/shopify";
import { Attributes, Collection, Product } from "@/app/lib/shopify/types";
import Form from "next/form";
import { useEffect, useState } from "react";

type CartAttribute = {
  key: string;
  label: string;
  type: string;
  value: string;
};

// type CartAttributes = {
//   [key: string]: CartAttribute[];
// };

export default function ProductFormTest({
  collection,
}: {
  collection: Collection;
}) {
  const { cart } = useTest();
  const [collectionProducts, setCollectionProducts] = useState<
    Product[] | undefined
  >(undefined);

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [selectedVariant, setSelectedVariant] = useState<string>();
  const [attributes, setAttributes] = useState<Attributes[]>([]);
  console.log(attributes, "attributes");

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      ).merchandise;
      setSelectedProduct(productLine.product.handle);
      setSelectedVariant(productLine.selectedOptions[0].value);
      setAttributes(productLine.attributes);
    }
  }, [cart]);

  useEffect(() => {
    getCollectionProducts({ collection: collection.handle }).then((products) =>
      setCollectionProducts(products)
    );
  }, [collection]);

  const addOns = collectionProducts?.filter(
    (p) => p.productType === "add-on"
  )[0];

  const products = collectionProducts?.filter(
    (p) => p.productType === "product"
  );

  const productsWithVariants = products?.filter(
    (product) => product.variants.length > 1
  );

  const productVariants = productsWithVariants?.find(
    (p) => p.handle === selectedProduct
  );

  const prepareItems = (formData: FormData) => {
    // const { product, variant } = Object.fromEntries(formData.entries());
    const items = Object.fromEntries(formData.entries());
    console.log(items, "items");
  };

  return (
    <Form action={prepareItems}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="product">{collection.title}</label>
        <select
          name="product"
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products?.map((product) => (
            <option key={product.id} value={product.handle}>
              {product.description}
            </option>
          ))}
        </select>
        {productVariants && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="variant">{productVariants.options[0].name}</label>
            <select
              name="variant"
              id="variant"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {productVariants.variants?.map((variant) => (
                <option key={variant.id} value={variant.title}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {cartAttributes[collection.handle as keyof typeof cartAttributes]?.map(
        (attribute: CartAttribute) => (
          <div
            key={attribute.key}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="cartAttribute">{attribute.label}</label>
            <input
              type={attribute.type}
              id="cartAttribute"
              name={attribute.key}
              // value={attribute.value}
            />
          </div>
        )
      )}
      <button>test</button>
    </Form>
  );
}
