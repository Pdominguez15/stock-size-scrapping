export const isStradivariusUrl = (url) => {
  const regexStradivarius = new RegExp(/https:\/\/www.stradivarius.com\/es\//);

  return regexStradivarius.test(url);
};
