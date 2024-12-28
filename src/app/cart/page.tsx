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
import { useEffect, useState } from "react";
import { priceFormatter } from "../lib/utils";
import { useRouter } from "next/navigation";
import { Collection } from "../lib/shopify/types";

export default function CartPage() {
  const router = useRouter();
  const { cart } = useCart();
  console.log(cart, "cart");
  const [isCartEdited, setIsCartEdited] = useState(false);
  const [collection, setCollection] = useState<Collection | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isCartEdited) router.replace("/cart");
  }, [isCartEdited, router]);

  const handleEditCart = (collection: Collection) => {
    router.push("/cart?edited=true");
    setIsCartEdited(true);
    setCollection(collection);
  };

  const renderCartItems = () => {
    const products = cart?.lines.filter(
      (line) => !addOnsKeys.includes(line.merchandise.title)
    );

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
        <button
          onClick={() =>
            handleEditCart(
              product.merchandise.product.collections.edges[0].node
            )
          }
        >
          Edit item
        </button>
      </ProductWrapper>
    ));
  };

  return (
    <PageWrapper>
      <Link href="/">
        <strong>Home</strong>
      </Link>
      {cart && <ProductSection>{renderCartItems()}</ProductSection>}
      {isCartEdited && (
        <Testing>
          <ProductForm isEditCart collection={collection} />
        </Testing>
      )}
    </PageWrapper>
  );
}
