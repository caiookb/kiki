import React from "react";
import { StyledButton } from "./Styles";

const CustomButton = ({ title, onClick, color }) => {
  return (
    <StyledButton onClick={onClick} color={color}>
      {title}
    </StyledButton>
  );
};

export default CustomButton;
