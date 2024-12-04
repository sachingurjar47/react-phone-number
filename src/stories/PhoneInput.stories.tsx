import React, { useState } from "react";
import PhoneNumber from "../components/PhoneNumber";

export default {
  title: "PhoneNumber",
  component: PhoneNumber,
};

export const Default = () => {
  const [value, setValue] = useState("+918109126719");
  const [valueObj, setValueObj] = useState({
    callingCode: "91",
    number: "8770786508",
  });
  const onChangeCountry = (e: any, j: any) => {
    console.log(e, j);
  };
  const onChangeNumber = (n: any) => {
    console.log(n);
  };
  return (
    <>
      <PhoneNumber
        value={value}
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        onChange={(e: any) => setValue(e)}
      />
      <PhoneNumber
        value={valueObj}
        onChangeNumber={onChangeNumber}
        onChangeCountry={onChangeCountry}
        onChange={(e: any) => setValueObj(e)}
      />
    </>
  );
};
