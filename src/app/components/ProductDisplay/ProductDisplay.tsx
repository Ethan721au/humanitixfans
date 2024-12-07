import { getCollections } from "@/app/lib/shopify";
import { CardWrapper, Subtitle, Title, Wrapper } from "./styled";
import CollectionCard from "../CollectionCard/CollectionCard";

export default async function ProductDisplay() {
  const collections = await getCollections();

  return (
    <Wrapper>
      <Title>Lorem ipsum dolor</Title>
      <Subtitle>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Subtitle>
      <CardWrapper>
        {collections.map((collection, idx) => {
          if (collection.handle !== "") {
            return <CollectionCard key={idx} collection={collection} />;
          }
        })}
      </CardWrapper>
    </Wrapper>
  );
}
