"use client";

import { useCart } from "@/app/hooks/useCart";
import { Product } from "@/app/lib/shopify/types";
import { useFormState } from "react-dom";

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  console.log(product, "product");
  const { addCartItem } = useCart();
  // const { state } = useProduct();
  // const [message, formAction] = useFormState(addItem, null);
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
    <div>fsfsdfsfsfd</div>
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
