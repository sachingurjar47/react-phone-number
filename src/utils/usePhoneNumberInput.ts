import React, { useMemo } from "react";
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

export interface PropsObject {
  value?: Omit<Country, "icon" | "title"> & { number?: string };
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
      value?: Omit<Country, "icon" | "title"> & { number?: string };
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
    defaultCountry = "US",
    onChange,
    onChangeCountry: onChangeCountryProps,
    onChangeNumber: onChangeNumberProps,
  }: T = {} as T
): ReturnValue<T> => {
  const asYouType = useMemo(() => {
    return new AsYouType(
      typeof value === "string" ? undefined : value?.country ?? defaultCountry
    );
  }, [value, defaultCountry]);

  const num = useMemo(
    () =>
      asYouType.input(typeof value === "string" ? value : value?.number ?? ""),
    [value, asYouType]
  );
  console.log(asYouType);

  const phoneNumber = useMemo(() => asYouType.getNumber(), [asYouType]);
  // @ts-ignore
  const country: CountryCode = useMemo(() => {
    return (
      phoneNumber?.country ??
      (typeof value === "string"
        ? getCountry(num.replace("+", ""))
        : getCountry(value?.callingCode!) ?? defaultCountry)
    );
  }, [phoneNumber, value, num, defaultCountry]);

  const callingCode = useMemo(() => {
    return (
      phoneNumber?.countryCallingCode ??
      (typeof value === "string"
        ? num.replace("+", "")
        : getCountryCallingCode(country!))
    );
  }, [phoneNumber, value, num, country]);

  const number = useMemo(
    () => phoneNumber?.nationalNumber ?? "",
    [phoneNumber]
  );

  const res: PropsObject["value"] = { country, callingCode, number };
  const newValue: UsePhoneNumberInputProps["value"] =
    typeof value === "string" ? number : { ...res };

  const handleChange = (
    newCountry?: CountryCode,
    number?: string,
    valueForString?: string
  ) => {
    const callingCode = getCountryCallingCode(newCountry!) as string;
    onChangeCountryProps?.(newCountry!, callingCode);
    onChange?.(
      // @ts-ignore
      typeof value === "string"
        ? valueForString!
        : { country: newCountry, callingCode, number },
      typeof value === "string"
        ? { country: newCountry, callingCode, number }
        : valueForString
    );
  };

  const onChangeCountry = (country: CountryCode) => {
    const callingCode = getCountryCallingCode(country);
    const valueForString = `+${callingCode}${number}`;
    handleChange(country, number!, valueForString);
  };

  const onChangeNumber = (number: string) => {
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
