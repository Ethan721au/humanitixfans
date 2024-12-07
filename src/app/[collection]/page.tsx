import { redirectToCheckout } from "../components/Cart/actions";
import { AddToCart } from "../components/Cart/AddToCart";
import { getCollectionProducts } from "../lib/shopify";

export default async function CollectionPage({
  params,
}: {
  params: { collection: string };
}) {
  const { collection } = await params;
  const products = await getCollectionProducts({
    collection: collection,
  });

  return (
    <div
      style={{
        paddingTop: "200px",
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {products.map((product, idx) => (
        <div key={idx}>
          {product.title}
          <AddToCart product={product} />
        </div>
      ))}

      <form action={redirectToCheckout}>
        <button>Checkout</button>
      </form>
    </div>
  );
}
