import Video from "./components/Video/Video";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";

export default async function Home() {
  return (
    <main>
      <Video />
      <ProductDisplay />
    </main>
  );
}
