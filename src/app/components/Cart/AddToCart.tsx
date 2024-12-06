"use client";

import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/lib/shopify/types";
import { addItem } from "./actions";

export function AddToCart({ product }: { product: Product }) {
  const { variants } = product;
  const { addCartItem, setCart } = useCart();

  const finalVariant = variants[0];

  return (
    <>
      <div>fsfsdfsfsfd</div>
      <button
        onClick={() => {
          addCartItem(finalVariant, product);
          addItem(finalVariant.id);
          // setCart(newCart);
        }}
      >
        Add to cart
      </button>
    </>
  );
}
