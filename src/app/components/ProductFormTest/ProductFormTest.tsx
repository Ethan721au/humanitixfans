"use client";

import { useCart } from "@/app/hooks/useCart";
import { useTest } from "@/app/hooks/useTest";
import { cartAttributes } from "@/app/lib/constants";
import { getCollectionProducts } from "@/app/lib/shopify";
import { Attributes, Collection, Product } from "@/app/lib/shopify/types";
import Form from "next/form";
import { useEffect, useState } from "react";
import { Checkbox, InputField, Label } from "./styled";

type AddOns = {
  id: string;
  title: string;
  ckecked: boolean;
};

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
  const [attributes, setAttributes] = useState<Attributes[]>([]);

  useEffect(() => {
    if (cart) {
      const productLine = cart.lines.find(
        (line) => line.merchandise.product.handle !== "add-ons"
      ).merchandise;
      setSelectedProduct(productLine.product.handle);
      setSelectedVariant(productLine.selectedOptions[0].value);
      setAttributes(productLine.attributes);
      const addOns = cart.lines.filter(
        (line) => line.merchandise.product.handle === "add-ons"
      );
      if (addOns)
        setSelectedAddOns(
          addOns.map((a) => ({
            id: a.merchandise.id,
            title: a.merchandise.title,
            checked: true,
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

  console.log(addOns, "addOns");

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
        <label htmlFor="product">{collection.title}</label>
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
        </select>
        {productVariants && (
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
        )}
      </div>
      {cartAttributes[collection.handle as keyof typeof cartAttributes]?.map(
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
      )}
      {addOns &&
        addOns.map((addOn) => (
          <div
            key={addOn.id}
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
                selectedAddOns?.find((a) => a.id === addOn.id)?.checked || false
              }
              onChange={handleItemChecked(addOn.id)}
            />
            <Label htmlFor={addOn.id} data-attr="checkbox">
              {addOn.title}
            </Label>
          </div>
        ))}

      <button>test</button>
    </Form>
  );
}

// const tick = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="9"
//     height="7"
//     viewBox="0 0 9 7"
//     fill="none"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M2.46989 6.79557L0.219933 4.69527C-0.073311 4.42153 -0.073311 3.97907 0.219933 3.70533C0.513177 3.43159 0.987167 3.43159 1.28041 3.70533L2.95738 5.27075L7.68078 0.244745C7.95078 -0.049296 8.42402 -0.0829008 8.73751 0.168435C9.0525 0.42047 9.08925 0.861532 8.81926 1.15487L3.56936 6.75566C3.43362 6.90408 3.23712 6.99229 3.02863 6.99999C2.80138 7.00069 2.61013 6.92718 2.46989 6.79557Z"
//       fill="black"
//     ></path>
//   </svg>
// );
