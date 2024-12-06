"use client";

import { getMenu, getProduct, getProducts } from "./lib/shopify";

import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import { createCartAndSetCookie } from "./components/Cart/actions";
import { AddToCart } from "./components/Cart/AddToCart";
import { Product } from "./lib/shopify/types";
import Link from "next/link";

export default function Home() {
  const { cart } = useCart();
  const [product, setProduct] = useState<Product>({
    variants: [],
    availableForSale: false,
  });

  useEffect(() => {
    if (!cart) {
      console.log("creating cart");
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    getProduct("test_product_2").then((product) => {
      if (product) {
        setProduct(product);
      }
    });
  }, []);

  return (
    <>
      <Link href={"/test_product_2"}>go to product</Link>
    </>
  );
}
