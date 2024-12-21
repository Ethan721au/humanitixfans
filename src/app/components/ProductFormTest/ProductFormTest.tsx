"use client";

import { useCart } from "@/app/hooks/useCart";
import { useTest } from "@/app/hooks/useTest";
import { cartAttributes } from "@/app/lib/constants";
import { getCollectionProducts } from "@/app/lib/shopify";
import { Attributes, Collection, Product } from "@/app/lib/shopify/types";
import Form from "next/form";
import { useEffect, useState } from "react";
import { Checkbox, InputField, Label } from "./styled";
import InputTest from "../InputTest/InputTest";

// type AddOns = {
//   id: string;
//   title: string;
//   ckecked: boolean;
// };

type CartAttribute = {
  name: string;
  label: string;
  type: string;
  value: string;
};

export default function ProductFormTest({
  collection,
}: {
  collection: Collection;
}) {
  const { cart } = useTest();
  const [collectionProducts, setCollectionProducts] = useState<
    Product[] | undefined
  >(undefined);

  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [selectedVariant, setSelectedVariant] = useState<string>();
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  console.log(selectedAddOns, "selectedAddOns");

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      );
      setSelectedProduct(productLine.merchandise.product.handle);
      setSelectedVariant(productLine.merchandise.selectedOptions[0].value);
      const addOns = cart.lines.filter(
        (line) => line.merchandise.product.handle === "add-ons"
      );
      if (addOns)
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
  )[0].variants;

  const handleItemChecked =
    (id: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      console.log(id, "id");
      const target = e.target as HTMLInputElement;
      setSelectedAddOns((prev) =>
        prev.map((addOn) =>
          addOn.id === id ? { ...addOn, checked: target.checked } : addOn
        )
      );
    };

  const prepareItems = (formData: FormData) => {
    // const { product, variant } = Object.fromEntries(formData.entries());
    const items = Object.fromEntries(formData.entries());
    console.log(items, "items");
  };

  return (
    <Form action={prepareItems}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <InputTest
          type="text"
          name="product"
          bold
          label={collection.title}
          selectedProduct={selectedProduct}
          onChange={setSelectedProduct}
          options={products}
        />
        {/* <Label htmlFor="product" bold={"true"}>
          {collection.title}
        </Label>
        <select
          name="product"
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products?.map((product) => (
            <option key={product.id} value={product.handle}>
              {product.description}
            </option>
          ))}
        </select> */}
        {/* {productVariants && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="variant">{productVariants.options[0].name}</label>
            <select
              name="variant"
              id="variant"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {productVariants.variants?.map((variant) => (
                <option key={variant.id} value={variant.title}>
                  {variant.title}
                </option>
              ))}
            </select>
          </div>
        )} */}
        {productVariants && (
          <InputTest
            type="text"
            label={productVariants.options[0].name}
            name="variant"
            bold
            selectedProduct={selectedVariant}
            onChange={setSelectedVariant}
            options={productVariants.variants}
          />
        )}
      </div>
      {/* {cartAttributes[collection.handle as keyof typeof cartAttributes]?.map(
        (attribute: CartAttribute) => (
          <div
            key={attribute.name}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="cartAttribute">{attribute.label}</label>
            <input
              type={attribute.type}
              id="cartAttribute"
              name={attribute.name}
              // value={attribute.value}
            />
          </div>
        )
      )} */}
      {addOns &&
        addOns.map((addOn) => (
          <div key={addOn.id}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <InputField
                type="checkbox"
                id={addOn.id}
                name={addOn.title}
                checked={
                  selectedAddOns?.find((a) => a.id === addOn.id)?.checked ||
                  false
                }
                onChange={handleItemChecked(addOn.id)}
              />
              <Label htmlFor={addOn.id} data-attr="checkbox">
                {addOn.title}
              </Label>
            </div>
            {selectedAddOns.find((a) => a.id === addOn.id)?.checked && (
              <div
                key={addOn.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Label
                  htmlFor={addOn.title}
                  bold={"true"}
                >{`${addOn.title} *`}</Label>
                <input
                  type="text"
                  id={addOn.title}
                  name={addOn.title}
                  value={
                    selectedAddOns.find((a) => a.id === addOn.id)?.value || ""
                  }
                  onChange={(e) =>
                    setSelectedAddOns((prev) =>
                      prev.map((a) =>
                        a.id === addOn.id ? { ...a, value: e.target.value } : a
                      )
                    )
                  }
                />
              </div>
            )}
          </div>
        ))}

      <button>test</button>
    </Form>
  );
}
