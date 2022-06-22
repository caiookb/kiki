import React from "react";
import { StyledInput } from "./Styles";

const TextInput = (props) => {
  const { onKeyPress, onChange, ref, placeholder, type } = props;
  return (
    <StyledInput
      type={type}
      ref={ref}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  );
};

export default TextInput;
