"use server";

import { TAGS } from "@/app/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  updateCartAttributes,
} from "@/app/lib/shopify";
import { Attributes } from "@/app/lib/shopify/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: unknown,
  lines: { merchandiseId: string; quantity: number; attributes: Attributes[] }[]
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || !lines) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, lines);
    revalidateTag(TAGS.cart);
    return "Item added to cart";
  } catch (error) {
    console.log(error);
    return "Error adding item to cart";
  }
}

export async function AddAttribute(
  prevState: unknown,
  attributes: Attributes[]
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId || !attributes) {
    return "Error adding item to cart";
  }

  try {
    await updateCartAttributes(cartId, attributes);
    revalidateTag(TAGS.cart);
    return "Attribute added to cart";
  } catch (error) {
    console.log(error);
    return "Error adding attribute to cart";
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
