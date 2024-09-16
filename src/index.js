import { Router } from "itty-router";
import { saveProduct, getProducts, deleteProductAlert } from "../bd/connection";

import { checkAvailabilityAndNotify } from "../scraping/checkAvailabilityAndNotify";

const router = Router();

router.get("/products", async (request, env) => {
  const notification = request.query?.notification;

  if (!notification) {
    return new Response("Missing data", { status: 400 });
  }

  const products = await getProducts(env, notification);

  return new Response(JSON.stringify(products), { status: 200 });
});

router.delete("/product", async (request, env) => {
  const id = request.query?.id;

  if (!id) {
    return new Response("Missing data", { status: 400 });
  }

  const response = await deleteProductAlert(env, id);

  return new Response(JSON.stringify(response), { status: 200 });
});

router.post("/saveProduct", async (request, env) => {
  const product = await request.json();

  if (
    !product?.url ||
    !product?.urlScraping ||
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
