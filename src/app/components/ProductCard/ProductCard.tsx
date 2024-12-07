import { Product } from "@/app/lib/shopify/types";
import Button from "../Button/Button";
import {
  Description,
  PriceAmount,
  PriceText,
  PriceWrapper,
  TextWrapper,
  Title,
  Wrapper,
} from "./styled";

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);
  const { variants } = product;

  const findLowestPriceVariant = () => {
    if (variants.length > 0) {
      const lowestPriceVariant = variants.reduce((min, current) =>
        Number(current.price.amount) < Number(min.price.amount) ? current : min
      );

      return lowestPriceVariant.price.amount;
    }
  };

  return (
    <Wrapper>
      <TextWrapper>
        <Title>{product.handle}</Title>
        <Description>{product.description}</Description>
      </TextWrapper>
      <PriceWrapper>
        <PriceText>from</PriceText>
        <PriceAmount>{`$${Math.round(Number(findLowestPriceVariant()))}`}</PriceAmount>
      </PriceWrapper>
      <Button link={`/product/${product.handle}`} />
    </Wrapper>
  );
}
