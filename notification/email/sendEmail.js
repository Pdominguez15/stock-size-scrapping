export const sendEmail = async (env, product) => {
  return await fetch(env.MAILSERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: product.notification,
      name: product.name,
      size: product.size,
      url: product.url,
    }),
  });
};
