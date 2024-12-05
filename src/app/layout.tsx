import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./hooks/useCart";
import { cookies } from "next/headers";
import { getCart } from "./lib/shopify";
import { TestProvider } from "./hooks/useTest";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en">
      <body>
        <TestProvider>
          <CartProvider cartPromise={cart}>{children}</CartProvider>
        </TestProvider>
      </body>
    </html>
  );
}
