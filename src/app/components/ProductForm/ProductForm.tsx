"use client";

import { useActionState } from "react";
import Form from "next/form";
import { Wrapper } from "./styled";
import { Attributes, Product, ProductVariant } from "@/app/lib/shopify/types";
import { Input } from "./Input/Input";
import Products from "./Products";
import { useCart } from "@/app/hooks/useCart";
import { addItem } from "../Cart/actions";
import { getCollectionProducts } from "@/app/lib/shopify";
import { excludedKeys } from "@/app/lib/constants";

type Line = {
  merchandiseId: string;
  quantity: number;
  attributes: { key: string; value: string }[];
};

const prepareLines = async (formData: FormData, collection: string) => {
  const items = Object.fromEntries(formData.entries());
  const products = await getCollectionProducts({ collection });
  const product = products.find((p) => p.handle === items[collection]);
  const variant =
    product?.variants.find((v) => v.title === items.variant) ||
    product?.variants[0];
  const addOns = Object.entries(items).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  const addOnsIds = addOns.map(([key]) => {
    const merchandiseId = products
      .find((p) => p.handle === "add-ons")
      ?.variants.find((v) => v.title === key)?.id;
    return {
      merchandiseId,
      quantity: 1,
      attributes: [],
    };
  });

  const attributes = addOns.map(([key, value]) => {
    return {
      key,
      value,
    };
  });

  const variantId = {
    merchandiseId: variant?.id,
    quantity: 1,
    attributes,
  };

  const lines = [variantId, ...addOnsIds];

  return { lines, products };
};

const prepareOptimisticCart = (
  lines: Line[],
  products: Product[],
  addCartItem: (
    variant: ProductVariant,
    product: Product,
    attributes: Attributes[]
  ) => void
) => {
  lines.map((line) => {
    const product = products.find((p) =>
      p.variants.some((v) => v.id === line.merchandiseId)
    );
    const variant = product?.variants.find((v) => v.id === line.merchandiseId);
    const attributes = line.attributes.map((attr) => {
      return {
        key: attr.key,
        value: attr.value,
      };
    });
    addCartItem(variant, product, attributes);
  });
};

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
  ): Promise<FormData | string> {
    const { lines, products } = await prepareLines(formData, collection);
    prepareOptimisticCart(lines, products, addCartItem);
    return addItem(state, lines);
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
        <button>{isPending ? "adding to cart" : "add to cart"}</button>
      </Form>
    </Wrapper>
  );
}
