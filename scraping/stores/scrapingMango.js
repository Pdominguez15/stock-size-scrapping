import { fetchApi } from "../fetch/fetchApi";

const isSizeAvailable = (colors, size) => {
  const sizes = colors[0].sizes.filter((sizeModel) => sizeModel.value === size);

  return sizes.some((size) => size.available);
};

export const isProductSizeAvailableMango = async (product) => {
  const { urlScraping, size } = product;

  const json = await fetchApi(urlScraping);

  return isSizeAvailable(json.colors.colors, size);
};
