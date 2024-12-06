"use client";

import { useCart } from "@/app/hooks/useCart";

export default function NavBar() {
  const { cart } = useCart();
  console.log(cart, "cart from NavBar");

  return <div>{cart?.totalQuantity}</div>;
}
