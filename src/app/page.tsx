"use client";

import { getMenu, getProduct, getProducts } from "./lib/shopify";

import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import { createCartAndSetCookie } from "./components/Cart/actions";
import { AddToCart } from "./components/Cart/AddToCart";
import { Product } from "./lib/shopify/types";

export default function Home() {
  const { cart } = useCart();
  const [product, setProduct] = useState<Product | undefined>({
    variants: [],
    availableForSale: false,
  });

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    getProduct("test_product_2").then((product) => {
      setProduct(product);
    });
  }, []);

  return (
    <>
      <AddToCart product={product} />
      <button onClick={() => console.log(cart)}>cart</button>
    </>
  );
}
