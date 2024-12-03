import React from "react";
import { Country } from "../types/types";
interface PropsString {
  value?: string;
  onChange?: () => void;
}
interface PropsObject {
  value?: Partial<Omit<Country, "icon" | "title">> & { number?: string };
  onChange?: () => void;
  onChangeNumber?: () => void;
  onChangeCallingCode?: () => void;
}
type Props = PropsString | PropsObject;
interface ReturnValue {
  value?: Props["value"];
}
export const usePhoneInput = ({}: Props = {}): ReturnValue => {
  const [callingCode, setCallingCode] = React.useState("");
  const [inputNumber, setInputNumber] = React.useState("");
  return {};
};
