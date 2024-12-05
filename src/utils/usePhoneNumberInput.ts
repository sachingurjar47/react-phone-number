import React from "react";
import { Country } from "../types/types";
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { getCountry } from "../countries";

interface PropsString {
  value?: string;
  onChange?: (value: PropsString["value"], obj?: PropsObject["value"]) => void;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: CountryCode, code: string) => void;
  defaultCountry?: CountryCode;
}

interface PropsObject {
  value?: Partial<Omit<Country, "icon" | "title">> & { number?: string };
  onChange?: (value: PropsObject["value"], str?: PropsString["value"]) => void;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: CountryCode, code: string) => void;
  defaultCountry?: CountryCode;
}

export type UsePhoneNumberInputProps = PropsString | PropsObject;

// Conditional ReturnValue type based on Props type
type ReturnValue<T extends UsePhoneNumberInputProps> = T extends PropsString
  ? {
      value?: string;
      country: CountryCode;
      callingCode: string;
      number: string;
      onChangeCountry: (country: CountryCode) => void;
      onChangeNumber: (number: string) => void;
    }
  : T extends PropsObject
  ? {
      value?: Partial<Omit<Country, "icon" | "title">> & { number?: string };
      country: CountryCode;
      callingCode: string;
      number: string;
      onChangeCountry: (country: CountryCode) => void;
      onChangeNumber: (number: string) => void;
    }
  : never;

export const usePhoneNumberInput = <T extends UsePhoneNumberInputProps>(
  {
    value,
    defaultCountry,
    onChange,
    onChangeCountry: onChangeCountryProps,
    onChangeNumber: onChangeNumberProps,
  }: T = {} as T
): ReturnValue<T> => {
  const asYouType = new AsYouType(
    typeof value === "string"
      ? undefined
      : getCountry(value?.callingCode!) ?? defaultCountry
  );
  const num = asYouType.input(
    typeof value === "string" ? value : value?.number ?? ""
  );
  const phoneNumber = asYouType.getNumber();

  const country =
    phoneNumber?.country ??
    (typeof value === "string"
      ? getCountry(num.replace("+", ""))
      : getCountry(value?.callingCode!) ?? defaultCountry);
  const callingCode =
    phoneNumber?.countryCallingCode ??
    (typeof value === "string"
      ? num.replace("+", "")
      : getCountryCallingCode(country!));
  const number = phoneNumber?.nationalNumber ?? "";

  const res: PropsObject["value"] = { country, callingCode, number };

  console.log(phoneNumber, num, res);
  const newValue: UsePhoneNumberInputProps["value"] =
    typeof value === "string" ? number : { ...res };

  const handleChange = (
    newCountry?: CountryCode,
    number?: string,
    valueForString?: string
  ) => {
    const callingCode = getCountryCallingCode(newCountry!) as any;
    onChangeCountryProps?.(newCountry!, callingCode!);
    onChange?.(
      typeof value === "string"
        ? valueForString!
        : ({ country: newCountry, callingCode, number } as any),
      typeof value === "string"
        ? ({ country: newCountry, callingCode, number } as any)
        : valueForString
    );
  };

  const onChangeCountry = (country: CountryCode) => {
    const callingCode = getCountryCallingCode(country!) as any;
    const valueForString = `+${callingCode}${number}`;
    handleChange(country, number!, valueForString);
  };

  const onChangeNumber = (number: string) => {
    if (phoneNumber?.isPossible()) {
    }
    const sanitizedNumber = number.replace(/[^0-9]/g, "");
    onChangeNumberProps?.(sanitizedNumber);
    const valueForString = `+${callingCode}${sanitizedNumber}`;
    handleChange(country!, sanitizedNumber, valueForString);
  };

  return {
    value: newValue,
    onChangeCountry,
    onChangeNumber,
    ...res,
  } as ReturnValue<T>;
};
