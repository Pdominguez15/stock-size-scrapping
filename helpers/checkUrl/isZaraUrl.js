export const isZaraUrl = (url) => {
  const regexZara = new RegExp(/https:\/\/www.zara.com\/(es|ES)\/es\//);

  return regexZara.test(url);
};
