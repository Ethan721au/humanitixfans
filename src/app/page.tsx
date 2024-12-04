import { getMenu, getProduct, getProducts } from "./lib/shopify";

export default async function Home() {
  const menu = await getMenu("testmenu");
  const products = await getProducts({});
  const product = await getProduct("test_product");
  // console.log(menu);
  // console.log(products);
  console.log(product, "product");
  return <div>test</div>;
}
