export const priceFormatter = (price: string, decimals: number) => {
  return `$${Number(price).toFixed(decimals)}`;
};
