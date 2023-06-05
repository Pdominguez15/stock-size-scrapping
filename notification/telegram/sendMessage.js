const URL = "https://api.telegram.org/bot";

export const sendMessageToTelegramBot = async (env, product) => {
  const message = `El producto ${product.name} talla ${product.size} ha entrado en stock.`;

  const url =
    URL +
    env.TOKEN_TELEGRAM +
    "/sendMessage?" +
    new URLSearchParams({
      chat_id: product.notification,
      text: message,
    });

  return await fetch(url);
};
