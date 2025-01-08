import { getCountries } from "libphonenumber-js";
const countryList = getCountries();

const loadFlag = (countryCode: string) => {
  try {
    const flag = require(`./${countryCode}.svg`);
    return flag;
  } catch (error) {
    console.error(`Error loading flag for ${countryCode}:`, error);
    return null;
  }
};
const loadAllFlags = () => {
  const flags: Record<string, string> = {};
  countryList.forEach((countryCode) => {
    const flagImage = loadFlag(countryCode);
    if (flagImage) {
      flags[countryCode] = flagImage;
    }
  });

  return flags;
};

const flags = loadAllFlags();

export { flags };
