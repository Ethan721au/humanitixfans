"use client";

import Link from "next/link";
import ProductForm from "../components/ProductForm/ProductForm";
import { useCart } from "../hooks/useCart";
import { addOnsKeys } from "../lib/constants";
import {
  ImageWrapper,
  PageWrapper,
  Product,
  ProductSection,
  ProductWrapper,
  Testing,
} from "./styled";
import Image from "next/image";
import { useState } from "react";
import { priceFormatter } from "../lib/utils";

export default function CartPage() {
  const { cart } = useCart();
  const [isCartEdited, setIsCartEdited] = useState(false);
  console.log(cart, "cart");

  const products = cart?.lines.filter(
    (line) => !addOnsKeys.includes(line.merchandise.title)
  );

  console.log(products, "products");

  const renderCartItems = () => {
    const products = cart?.lines.filter(
      (line) => !addOnsKeys.includes(line.merchandise.title)
    );
    console.log(products, "products");

    return products?.map((product) => (
      <ProductWrapper key={product.id}>
        <Product>
          {product.merchandise.product.featuredImage && (
            <ImageWrapper>
              <Image
                src={product.merchandise.product.featuredImage.url}
                alt=""
                fill
              />
            </ImageWrapper>
          )}
          <div>
            <strong>{product.merchandise.product.title}</strong>
            {product.attributes.map((attr) => (
              <div key={attr.key}>{`${attr.key} : ${attr.value}`}</div>
            ))}
          </div>
          <div>{product.quantity}</div>
          <div>{priceFormatter(product.cost.totalAmount.amount, 2)}</div>
        </Product>
        <button>Edit item</button>
      </ProductWrapper>
    ));
  };

  return (
    <PageWrapper>
      <Link href="/">
        <strong>Home</strong>
      </Link>
      <ProductSection>{cart && renderCartItems()}</ProductSection>
      {isCartEdited && <Testing />}
    </PageWrapper>
  );
}
