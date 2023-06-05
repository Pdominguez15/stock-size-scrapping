import * as cheerio from "cheerio";

export const fetchHtml = async (url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      Connection: "keep-alive",
    },
  });
  const html = await res.text();
  return cheerio.load(html);
};
