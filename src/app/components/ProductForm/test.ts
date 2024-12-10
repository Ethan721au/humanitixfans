"use server";

export const getFormData = async (
  previousState: string,
  formData: FormData
) => {
  "use server";
  const addOn = formData.get("add-on");
  const test = formData.get("test");
  const image = formData.get("product");
  console.log(addOn, "add-on");
  console.log(test, "test");
  console.log(image, "product");

  return "Product added to cart";
};
