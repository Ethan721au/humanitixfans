import { productFragment } from "./product";

const cartTestFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                ...product
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartTestFragment;
