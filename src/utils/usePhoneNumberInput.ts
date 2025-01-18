import React, { useMemo } from "react";
import { Country } from "../types/types";
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { getCountry } from "../countries";

interface PropsString {
  name: string;
  value?: string;
  onChange?: (
    e?:
      | (Record<string, any> & {
          target: {
            name?: string;
            value: PropsString["value"];
            obj?: PropsObject["value"];
          };
        })
      | any
  ) => void;
  onChangeNumber?: (number: string) => void;
  onChangeCountry?: (country: CountryCode, code: string) => void;
  defaultCountry?: CountryCode;
}

export interface PropsObject {
  name: string;
  value?: Omit<Country, "icon" | "title"> & { number?: string };
  onChange?: (
    e?:
      | (Record<string, any> & {
          target: {
            name?: string;
            value: PropsObject["value"];
            str?: PropsString["value"];
          };
        })
      | any
  ) => void;
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

const usePhoneNumberInput = <T extends UsePhoneNumberInputProps>(
  {
    name,
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

    const newTargetValue =
      typeof value === "string"
        ? valueForString!
        : { country: newCountry, callingCode, number };
    const obj = { country: newCountry, callingCode, number };
    const str = valueForString;
    // @ts-ignore
    onChange?.({ target: { name, value: newTargetValue, obj, str } });
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
export default usePhoneNumberInput;
