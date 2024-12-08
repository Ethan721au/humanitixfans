import Link from "next/link";
import { redirectToCheckout } from "../components/Cart/actions";
import { AddToCart } from "../components/Cart/AddToCart";
import { getCollectionProducts, getCollections } from "../lib/shopify";
import { Breadcrumbs, ProductSection, Wrapper } from "./styled";
import Image from "next/image";

export default async function CollectionPage({
  params,
}: {
  params: { collection: string };
}) {
  const { collection } = await params;
  const collections = await getCollections();
  const products = await getCollectionProducts({
    collection: collection,
  });
  const { title: title, image: image } =
    collections.find((c) => c.handle === collection) || {};
  console.log(collections, "collections");
  console.log(image, "image");

  return (
    <Wrapper>
      <Breadcrumbs>
        <Link href="/">
          <strong>Home</strong>
        </Link>
        <div>/</div>
        <Link href={`/${collection}`}>{title}</Link>
      </Breadcrumbs>
      <ProductSection>
        {image ? (
          <Image src={image.url} alt="" width={50} height={50} />
        ) : (
          "Default image"
        )}
        {/* {products.map((product, idx) => (
          <div key={idx}>
            {product.title}
            <AddToCart product={product} />
          </div>
        ))} */}
      </ProductSection>
      <form action={redirectToCheckout}>
        <button>Checkout</button>
      </form>
    </Wrapper>
  );
}
