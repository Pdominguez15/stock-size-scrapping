const URL = "https://api.telegram.org/bot";

export const sendMessageToTelegramBot = async (env, product) => {
  // const message = `El producto ${product.name} talla ${product.size} ha entrado en stock.`;

  const message = `
 const deleteProduct = async (id) => {
    const url = https://scraping.preferee21.workers.dev//product?id=${product._id};
  
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      const products = await response.json();
      return products;
    }
    return null;
  };
  
  <b>El producto ${product.name} talla ${product.size} ha entrado en stock.</b>
  <br/>
  ¿Deseas eliminar este producto?
  <br/>
  <button onclick="deleteProduct('${product._id}')">Eliminar Producto</button>
`;

  const url =
    URL +
    env.TOKEN_TELEGRAM +
    "/sendMessage?" +
    new URLSearchParams({
      chat_id: product.notification,
      text: message,
      parse_mode: "HTML",
    });

  return await fetch(url);
};
