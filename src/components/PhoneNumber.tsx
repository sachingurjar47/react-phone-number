import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createStyles } from "antd-style";
import { getCountries } from "../countries";
import { usePhoneInput } from "../utils/usePhoneNumberInput";

const useStyles = createStyles(
  ({ token, css, cx }, { width = 70 }: { width?: number }) => ({
    popupClass: {
      width: `${width + 70}px !important`,
    },
  })
);

interface Props {}

const PhoneNumber: React.FC<Props> = (props) => {
  const inputRef = useRef<any>(null);
  const { value } = usePhoneInput({ value: "" });
  const [callingCode, setCallingCode] = useState("");
  const [inputNumber, setInputNumber] = useState("");
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
  return (
    <div>
      <Input
        value={inputNumber}
        ref={inputRef}
        addonBefore={
          <Select
            value={callingCode}
            className="name"
            popupClassName={styles.popupClass}
            style={{ width: 70 }}
            onChange={(value) => setCallingCode(value)}
          >
            {getCountries().map(({ callingCode, country, icon, title }) => (
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
            ))}
          </Select>
        }
        type="number"
        onChange={(e) => setInputNumber(e.target.value)}
      />
    </div>
  );
};

export default PhoneNumber;
