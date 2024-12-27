"use client";

import { getCollectionProducts } from "@/app/lib/shopify";
import {
  Attributes,
  Collection,
  Product,
  ProductVariant,
} from "@/app/lib/shopify/types";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import Input from "../Input/Input";
import { Wrapper } from "./styled";
import { addOnsKeys } from "@/app/lib/constants";
import { useCart } from "@/app/hooks/useCart";
import { addItem } from "../Cart/actions";

type AddOn = {
  id: string;
  title: string;
  checked: boolean;
  value?: FormDataEntryValue | undefined;
};

type Line = {
  merchandiseId: string;
  quantity: number;
  attributes: { key: string; value: FormDataEntryValue }[];
};

export default function ProductForm({
  collection,
  isCart = false,
}: {
  collection: Collection;
  isCart?: boolean;
}) {
  const { cart, addCartItem } = useCart();
  const [message, action, isPending] = useActionState(updateCart, null);
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("default");
  console.log(selectedProduct, "selectedProduct");
  const [selectedVariant, setSelectedVariant] = useState<string>("default");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  useEffect(() => {
    if (isCart && cart && cart?.lines.length > 0) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      );

      if (productLine) {
        setSelectedProduct(productLine);
        setSelectedVariant(productLine.merchandise.selectedOptions[0].value);
        const addOns = cart.lines.filter(
          (line) => line.merchandise.product.handle === "add-ons"
        );
        if (addOns) {
          setSelectedAddOns(
            addOns.map((addOn) => ({
              id: addOn.merchandise.id,
              title: addOn.merchandise.title,
              checked: true,
              value: productLine.attributes.find(
                (a) => a.key === addOn.merchandise.title
              )?.value,
            }))
          );
        }
      }
    }
  }, [cart, isCart]);

  useEffect(() => {
    getCollectionProducts({ collection: collection.handle }).then((products) =>
      setCollectionProducts(products)
    );
  }, [collection]);

  const products = collectionProducts?.filter(
    (p) => p.productType === "product"
  );

  const productsWithVariants = products?.filter(
    (product) => product.variants.length > 1
  );

  const productVariants = productsWithVariants?.find(
    (p) => p.handle === selectedProduct
  );

  const addOns = collectionProducts?.filter(
    (p) => p.productType === "add-on"
  )[0]?.variants;

  console.log(addOns, "addOns");

  const prepareItems = async (formData: FormData) => {
    const items = Object.fromEntries(formData.entries());
    console.log(items, "items");
    const products = await getCollectionProducts({
      collection: items.collection as string,
    });
    const product = products.find((p) => p.handle === items[collection.title]);
    const variant =
      product?.variants.find((v) => v.title === items.variant) ||
      product?.variants[0];
    const productAddOns = Object.entries(items)
      .filter(([key]) => addOnsKeys.includes(key))
      .map(([key, value]) => ({ key, value }));

    const addOnsIds = productAddOns.map(({ key }) => {
      const merchandiseId = products
        .find((p) => p.handle === "add-ons")
        ?.variants.find((v) => v.title === key)?.id as string;

      if (!merchandiseId) {
        throw new Error(`Merchandise ID not found for add-on: ${key}`);
      }
      return {
        merchandiseId,
        quantity: 1,
        attributes: [],
      };
    });

    const variantId = {
      merchandiseId: variant?.id || "",
      quantity: 1,
      attributes: productAddOns,
    };

    const lines = [variantId, ...addOnsIds];

    return {
      lines,
      products,
    };
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
      const variant = product?.variants.find(
        (v) => v.id === line.merchandiseId
      );
      const attributes = line.attributes.map((attr) => ({
        key: attr.key,
        value: attr.value,
      }));

      if (variant && product) {
        addCartItem(variant, product, attributes);
      } else {
        console.error("Skipping item due to missing product or variant:", line);
      }
    });
  };

  async function updateCart(
    state: FormData | null | string,
    formData: FormData
  ): Promise<FormData | string | null> {
    const { lines, products } = await prepareItems(formData);

    // prepareOptimisticCart(lines, products, addCartItem);
    // setSelectedProduct("default");
    // setSelectedVariant("default");
    // setSelectedAddOns([]);

    // return addItem(state, lines);
  }

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    setSelectedAddOns((prev) => {
      const updatedAddOns = prev.map((addOn) =>
        addOn.id === addOnId ? { ...addOn, checked } : addOn
      );
      if (!updatedAddOns.some((a) => a.id === addOnId)) {
        updatedAddOns.push({
          id: addOnId,
          title: addOnId,
          checked,
          value: "",
        });
      }
      return updatedAddOns;
    });
  };

  const handleAddOnValueChange = (addOnId: string, value: string) => {
    setSelectedAddOns((prev) =>
      prev.map((addOn) => (addOn.id === addOnId ? { ...addOn, value } : addOn))
    );
  };

  const handleSelectedProduct = (product: string) => {};

  const renderItems = (name: string) => {
    switch (name) {
      case "Send-in item": {
        if (products)
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Input
                type="text"
                name={collection.title}
                bold
                label={`${collection.title} *`}
                selectedProduct={selectedProduct}
                onChange={(product) => {
                  setSelectedProduct(product as string);
                }}
                options={products}
              />
              {productVariants && (
                <Input
                  type="text"
                  label={`${productVariants.options[0].name} *`}
                  name="variant"
                  bold
                  selectedProduct={selectedVariant}
                  onChange={(variant) => {
                    setSelectedVariant(variant as string);
                  }}
                  options={productVariants.variants}
                />
              )}
            </div>
          );
      }
      case "Add On": {
        if (addOns)
          return addOns.map((addOn) => (
            <div key={addOn.id}>
              <Input
                type="checkbox"
                name={addOn.title}
                checked={
                  selectedAddOns?.find((a) => a.id === addOn.id)?.checked ||
                  false
                }
                label={`${addOn.title} (+$${Number(addOn?.price.amount).toFixed(0)})`}
                onChange={(checked) =>
                  handleAddOnChange(addOn.id, checked as boolean)
                }
              />
              {selectedAddOns?.find((a) => a.id === addOn.id)?.checked && (
                <Input
                  label={`${addOn.title} *`}
                  type="text"
                  name={addOn.title}
                  bold
                  value={
                    selectedAddOns.find((a) => a.id === addOn.id)?.value || ""
                  }
                  onChange={(value) =>
                    handleAddOnValueChange(addOn.id, value as string)
                  }
                />
              )}
            </div>
          ));
      }
      case "Item from store": {
        if (products)
          return (
            <div>
              <strong>{`${collection.title} *`}</strong>
              {products.map((product) => (
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  key={product.id}
                >
                  <Input
                    type="radio"
                    name={collection.title}
                    label={`${product.title} (+$${Number(product?.variants[0].price.amount).toFixed(0)})`}
                    selectedProduct={selectedProduct}
                    product={product}
                    onChange={(product) => {
                      setSelectedProduct(product as string);
                    }}
                  />
                </div>
              ))}
            </div>
          );
      }
      default:
        return;
    }
  };

  return (
    <Wrapper>
      <Form action={action}>
        <input type="hidden" name="collection" value={collection?.handle} />
        {renderItems(collection.title)}
        {renderItems("Add On")}
        <button>{isPending ? "adding to cart..." : "add to cart"}</button>
      </Form>
    </Wrapper>
  );
}
