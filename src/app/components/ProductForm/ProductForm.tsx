"use client";

import { useActionState } from "react";
import Form from "next/form";
import { Wrapper } from "./styled";
import { Product } from "@/app/lib/shopify/types";
import { Input } from "./Input/Input";
import Products from "./Products";
import AddOns from "./AddOns";
import { useCart } from "@/app/hooks/useCart";
import { extractAttributes } from "@/app/lib/utils";
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

  function updateCart(
    state: FormData | null,
    formData: FormData
  ): Promise<FormData> {
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject, "formObject");
    // const product = products.find((p) => p.title === formData.get("product"));
    // const addOns = formData.getAll("addOns");
    // console.log(addOns, "addOns");
    // const variant = product?.variants[0];
    // const variantId = variant?.id;
    // const attributes = extractAttributes(formData);
    // addCartItem(variant, product, attributes);
    // return addItem(state, variantId, attributes);
  }

  return (
    <Wrapper>
      <Form action={action}>
        <Products products={products} type="text" name={collection} />
        <Input label="Ink color *" name="inkColor" type="text" />
        <Products products={variants} type="checkbox" name="addOns" />
        <button>Add to cart</button>
        {message}
      </Form>
    </Wrapper>
  );
}
