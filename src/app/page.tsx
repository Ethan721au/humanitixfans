import { getMenu, getProducts } from "./lib/shopify";

export default async function Home() {
  const menu = await getMenu("testmenu");
  const products = await getProducts();
  // console.log(menu);
  console.log(products);
  return <div>test</div>;
}
