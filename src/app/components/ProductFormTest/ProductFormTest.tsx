"use client";

import { useCart } from "@/app/hooks/useCart";
import { useTest } from "@/app/hooks/useTest";
import { getCollectionProducts } from "@/app/lib/shopify";
import { Collection, Product } from "@/app/lib/shopify/types";
import Form from "next/form";
import { useEffect, useState } from "react";

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
  console.log(selectedProduct, "selectedProduct");

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      ).merchandise;
      console.log(productLine, "line");
      setSelectedProduct(productLine.product.handle);
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
  console.log(productsWithVariants, "productsWithVariants");

  console.log(products, "products");

  const testing = productsWithVariants?.find(
    (p) => p.handle === selectedProduct
  );
  console.log(testing, "testing");

  const prepareItems = (formData: FormData) => {
    const { product } = Object.fromEntries(formData.entries());
    console.log(product, "items");
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
        {testing && (
          <div>
            <label htmlFor="variant">{testing.options[0].name}</label>
            <select
              name="variant"
              id="variant"
              value={cart.lines[3].merchandise.selectedOptions[0].value}
              onChange={(e) => console.log(e)}
            >
              {testing.variants?.map((variant) => (
                <option key={variant.id} value={variant.title}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button>test</button>
    </Form>
  );
}
