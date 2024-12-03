// @ts-ignore
const flagImages = require.context("./", false, /\.svg$/);
// @ts-ignore
const flags = flagImages.keys().reduce((acc, fileName) => {
  const flagKey = fileName.replace("./", "").replace(".svg", "");
  acc[flagKey] = flagImages(fileName);
  return acc;
}, {});

export { flags };
