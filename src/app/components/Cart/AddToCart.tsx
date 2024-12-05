"use client";

import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/lib/shopify/types";
import { addItem } from "./actions";
import Form from "next/form";
import { useActionState } from "react";

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  // const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  // const actionWithVariant = formAction.bind(null, selectedVariantId);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const actionWithVariant = formAction.bind(null, defaultVariantId);
  const finalVariant = variants.length === 1 ? variants[0] : undefined;

  // const variant = variants.find((variant: ProductVariant) =>
  //   variant.selectedOptions.every(
  //     (option) => option.value === state[option.name.toLowerCase()]
  //   )
  // );
  // const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  // const selectedVariantId = variant?.id || defaultVariantId;
  // const actionWithVariant = formAction.bind(null, selectedVariantId);
  // const finalVariant = variants.find(
  //   (variant) => variant.id === selectedVariantId
  // )!;

  return (
    <>
      <div>fsfsdfsfsfd</div>
      <Form
        action={async () => {
          addCartItem(finalVariant, product);
          await actionWithVariant();
        }}
      >
        <button>Submit</button>
        <p>{message}</p>
      </Form>

      {/* <Form action={test}>
        <button>Submit</button>
        <p>{message}</p>
      </Form> */}
    </>
    // <form
    //   action={async () => {
    //     addCartItem(finalVariant, product);
    //     await actionWithVariant();
    //   }}
    // >
    //   <SubmitButton
    //     availableForSale={availableForSale}
    //     selectedVariantId={selectedVariantId}
    //   />
    //   <p className="sr-only" role="status" aria-label="polite">
    //     {message}
    //   </p>
    // </form>
  );
}
