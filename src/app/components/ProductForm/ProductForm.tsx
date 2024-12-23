"use client";

import { getCollectionProducts } from "@/app/lib/shopify";
import { Cart, Collection, Product } from "@/app/lib/shopify/types";
import Form from "next/form";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import { Wrapper } from "./styled";

type AddOn = {
  id: string;
  title: string;
  checked: boolean;
  value?: FormDataEntryValue | undefined;
};

export default function ProductForm({
  collection,
  cart,
}: {
  collection: Collection;
  cart?: Cart;
}) {
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("default");
  const [selectedVariant, setSelectedVariant] = useState<string>("default");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      );

      if (productLine) {
        setSelectedProduct(productLine.merchandise.product.handle);
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
  }, [cart]);

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

  const prepareItems = (formData: FormData) => {
    // const { product, variant } = Object.fromEntries(formData.entries());
    const items = Object.fromEntries(formData.entries());
    console.log(items, "items");
  };

  return (
    <Wrapper>
      <Form action={prepareItems}>
        {products && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="text"
              name="product"
              bold
              label={collection.title}
              selectedProduct={selectedProduct}
              onChange={(product) => {
                if (typeof product === "string") {
                  setSelectedProduct(product);
                }
              }}
              options={products}
            />
            {productVariants && (
              <Input
                type="text"
                label={productVariants.options[0].name}
                name="variant"
                bold
                selectedProduct={selectedVariant}
                onChange={(variant) => {
                  if (typeof variant === "string") {
                    setSelectedVariant(variant);
                  }
                }}
                options={productVariants.variants}
              />
            )}
          </div>
        )}
        {addOns &&
          addOns.map((addOn) => (
            <div key={addOn.id}>
              <Input
                type="checkbox"
                name={addOn.title}
                checked={
                  selectedAddOns?.find((a) => a.id === addOn.id)?.checked ||
                  false
                }
                label={addOn.title}
                onChange={(checked) => {
                  console.log(checked, "checked");
                  console.log(typeof checked);
                  if (typeof checked === "boolean") {
                    setSelectedAddOns((prev) => {
                      console.log(prev, "prev");
                      const existingAddOn = prev.find((a) => a.id === addOn.id);

                      if (existingAddOn) {
                        return prev.map((a) =>
                          a.id === addOn.id ? { ...a, checked } : a
                        );
                      } else {
                        return [
                          ...prev,
                          {
                            id: addOn.id,
                            title: addOn.title,
                            checked,
                            value: "",
                          },
                        ];
                      }
                    });
                  }
                }}
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
                  onChange={(value) => {
                    if (typeof value === "string") {
                      setSelectedAddOns((prev) =>
                        prev.map((a) =>
                          a.id === addOn.id ? { ...a, value } : a
                        )
                      );
                    }
                  }}
                />
              )}
            </div>
          ))}

        <button>test</button>
      </Form>
    </Wrapper>
  );
}
