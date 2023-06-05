import { getProductName } from "../../helpers/getProductName";
import { fetchApi } from "../fetch/fetchApi";
import { fetchHtml } from "../fetch/fetchHtml";

const getUrlApi = async (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const element = urlParams.get("pelement");
  const productId = element ? element : await getProductId(url);

  return `https://www.pullandbear.com/itxrest/2/catalog/store/24009400/20309422/category/0/product/${productId}/detail?languageId=-5&appId=1`;
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

const mapperPullAndBear = (data, name) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.id,
      sizes: [...new Set(product.sizes.map((size) => size.name))],
      store: "pullandbear",
      name: getProductName(name),
    };
  });
};

export const scrapingPullAndBear = async (url) => {
  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);

  if (json.bundleProductSummaries.length > 0) {
    const name = json.name;
    const detail = json.bundleProductSummaries[0].detail.colors;

    return mapperPullAndBear(detail, name);
  } else {
    const name = json.name;
    const detail = json.detail.colors;

    return mapperPullAndBear(detail, name);
  }
};

const isSizeAvailable = async (data, color, size) => {
  const product = data.filter((product) => product.id === color);
  const sizes = product[0].sizes.filter((sizeModel) => sizeModel.name === size);

  return sizes.some((size) => size.visibilityValue === "SHOW");
};

const getColor = (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const colorId = urlParams.get("colorId");
  const cS = urlParams.get("cS");
  return colorId || cS;
};

export const isProductSizeAvailablePullAndBear = async (product) => {
  const { url, size } = product;

  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);

  const color = getColor(url);

  if (json.bundleProductSummaries.length > 0) {
    const detail = json.bundleProductSummaries[0].detail.colors;
    return isSizeAvailable(detail, color, size);
  } else {
    const detail = json.detail.colors;
    return isSizeAvailable(detail, color, size);
  }
};
