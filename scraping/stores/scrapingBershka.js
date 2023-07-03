import { getProductName } from "../../helpers/getProductName";
import { fetchApi } from "../fetch/fetchApi";
import { fetchHtml } from "../fetch/fetchHtml";

const getUrlApi = async (url) => {
  const productId = await getProductId(url);

  return `https://www.bershka.com/itxrest/3/catalog/store/44009500/40259530/productsArray?productIds=${productId}&languageId=-5`;
};

const getProductId = async (url) => {
  const $ = await fetchHtml(url);
  const $scripts = $(
    "script[data-n-head='ssr'][data-body='true'][data-hid='inditex-object']"
  );

  const $script = $scripts.filter((_, script) =>
    $(script).text().includes("iProductId")
  );

  const productId = $script
    .text()
    .split(",")
    .filter((line) => line.includes("iProductId"))[0]
    .split(":")[1]
    .trim();

  return productId;
};

const mapperBershka = (data, name) => {
  return data.map((product) => {
    return {
      color: product.name,
      id: product.id,
      sizes: [...new Set(product.sizes.map((size) => size.name))],
      store: "bershka",
      name: getProductName(name),
    };
  });
};

export const scrapingBershka = async (url) => {
  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);

  if (json.products[0].bundleProductSummaries.length > 0) {
    const detail = json.products[0].bundleProductSummaries[0].detail.colors;
    const name = json.products[0].name;
    return mapperBershka(detail, name);
  } else {
    const detail = json.products[0].detail.colors;
    const name = json.products[0].name;
    return mapperBershka(detail, name);
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
  return colorId;
};

export const isProductSizeAvailableBershka = async (product) => {
  const { url, size } = product;

  const urlApi = await getUrlApi(url);
  const json = await fetchApi(urlApi);

  const color = getColor(url);

  if (json.products[0].bundleProductSummaries.length > 0) {
    const detail = json.products[0].bundleProductSummaries[0].detail.colors;
    return isSizeAvailable(detail, color, size);
  } else {
    const detail = json.products[0].detail.colors;
    return isSizeAvailable(detail, color, size);
  }
};
