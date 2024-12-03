export interface Country {
  country: string;
  callingCode: string;
  title: string;
  icon: string;
}

// countries
export interface GetCountriesProps {
  local?: Language;
}

export type Language =
  | "ar"
  | "ca"
  | "cz"
  | "de"
  | "el"
  | "en"
  | "es"
  | "et"
  | "fi"
  | "fr"
  | "he"
  | "hy"
  | "it"
  | "ja"
  | "nb"
  | "nl"
  | "pl"
  | "pt-BR"
  | "pt"
  | "ru"
  | "sk"
  | "sv"
  | "tr"
  | "ua"
  | "vi"
  | "zh";
