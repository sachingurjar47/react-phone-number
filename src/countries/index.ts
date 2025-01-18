import { flags } from "../flags";
import { allLanguage } from "../locale";
import { Country, GetCountriesProps } from "../types/types";
import {
  getCountries as getCountriesLib,
  getCountryCallingCode,
} from "libphonenumber-js";

export const getCountries = ({ local }: GetCountriesProps = {}): Country[] => {
  const language = allLanguage[local ?? "en"];
  const countries = getCountriesLib()?.map((country) => {
    return {
      country,
      callingCode: getCountryCallingCode(country),
      title: language[country],
      icon: flags[country],
    };
  });

  // Sort the countries array by the 'title' property
  countries?.sort((a, b) => {
    if (a?.title < b?.title) {
      return -1;
    }
    if (a?.title > b?.title) {
      return 1;
    }
    return 0;
  });

  return countries ?? [];
};

export const getCountry = (code: string | number) => {
  return getCountries()?.find(
    (country) => country?.callingCode === String(code)
  )?.country;
};
