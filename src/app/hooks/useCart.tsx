"use client";

import {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cart, CartItem, Product, ProductVariant } from "../lib/shopify/types";
import { getCart } from "../lib/shopify";

type UpdateType = "plus" | "minus" | "delete";

// merchandiseId is a required field for cart mutations (cannot be productId or variantId)
type CartContextType = {
  cart: Cart;
  // updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
  setCart: (cart: Cart) => void;
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
  // const initialCart = use(cartPromise);
  // console.log(initialCart, "initialCart");
  const [cart, setCart] = useState<Cart>(createEmptyCart());

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    console.log("getting cart");
    const cart = await cartPromise;
    console.log(cart, "cart");
    if (cart) {
      setCart(cart);
    }
  };

  const updateCart = (action: CartAction) => {
    const currentCart = cart;

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

        setCart(updatedCart);
      }
      default:
        return currentCart;
    }
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    updateCart({ type: "ADD_ITEM", payload: { variant, product } });
  };

  const value = { cart, addCartItem, setCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
