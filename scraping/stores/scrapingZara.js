import { fetchApi } from "../fetch/fetchApi";

const isSizeAvailable = async (colors, size) => {
  const sizes = colors[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.availability !== "out_of_stock");
};

export const isProductSizeAvailableZara = async (product) => {
  const { urlScraping, size } = product;

  const json = await fetchApi(urlScraping);

  const detail = json.product.detail.colors;

  return isSizeAvailable(detail, size);
};
