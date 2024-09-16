import { fetchApi } from "../fetch/fetchApi";

const isSizeAvailable = async (data, size) => {
  const sizes = data[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.visibilityValue === "SHOW");
};

export const isProductSizeAvailablePullAndBear = async (product) => {
  const { urlScraping, size } = product;

  const json = await fetchApi(urlScraping);

  if (json.bundleProductSummaries.length > 0) {
    const detail = json.bundleProductSummaries[0].detail.colors;
    return isSizeAvailable(detail, size);
  } else {
    const detail = json.detail.colors;
    return isSizeAvailable(detail, size);
  }
};
