import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createStyles } from "antd-style";
import { getCountries } from "../countries";
import {
  usePhoneInput,
  UsePhoneNumberInputProps,
} from "../utils/usePhoneNumberInput";
import { Language } from "../types/types";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";

const useStyles = createStyles(
  ({ token, css, cx }, { width = 70 }: { width?: number }) => ({
    popupClass: {
      width: `${width + 70}px !important`,
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
  const inputRef = useRef<any>(null);
  const { number, country, onChangeCountry, onChangeNumber } = usePhoneInput({
    ...rest,
  } as any);
  const [inputWidth, setInputWidth] = useState<number>(70);
  useEffect(() => {
    if (inputRef?.current?.input?.clientWidth) {
      setInputWidth(inputRef.current.input.clientWidth);
    }
  }, []);
  const { styles } = useMemo(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    () => useStyles({ width: inputWidth }),
    [inputWidth]
  );
  // console.log(data, number);

  return (
    <div>
      <Input
        value={number}
        onChange={(e) => onChangeNumber(e.target.value)}
        ref={inputRef}
        addonBefore={
          <Select
            value={country}
            className="name"
            popupClassName={styles.popupClass}
            style={{ width: 70 }}
            onChange={(value) => onChangeCountry(value)}
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
    </div>
  );
};

export default PhoneNumber;
