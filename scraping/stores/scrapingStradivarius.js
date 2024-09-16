import { fetchApi } from "../fetch/fetchApi";

const isSizeAvailable = async (colors, size) => {
  const sizes = colors[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.visibilityValue === "SHOW");
};

export const isProductSizeAvailableStradivarius = async (product) => {
  const { urlScraping, size } = product;

  const json = await fetchApi(urlScraping);

  const colors = json.detail.colors;

  return isSizeAvailable(colors, size);
};
