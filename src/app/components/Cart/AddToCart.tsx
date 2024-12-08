"use client";

import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/lib/shopify/types";
import { addItem } from "./actions";
import { useActionState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const { variants } = product;
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  console.log("defaultVariantId", defaultVariantId);

  const finalVariant = variants[0];
  const actionWithVariant = formAction.bind(null, defaultVariantId);
  // console.log("finalVariant", finalVariant);

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        await actionWithVariant();
      }}
    >
      <button>add to Cart</button>
      {/* <p>{message}</p> */}
    </form>
  );
}
