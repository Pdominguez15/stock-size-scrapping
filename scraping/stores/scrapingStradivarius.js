import { getProductName } from "../../helpers/getProductName";
import { fetchApi } from "../fetch/fetchApi";
import { fetchHtml } from "../fetch/fetchHtml";

const getUrlApi = async (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const element = urlParams.get("pelement");
  const productId = element ? element : await getProductId(url);

  return `https://www.stradivarius.com/itxrest/2/catalog/store/54009550/50331075/category/0/product/${productId}/detail?languageId=-5&appId=1`;
};

const getProductId = async (url) => {
  const $ = await fetchHtml(url);
  const $scripts = $("script[type='text/javascript'][crossorigin='anonymous']");

  const $script = $scripts.filter((_, script) =>
    $(script).text().includes("iProductId")
  );

  const productId = $script
    .text()
    .split(";")
    .filter((line) => line.includes("iProductId"))[0]
    .split("=")[1]
    .trim();

  return productId;
};

const mapperStradivarius = (data, name) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.id,
      sizes: [...new Set(product.sizes.map((size) => size.name))],
      store: "stradivarius",
      name: getProductName(name),
    };
  });
};

export const scrapingStradivarius = async (url) => {
  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);
  const name = json.detail.description;
  const detail = json.detail.colors;

  return mapperStradivarius(detail, name);
};

const isSizeAvailable = async (data, color, size) => {
  const product = data.filter((product) => product.id === color);
  const sizes = product[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.visibilityValue === "SHOW");
};

const getColor = (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const color = urlParams.get("colorId");

  return color;
};

export const isProductSizeAvailableStradivarius = async (product) => {
  const { url, size } = product;

  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);

  const color = getColor(url);
  const detail = json.detail.colors;

  return isSizeAvailable(detail, color, size);
};
