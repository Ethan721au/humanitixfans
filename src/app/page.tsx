"use client";

import { getMenu, getProduct, getProducts } from "./lib/shopify";

import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import { createCartAndSetCookie } from "./components/Cart/actions";
import { AddToCart } from "./components/Cart/AddToCart";
import { Product } from "./lib/shopify/types";

export default function Home() {
  const { cart } = useCart();
  console.log(cart, "cart");
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

  // const menu = await getMenu("testmenu");
  // const products = await getProducts({});
  // const product = await getProduct("test_product");
  // console.log(menu);
  // console.log(products);
  // console.log(product, "product");

  // useEffect(() => {
  //   if (!cart) {
  //     createCartAndSetCookie();
  //   }
  // }, [cart]);

  return <AddToCart product={product} />;
}
