"use server";

import { TAGS } from "@/app/lib/constants";
import { addToCart, createCart } from "@/app/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (error) {
    return "Error adding item to cart";
  }
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
}
