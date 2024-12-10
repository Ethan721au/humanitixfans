"use client";

import { useActionState, useState } from "react";
import Form from "next/form";
import { getFormData } from "./test";
import { Wrapper } from "./styled";
import { Product } from "@/app/lib/shopify/types";
import Button from "../Button/Button";
import { Input } from "./Input/Input";
import Products from "./Products";
import AddOns from "./AddOns";

export default function ProductForm({
  products,
  collection,
}: {
  products: Product[];
}) {
  const [message, action, isPending] = useActionState(getFormData, "");
  console.log(products, "products");
  console.log(message, "message");
  const [additionalOptions, setAdditionalOptions] = useState(false);
  console.log(additionalOptions, "addOns");

  const addOns = products.filter((p) => p.productType === "add-on");

  return (
    <Wrapper>
      <Form action={action}>
        <Products products={products} type="radio" name="product" />
        <Input label="Ink color *" name="inkColor" type="text" />
        <AddOns addOns={addOns} />

        <button>Add to cart</button>
        {/* <Button link="">Checkout</Button> */}
      </Form>
    </Wrapper>
  );
}
