import {
  connectionBD,
  getDataFromBD,
  deleteProduct,
  disconnectBD,
} from "../bd/connection";
import { scraping } from "../scraping/scraping";
import { sendNotification } from "../notification/sendNotification";

export const checkAvailabilityAndNotify = async (env) => {
  const user = await connectionBD(env);
  const products = await getDataFromBD(user);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const isAvailable = await scraping(product);
    if (isAvailable) {
      const response = await sendNotification(product, env);
      if (response.ok && product.notification.includes("@")) {
        await deleteProduct(user, product);
      }
    }
  }

  await disconnectBD(user);
};
