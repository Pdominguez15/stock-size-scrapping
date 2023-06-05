import { isBershkaUrl } from "./isBershkaUrl";
import { isPullAndBearUrl } from "./isPullAndBearUrl";
import { isStradivariusUrl } from "./isStradivariusUrl";
import { isZaraUrl } from "./isZaraUrl";

export const isUrlValid = (url) => {
  return (
    isZaraUrl(url) ||
    isStradivariusUrl(url) ||
    isPullAndBearUrl(url) ||
    isBershkaUrl(url)
  );
};
