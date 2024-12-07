import { getCollectionProducts } from "@/app/lib/shopify";
import { Collection } from "@/app/lib/shopify/types";
import {
  Description,
  PriceAmount,
  PriceText,
  PriceWrapper,
  TextWrapper,
  Title,
  Wrapper,
} from "./styled";
import Button from "../Button/Button";

export default async function CollectionCard({
  collection,
}: {
  collection: Collection;
}) {
  const products = await getCollectionProducts({
    collection: collection.handle,
  });

  const findLowestPriceVariant = () => {
    const priceRanges = products.map((product) => product.priceRange);
    const lowestPriceVariant = priceRanges.reduce((lowest, current) => {
      return parseFloat(current.minVariantPrice.amount) <
        parseFloat(lowest.minVariantPrice.amount)
        ? current
        : lowest;
    });

    return lowestPriceVariant.minVariantPrice.amount;
  };

  return (
    <Wrapper>
      <TextWrapper>
        <Title>{collection.title}</Title>
        <Description>{collection.description}</Description>
      </TextWrapper>
      <PriceWrapper>
        <PriceText>from</PriceText>
        <PriceAmount>{`$${Math.round(Number(findLowestPriceVariant()))}`}</PriceAmount>
      </PriceWrapper>
      <Button link={`/${collection.handle}`} />
    </Wrapper>
  );
}
