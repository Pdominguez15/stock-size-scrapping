import {
  isProductSizeAvailableBershka,
  isProductSizeAvailablePullAndBear,
  isProductSizeAvailableStradivarius,
  isProductSizeAvailableZara,
} from "./stores";

export const scraping = async (product) => {
  let isAvailable = false;
  if (product.store === "zara") {
    isAvailable = await isProductSizeAvailableZara(product);
  } else if (product.store === "stradivarius") {
    isAvailable = await isProductSizeAvailableStradivarius(product);
  } else if (product.store === "pullandbear") {
    isAvailable = await isProductSizeAvailablePullAndBear(product);
  } else if (product.store === "bershka") {
    isAvailable = await isProductSizeAvailableBershka(product);
  }

  return isAvailable;
};
