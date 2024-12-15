import { getProduct } from "./shopify";
import { Attributes } from "./shopify/types";

type FormDataResult = {
  [key: string]: string | string[];
};

type Line = {
  merchandiseId?: string;
  quantity?: number;
  attributes?: Attributes[];
};

const attributeValues = {
  "Quote up to 8 words": "quote",
  Personalization: "personalization",
  "Character name": "characterName",
};

export const extractAttributes = (formData: FormData) => {
  const result: FormDataResult = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      if (key === "addOns") {
        if (!result[key]) {
          result[key] = [];
        }
        (result[key] as string[]).push(value);
      } else {
        result[key] = value;
      }
    } else {
      console.warn(`Unexpected File input: ${key}`, value);
    }
  }

  const attributes = (result.addOns as string[]).map((addOn) => {
    return {
      key: addOn,
      value: result[attributeValues[addOn]],
    };
  });

  return attributes;
};

export const prepareLines = async (formData: FormData, collection: string) => {
  const lines: Line[] = [];
  const items = Object.fromEntries(formData.entries());
  console.log(items, "items");
  const product = await getProduct(items[collection] as string);
  const linesWithProduct = [
    ...lines,
    {
      merchandiseId: product.variants[0].id,
      quantity: 1,
      attributes: [],
    },
  ];
  const excludedKeys = ["send-in-item", "inkColor", "variant"];

  const addOns = Object.entries(items)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([key]) => {
      return {
        merchandiseId: key,
        quantity: 1,
        attributes: [],
      };
    });

  const linesWithAddOns = [...linesWithProduct, ...addOns];
  console.log(linesWithAddOns, "linesWithAddOns");

  const variant = product.variants.find((v) => v.title === items.variant);

  console.log(addOns, "addOns");
  console.log(product, "product");
  console.log(variant, "variant");
};
