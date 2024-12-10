import React from "react";
import InputContainer from "./InputContainer/InputContainer";
import { InputField } from "./styled";

type InputType = {
  label?: string;
  type?: string;
  defaultValue?: string;
  name?: string;
  // value?: string;
};

export default function Input({
  label = "",
  type = "text",
  defaultValue = "",
  name = "test",
  // value,
}: InputType) {
  return (
    <InputContainer label={label}>
      <InputField type={type} defaultValue={defaultValue} name={name} />
      {/* {error && <div>{error}</div>} */}
    </InputContainer>
  );
}
