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

  return countries ?? [];
};