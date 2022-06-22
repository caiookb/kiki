import React from "react";
import { StyledMessages, StyledMessage } from "./Styles";

const Messages = (props) => {
  return <StyledMessage sender={props.speaks}>{props.text}</StyledMessage>;
};

export default Messages;
