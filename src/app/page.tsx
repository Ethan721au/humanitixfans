import Video from "./components/Video/Video";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";

export default async function Home() {
  return (
    <>
      <Video />
      <ProductDisplay />
      <div style={{ height: "2000px" }}></div>
    </>
  );
}
