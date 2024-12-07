import { getProducts } from "@/app/lib/shopify";
import ProductCard from "../ProductCard/ProductCard";
import { CardWrapper, Subtitle, Title, Wrapper } from "./styled";

export default async function ProductDisplay() {
  const products = await getProducts({});

  return (
    <Wrapper>
      <Title>Lorem ipsum dolor</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Subtitle>
      <CardWrapper>
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </CardWrapper>
    </Wrapper>
  );
}
