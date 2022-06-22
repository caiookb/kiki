import React from "react";
import { StyledFloatButton } from "./styles";

const FloatButton = ({ title, onClick }) => (
  <StyledFloatButton onClick={onClick}> {title}</StyledFloatButton>
);

export default FloatButton;
