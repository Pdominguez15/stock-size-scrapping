import { Router } from "itty-router";
import { saveProduct, getProducts } from "../bd/connection";

import { isUrlValid } from "../helpers";

import { checkAvailabilityAndNotify, getProductInfo } from "../scraping";

const router = Router();

router.post("/productInfo", async (request) => {
  const params = await request.json();

  if (isUrlValid(params.url)) {
    const productInfo = await getProductInfo(params.url);
    return new Response(JSON.stringify(productInfo), { status: 200 });
  }

  return new Response("Error with the params", { status: 400 });
});

router.get("/products", async (request, env) => {
  const notification = request.query?.notification;

  if (!notification) {
    return new Response("Missing data", { status: 400 });
  }

  const products = await getProducts(env, notification);

  return new Response(JSON.stringify(products), { status: 200 });
});

router.post("/saveProduct", async (request, env) => {
  const product = await request.json();

  if (
    !product?.url ||
    !product?.size ||
    !product?.store ||
    !product?.name ||
    !product?.notification
  ) {
    return new Response("Missing data", { status: 400 });
  }

  await saveProduct(env, product);

  return new Response("Product saved", { status: 201 });
});

export default {
  async scheduled(controller, env, ctx) {
    ctx.waitUntil(await checkAvailabilityAndNotify(env));
  },
  async fetch(request, env, context) {
    return await router.handle(request, env);
  },
};
