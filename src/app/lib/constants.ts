export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "product_hidden";

export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2024-10/graphql.json";

export const excludedKeys = ["Send-in item", "inkColor", "variant"];

export const video = {
  desktop: "https://static.humanitix.com/website/videos/hx_home.mp4",
  mobile: "https://static.humanitix.com/website/videos/hx_home_mobile.mp4",
};

export const initialVideoSize = {
  clipPath: "inset(0%)",
  matrix: "matrix(1, 0, 0, 1, 0, 0)",
};

export const cartAttributes = {
  "send-in-item": [
    { key: "inkColor", label: "Ink Color", type: "text", value: "red" },
    { key: "packageSize", label: "Package Size", type: "text", value: "blue" },
  ],
  "item-from-store": [
    { key: "inkColor", label: "Ink Color", type: "text", value: "" },
    { key: "packageSize", label: "Package Size", type: "text", value: "" },
  ],
  "pre-signed-item": [
    { key: "inkColor", label: "Ink Color", type: "text", value: "" },
    { key: "packageSize", label: "Package Size", type: "text", value: "" },
  ],
};
