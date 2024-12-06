"use server";

import { addToCart, createCart } from "@/app/lib/shopify";
import { cookies } from "next/headers";

// export async function addItem(
//   prevState: any,
//   selectedVariantId: string | undefined
// ) {
//   const cookieStore = await cookies();
//   const cartId = cookieStore.get("cartId")?.value;

//   if (!cartId || !selectedVariantId) {
//     return "Error adding item to cart";
//   }

//   try {
//     await addToCart(cartId, [
//       { merchandiseId: selectedVariantId, quantity: 1 },
//     ]);

//     // revalidateTag(TAGS.cart);
//   } catch (error) {
//     return "Error adding item to cart";
//   }
// }

export async function addItem(
  // prevState: any,
  selectedVariantId: string | undefined
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  console.log(cartId, "cartId");
  console.log(selectedVariantId, "selectedVariantId");

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart - 1";
  }

  try {
    const newCart = await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    return newCart;
    // revalidateTag(TAGS.cart);
    // console.log(newCart, "newCart");
  } catch (error) {
    return "Error adding item to cart - 2";
  }
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
}
