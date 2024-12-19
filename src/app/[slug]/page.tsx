import Link from "next/link";
import { redirectToCheckout } from "../components/Cart/actions";
import { getCollections } from "../lib/shopify";
import { Breadcrumbs, ProductSection, Wrapper } from "./styled";
import Image from "next/image";
import ProductForm from "../components/ProductForm/ProductForm";

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const collections = await getCollections();
  const collection = collections.find((c) => c.handle === slug);

  return (
    <Wrapper>
      <Breadcrumbs>
        <Link href="/">
          <strong>Home</strong>
        </Link>
        <div>/</div>
        <Link href={`/${collection?.handle}`}>{collection?.title}</Link>
      </Breadcrumbs>
      <ProductSection>
        <div>
          {collection?.image ? (
            <Image src={collection.image.url} alt="" width={50} height={50} />
          ) : (
            "Default image"
          )}
        </div>
        {collection && <ProductForm collection={collection} />}
      </ProductSection>
      <form action={redirectToCheckout}>
        <button>checkout</button>
      </form>
    </Wrapper>
  );
}