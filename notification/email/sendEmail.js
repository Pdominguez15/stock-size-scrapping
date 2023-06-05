export const sendEmail = async (env, product) => {
  return await fetch(env.MAILSERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: product.notification,
      product: product.name + " talla " + product.size,
    }),
  });
};
