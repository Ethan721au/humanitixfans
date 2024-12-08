"use server";

import { TAGS } from "@/app/lib/constants";
import { addToCart, createCart, getCart } from "@/app/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined,
  attributes: { key: string; value: string }[] | []
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1, attributes: attributes },
    ]);
    revalidateTag(TAGS.cart);
  } catch (error) {
    console.log(error);
    return "Error adding item to cart";
  }
}

export async function redirectToCheckout() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    // return "Missing cart ID";
    return;
  }

  const cart = await getCart(cartId);

  if (!cart) {
    // return "Error fetching cart";
    return;
  }

  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
}
