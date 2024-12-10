"use server";

export const getFormData = async (
  previousState: string,
  formData: FormData
) => {
  const addOn = formData.get("add-on");
  const test = formData.get("test");
  const image = formData.get("product");
  // console.log(addOn, "add-on");
  // console.log(test, "test");
  // console.log(image, "product");
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
  // const data = {};
  // for (const [key, value] of formData.entries()) {
  //   data[key] = value;
  // }
  // console.log(data, "data");

  // const data = {};

  const result = {};
  for (const [key, value] of formData.entries()) {
    // Handle 'add-on' entries as an array
    if (key === "addOns") {
      if (!result[key]) {
        result[key] = []; // Initialize an array for add-ons
      }
      result[key].push(value); // Add each 'add-on' value to the array
    } else {
      result[key] = value; // Assign other entries as key-value pairs
    }
  }

  console.log(result);

  return "Product added to cart";
  // return JSON.stringify(result);
};
