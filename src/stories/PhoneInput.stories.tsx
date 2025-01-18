import React, { useState } from "react";
import PhoneNumber from "../components/PhoneNumber";
import { Country } from "../types/types";
import { PropsObject } from "../utils/usePhoneNumberInput";

export default {
  title: "PhoneNumber",
  component: PhoneNumber,
};

export const Default = () => {
  const [value, setValue] = useState("+918");
  const [valueObj, setValueObj] = useState<PropsObject["value"]>({
    number: "8",
    country: "IN",
  });
  const onChangeCountry = (e: any, j: any) => {
    // console.log("onChangeCountry", e, j);
  };
  const onChangeNumber = (n: any) => {
    // console.log("onChangeNumber", n);
  };
  const onChange = (e: any, j: any) => {
    typeof e === "string" ? setValue(e) : setValueObj(e);
  };
  // console.log(valueObj);

  return (
    <>
      <PhoneNumber
        value={value}
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        onChange={onChange}
      />
      <PhoneNumber
        value={valueObj}
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        onChange={onChange}
      />
    </>
  );
};
