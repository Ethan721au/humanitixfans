"use client";

import { useActionState } from "react";
import Form from "next/form";
import { Wrapper } from "./styled";
import { Product } from "@/app/lib/shopify/types";
import { Input } from "./Input/Input";
import Products from "./Products";
// import AddOns from "./AddOns";
import { useCart } from "@/app/hooks/useCart";
import { prepareLines } from "@/app/lib/utils";
import { addItem } from "../Cart/actions";

export default function ProductForm({
  collectionProducts,
  collection,
}: {
  collectionProducts: Product[];
  collection: string;
}) {
  const { addCartItem } = useCart();
  const [message, action, isPending] = useActionState(updateCart, null);

  const { variants } = collectionProducts.filter(
    (p) => p.productType === "add-on"
  )[0];
  const products = collectionProducts.filter(
    (p) => p.productType === "product"
  );

  async function updateCart(
    state: FormData | null,
    formData: FormData
  ): Promise<FormData> {
    const lines = await prepareLines(formData, collection);

    // addCartItem(variant, product, attributes);
    // return addItem(state, variantId, attributes);
  }

  return (
    <Wrapper>
      <Form action={action}>
        {products && (
          <Products products={products} type="text" name={collection} />
        )}
        <Input label="Ink color *" name="inkColor" type="text" />
        {variants && (
          <Products products={variants} type="checkbox" name="addOns" />
        )}
        <button>Add to cart</button>
        {message}
      </Form>
    </Wrapper>
  );
}
