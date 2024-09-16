import { sendEmail } from "./email/sendEmail";
import { sendMessageToTelegramBot } from "./telegram/sendMessage";

export const sendNotification = async (product, env) => {
  let response = "";

  if (product.notification.includes("@")) {
    response = await sendEmail(env, product);
  } else {
    response = await sendMessageToTelegramBot(env, product);
  }
  return response;
};
