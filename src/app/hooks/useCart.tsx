"use client";

import { createContext, use, useContext, useMemo, useOptimistic } from "react";
import { Cart, CartItem, Product, ProductVariant } from "../lib/shopify/types";

type UpdateType = "plus" | "minus" | "delete";

// merchandiseId is a required field for cart mutations (cannot be productId or variantId)
type CartContextType = {
  cart: Cart | undefined;
  // updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product };
    };

const CartContext = createContext<CartContextType | undefined>(undefined);

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );

  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

export const CartProvider = ({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) => {
  const initialCart = use(cartPromise);

  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  );

  function cartReducer(state: Cart | undefined, action: CartAction): Cart {
    const currentCart = state || createEmptyCart();

    switch (action.type) {
      case "ADD_ITEM": {
        const { variant, product } = action.payload;
        const existingItem = currentCart.lines.find(
          (item) => item.merchandise.id === variant.id
        );
        const updatedItem = createOrUpdateCartItem(
          existingItem,
          variant,
          product
        );

        const updatedLines = existingItem
          ? currentCart.lines.map((item) =>
              item.merchandise.id === variant.id ? updatedItem : item
            )
          : [...currentCart.lines, updatedItem];

        const updatedCart = {
          ...currentCart,
          ...updateCartTotals(updatedLines),
          lines: updatedLines,
        };

        return updatedCart;
      }
      default:
        return currentCart;
    }
  }

  const addCartItem = (variant: ProductVariant, product: Product) => {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { variant, product } });
  };

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      addCartItem,
    }),
    [optimisticCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
