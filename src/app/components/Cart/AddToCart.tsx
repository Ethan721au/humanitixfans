"use client";

import { useCart } from "@/app/hooks/useCart";
import { Attributes, Product } from "@/app/lib/shopify/types";
import { addItem } from "./actions";
import { useActionState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const { variants } = product;
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(preparePayload, null);
  const attributes = [
    {
      key: "add-on to",
      value: "test",
    },
  ];

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const finalVariant = variants[0];

  function preparePayload(
    state: string | null | undefined,
    payload: {
      variantId?: string;
      attributes?: Attributes[];
    }
  ) {
    return addItem(state, payload.variantId, payload.attributes || []);
  }

  const actionWithVariant = formAction.bind(null, {
    variantId: defaultVariantId,
    attributes,
  });

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product, attributes);
        await actionWithVariant();
      }}
    >
      <button>add to Cart</button>
    </form>
  );
}
