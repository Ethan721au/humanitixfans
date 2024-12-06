// import { useParams } from "next/navigation";
// import { useProduct } from "../hooks/useProduct";
// import { useEffect, useState } from "react";
// import { getProduct } from "../lib/shopify";

import { AddToCart } from "../components/Cart/AddToCart";
import { getProduct } from "../lib/shopify";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  console.log(product);

  return <AddToCart product={product} />;
}
