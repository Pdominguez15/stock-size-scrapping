import {
  isZaraUrl,
  isBershkaUrl,
  isPullAndBearUrl,
  isStradivariusUrl,
} from "../helpers/checkUrl";

import {
  scrappingZara,
  scrapingStradivarius,
  scrapingPullAndBear,
  scrapingBershka,
} from "./stores";

export const getProductInfo = (url) => {
  if (isZaraUrl(url)) {
    return scrappingZara(url);
  } else if (isStradivariusUrl(url)) {
    return scrapingStradivarius(url);
  } else if (isPullAndBearUrl(url)) {
    return scrapingPullAndBear(url);
  } else if (isBershkaUrl(url)) {
    return scrapingBershka(url);
  }
};
