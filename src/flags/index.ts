import { getCountries } from "libphonenumber-js";
const countryList = getCountries();

const loadFlag = (countryCode: string) => {
  try {
    return require(`./${countryCode}.svg`);
  } catch (error) {
    console.error(`Error loading flag for ${countryCode}:`, error);
    return null;
  }
};

const flags = countryList.reduce((acc: any, countryCode) => {
  const flagImage = loadFlag(countryCode);
  if (flagImage) {
    acc[countryCode] = flagImage;
  }
  return acc;
}, {});

export { flags };
