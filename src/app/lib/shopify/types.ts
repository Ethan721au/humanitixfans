export type Menu = {
  title: string;
  path: string;
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products?: {
      edges: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    first: number;
  };
};
