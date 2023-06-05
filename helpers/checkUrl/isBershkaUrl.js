export const isBershkaUrl = (url) => {
  const regexBershka = new RegExp(/https:\/\/www.bershka.com\/es\//);

  return regexBershka.test(url);
};
