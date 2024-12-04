// export const getProductsQuery = `
// query getProducts($first: Int!) {
//   products(first: $first) {
//     edges {
//       cursor
//       node {
//         id
//         title
//         handle
//         description
//         images(first: 1) {
//           edges {
//             node {
//               src
//               altText
//             }
//           }
//         }
//       }
//     }
//   }
// }`;

// export const getProductsQuery = `
// query getProductList {
//         products(sortKey: PRICE, first: 100, reverse: true) {
//           edges {
//             node {
//               id
//               handle
//               description
//               title
//               totalInventory
//               variants(first: 5) {
//                 edges {
//                   node {
//                     id
//                     title
//                     quantityAvailable
//                     priceV2 {
//                       amount
//                       currencyCode
//                     }
//                   }
//                 }
//               }
//               priceRange {
//                 maxVariantPrice {
//                   amount
//                   currencyCode
//                 }
//                 minVariantPrice {
//                   amount
//                   currencyCode
//                 }
//               }
//               images(first: 1) {
//                 edges {
//                   node {
//                     src
//                     altText
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
// `;

export const getProductsQuery = `
query getProducts($first: Int!) {
  products(first: $first) {
    edges {
      cursor
      node {
        id
        title
        handle
        description
        variants(first: 5) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
      }
    }
  }
}`;
