"use client";

import Link from "next/link";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { Collection } from "../lib/shopify/types";
import ProductForm from "../components/ProductForm/ProductForm";
import { getCollections } from "../lib/shopify";

export default function CartPage() {
  const { cart } = useCart();
  const [collection, setCollection] = useState<Collection | undefined>(
    undefined
  );

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      );

      if (productLine) {
        console.log(productLine, "productLine");
      }

      getCollections().then((collections) => {
        const collection = collections.find(
          (c) =>
            c.handle ===
            productLine?.merchandise?.product?.collections?.edges[0].node.handle
        );
        setCollection(collection);
      });
    }
  }, [cart]);

  return (
    <div>
      <Link href="/">
        <strong>Home</strong>
      </Link>
      {collection && <ProductForm collection={collection} cart={cart} />}
    </div>
  );
}
