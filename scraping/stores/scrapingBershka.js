import { fetchApi } from "../fetch/fetchApi";

const isSizeAvailable = async (colors, size) => {
  const sizes = colors[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.visibilityValue === "SHOW");
};

export const isProductSizeAvailableBershka = async (product) => {
  const { urlScraping, size } = product;

  const json = await fetchApi(urlScraping);

  if (json.products[0].bundleProductSummaries.length > 0) {
    const colors = json.products[0].bundleProductSummaries[0].detail.colors;
    return isSizeAvailable(colors, size);
  } else {
    const colors = json.products[0].detail.colors;
    return isSizeAvailable(colors, size);
  }
};
