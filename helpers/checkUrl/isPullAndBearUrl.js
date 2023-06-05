export const isPullAndBearUrl = (url) => {
  const regexPullAndBear = new RegExp(/https:\/\/www.pullandbear.com\/es\//);

  return regexPullAndBear.test(url);
};
