import React from "react";
import { Country } from "../types/types";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
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
      onChangeCountry: (country: string) => void;
      onChangeNumber: (number: string) => void;
    } // Return type for PropsString
  : T extends PropsObject
  ? {
      value?: Partial<Omit<Country, "icon" | "title">> & { number?: string };
      country: CountryCode;
      callingCode: string;
      number: string;
      onChangeCountry: (country: string) => void;
      onChangeNumber: (number: string) => void;
    } // Return type for PropsObject
  : never; // never type to ensure exhaustive checking

export const usePhoneInput = <T extends UsePhoneNumberInputProps>(
  {
    value,
    defaultCountry,
    onChange,
    onChangeCountry: onChangeCountryProps,
    onChangeNumber: onChangeNumberProps,
  }: T = {} as T
): ReturnValue<T> => {
  const data = parsePhoneNumber(
    typeof value === "string" ? value : value?.number!,
    // @ts-ignore
    getCountry(value?.callingCode) ?? defaultCountry
  );
  const res: any = {
    country: data?.country,
    callingCode: data?.countryCallingCode,
    number: data?.nationalNumber,
  };
  const newValue: UsePhoneNumberInputProps["value"] =
    typeof value === "string" ? res.number : { ...res };
  const onChangeCountry = (country: CountryCode) => {
    onChangeCountryProps?.(country, data?.countryCallingCode!);
    onChange?.(
      typeof value === "string"
        ? `+${data?.countryCallingCode ?? ""}${data?.nationalNumber ?? ""}`
        : res,
      typeof value === "string"
        ? res
        : `+${data?.countryCallingCode ?? ""}${data?.nationalNumber ?? ""}`
    );
  };
  const onChangeNumber = (number: string) => {
    const value = number.replace(/[^0-9]/g, "");
    onChangeNumberProps?.(value);
    onChange?.(
      typeof value === "string"
        ? `+${data?.countryCallingCode ?? ""}${data?.nationalNumber ?? ""}`
        : res,
      typeof value === "string"
        ? res
        : `+${data?.countryCallingCode ?? ""}${data?.nationalNumber ?? ""}`
    );
  };
  return {
    value: newValue,
    onChangeCountry,
    onChangeNumber,
    ...res,
  } as ReturnValue<T>;
};
