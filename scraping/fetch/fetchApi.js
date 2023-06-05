export const fetchApi = async (url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
      connection: "keep-alive",
    },
  });
  const json = await res.json();
  return json;
};
