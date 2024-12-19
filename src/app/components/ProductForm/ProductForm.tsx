"use client";

import { useActionState, useEffect, useState } from "react";
import Form from "next/form";
import { Wrapper } from "./styled";
import {
  Attributes,
  Collection,
  Product,
  ProductVariant,
} from "@/app/lib/shopify/types";
import { Input } from "./Input/Input";
import Products from "./Products";
import { useCart } from "@/app/hooks/useCart";
import { addItem } from "../Cart/actions";
import { getCollectionProducts } from "@/app/lib/shopify";
import { excludedKeys } from "@/app/lib/constants";

type Line = {
  merchandiseId: string | undefined;
  quantity: number;
  attributes: { key: string; value: FormDataEntryValue }[];
};

const prepareData = async (formData: FormData, collection: Collection) => {
  const items = Object.fromEntries(formData.entries());
  const products = await getCollectionProducts({
    collection: collection.handle,
  });
  const product = products.find((p) => p.handle === items[collection.title]);
  const variant =
    product?.variants.find((v) => v.title === items.variant) ||
    product?.variants[0];
  const addOns = Object.entries(items).filter(
    ([key]) => !excludedKeys.includes(key)
  );

  const addOnsIds = addOns.map(([key]) => {
    const merchandiseId = products
      .find((p) => p.handle === "add-ons")
      ?.variants.find((v) => v.title === key)?.id as string;
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
    variant: ProductVariant | undefined,
    product: Product | undefined,
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
  collection,
}: {
  collection: Collection;
}) {
  const { addCartItem } = useCart();
  const [collectionProducts, setCollectionProducts] = useState<
    Product[] | undefined
  >(undefined);
  const [message, action, isPending] = useActionState(updateCart, null);

  useEffect(() => {
    getCollectionProducts({ collection: collection.handle }).then((products) =>
      setCollectionProducts(products)
    );
  }, []);

  const addOns = collectionProducts?.filter((p) => p.handle === "add-ons")[0];

  const products = collectionProducts?.filter(
    (p) => p.productType === "product"
  );

  async function updateCart(
    state: FormData | null | string,
    formData: FormData
  ): Promise<FormData | string | null> {
    const { lines, products } = await prepareData(formData, collection);

    prepareOptimisticCart(lines, products, addCartItem);
    return addItem(state, lines);
  }

  return (
    <Wrapper>
      <Form action={action}>
        {products && (
          <Products products={products} type="text" name={collection.title} />
        )}
        <Input label="Ink color *" name="inkColor" type="text" bold={true} />
        {addOns && (
          <Products
            products={addOns.variants}
            type="checkbox"
            name={addOns.title}
          />
        )}
        <button>{isPending ? "adding to cart..." : "add to cart"}</button>
      </Form>
    </Wrapper>
  );
}
