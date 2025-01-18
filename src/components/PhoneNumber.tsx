import { Input, InputRef, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createStyles } from "antd-style";
import { getCountries } from "../countries";
import usePhoneNumberInput, {
  UsePhoneNumberInputProps,
} from "../utils/usePhoneNumberInput";
import { Language } from "../types/types";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";

const useStyles = createStyles(
  ({ token, css, cx }, { inputWidth }: { inputWidth?: number }) => ({
    popupClass: {
      width: `${inputWidth ?? 200}px !important`,
    },
  })
);
const number = parsePhoneNumber("8109126719", "IN");

const data = {
  country: number?.country || "—",
  callingCode: number?.countryCallingCode,
  nationalNumber: number?.nationalNumber,
  number: number?.number,
  formatNational: number?.formatNational(),
  formatInternational: number?.formatInternational(),
  uri: number?.getURI(),
  getPossibleCountries: number?.getPossibleCountries(),
  type: number?.getType() || "—",
  possible: number?.isPossible(),
  valid: number?.isValid(),
};
type Props = UsePhoneNumberInputProps & {
  local?: Language;
};

const PhoneNumber: React.FC<Props> = ({ local, ...rest }) => {
  const inputRef = useRef<InputRef>(null);
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
  const { styles } = useStyles({ inputWidth });

  const { number, country, onChangeCountry, onChangeNumber } =
    usePhoneNumberInput({
      ...rest,
    } as any);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(
        inputRef.current.input?.clientWidth
          ? inputRef.current.input?.clientWidth + 50
          : 0
      );
    }
  }, []);

  return (
    <Input
      ref={inputRef}
      value={number}
      size="middle"
      onChange={(e) => onChangeNumber(e.target.value)}
      addonBefore={
        <Select
          showSearch
          value={country}
          style={{ width: 50 }}
          filterOption={(input, option) => {
            // @ts-ignore
            const data = option?.children?.props?.children;
            let number = data?.[2];
            let country = data?.[4];
            return (
              String(number ?? "")
                ?.toLowerCase()
                .includes(input.toLowerCase()) ||
              String(country ?? "")
                ?.toLowerCase()
                .includes(input.toLowerCase())
            );
          }}
          onChange={(value) => {
            onChangeCountry(value);
          }}
          popupClassName={styles.popupClass}
        >
          {getCountries({ local }).map(
            ({ callingCode, country, icon, title }) => (
              <Option key={country} value={country}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img src={icon} height={16} alt={`${country} flag`} /> +
                  {callingCode} {title}
                </div>
              </Option>
            )
          )}
        </Select>
      }
    />
  );
};

export default PhoneNumber;
