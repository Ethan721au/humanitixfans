import { redirectToCheckout } from "@/app/components/Cart/actions";
import { AddToCart } from "@/app/components/Cart/AddToCart";
import { getProduct } from "@/app/lib/shopify";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = await params;
  const product = await getProduct(handle);

  return (
    <div style={{ marginTop: "200px" }}>
      <AddToCart product={product} />
      <form action={redirectToCheckout}>
        <button>Checkout</button>
      </form>
    </div>
  );
}
