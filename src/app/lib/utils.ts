type FormDataResult = {
  [key: string]: string | string[];
};

const attributeValues = {
  "Quote up to 8 words": "quote",
  Personalization: "personalization",
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
