import Link from "next/link";
import { redirectToCheckout } from "../components/Cart/actions";
import { getCollections } from "../lib/shopify";
import { Breadcrumbs, ProductSection } from "./styled";
import Image from "next/image";
import ProductForm from "../components/ProductForm/ProductForm";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collections = await getCollections();
  const collection = collections.find((c) => c.handle === slug);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <section>
      <Breadcrumbs>
        <Link href="/">
          <strong>Home</strong>
        </Link>
        <div>/</div>
        <Link href={`/${collection?.handle}`}>{collection?.title}</Link>
      </Breadcrumbs>
      <ProductSection>
        {collection?.image ? (
          <Image src={collection.image.url} alt="" width={50} height={50} />
        ) : (
          "Default image"
        )}
        {collection && <ProductForm collection={collection} />}
      </ProductSection>
      <form action={redirectToCheckout}>
        <button>checkout</button>
      </form>
    </section>
  );
}
