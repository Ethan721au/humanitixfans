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
