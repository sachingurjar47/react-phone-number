import React, { useState } from "react";
import PhoneNumber from "../components/PhoneNumber";

export default {
  title: "PhoneNumber",
  component: PhoneNumber,
};

export const Default = () => {
  const [value, setValue] = useState("+918");
  const [valueObj, setValueObj] = useState({
    callingCode: "91",
    number: "8",
  });
  const onChangeCountry = (e: any, j: any) => {
    // console.log("onChangeCountry", e, j);
  };
  const onChangeNumber = (n: any) => {
    // console.log("onChangeNumber", n);
  };
  const onChange = (e: any, j: any) => {
    // console.log("onChange", e, j);
    typeof e === "string" ? setValue(e) : setValueObj(e);
  };
  console.log(value);

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
