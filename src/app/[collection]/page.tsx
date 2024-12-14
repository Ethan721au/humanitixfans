import Link from "next/link";
import { redirectToCheckout } from "../components/Cart/actions";
import {
  getCollectionProducts,
  getCollections,
  getProduct,
} from "../lib/shopify";
import { Breadcrumbs, ProductSection, Wrapper } from "./styled";
import Image from "next/image";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductFormTest from "../components/ProductForm/ProductFormTest";

export default async function CollectionPage({
  params,
}: {
  params: { collection: string };
}) {
  const { collection } = await params;
  const product = await getProduct(collection);
  // const collections = await getCollections();
  // const products = await getCollectionProducts({
  //   collection: collection,
  // });
  // const { title: title, image: image } =
  //   collections.find((c) => c.handle === collection) || {};

  // const { collection } = useParams();
  // const [product, setProduct] = useState(undefined);

  // useEffect(() => {
  //   loadProduct();
  // }, []);

  // const loadProduct = async () => {
  //   const product = await getProduct(collection);
  //   setProduct(product);
  // };

  return (
    <Wrapper>
      <Breadcrumbs>
        <Link href="/">
          <strong>Home</strong>
        </Link>
        <div>/</div>
        <Link href="">{collection}</Link>
      </Breadcrumbs>
      <ProductSection>
        <div>
          {product ? (
            <Image
              src={product.featuredImage.url}
              alt=""
              width={200}
              height={200}
            />
          ) : (
            "Default image"
          )}
        </div>
        <ProductFormTest product={product} />
      </ProductSection>
      <form action={redirectToCheckout}>
        <button>checkout</button>
      </form>
    </Wrapper>
    // <Wrapper>
    //   <Breadcrumbs>
    //     <Link href="/">
    //       <strong>Home</strong>
    //     </Link>
    //     <div>/</div>
    //     <Link href={`/${collection}`}>{title}</Link>
    //   </Breadcrumbs>
    //   <ProductSection>
    //     <div>
    //       {image ? (
    //         <Image src={image.url} alt="" width={50} height={50} />
    //       ) : (
    //         "Default image"
    //       )}
    //     </div>
    //     <ProductForm products={products} />
    //   </ProductSection>
    //   <form action={redirectToCheckout}>
    //     <button>checkout</button>
    //   </form>
    // </Wrapper>
  );
}
