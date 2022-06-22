import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";

export const StyledMessage = styled.div`
  display: flex;
  padding: 10px;

  border: 1px solid #7070703a;
  margin-top: ${(props) => (props.sender == "user" ? "30px" : "5px")};
  align-self: ${(props) => (props.sender == "bot" ? "flex-start" : "flex-end")};
  max-width: 35%;
  width: fit-content;

  color: ${(props) =>
    props.sender == "bot" ? Colors.chatBotColor : Colors.chatUserColor};
  background-color: ${(props) =>
    props.sender == "bot" ? Colors.chatBotBack : Colors.chatUserBack};
  -webkit-box-shadow: 4px 4px 24px -13px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 4px 24px -13px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 4px 24px -13px rgba(0, 0, 0, 0.75);
  border: 1px solid #7070703a;

  ${(props) =>
    props.sender == "bot"
      ? css`
          border-radius: 0px 9px 8px 11px;
          -moz-border-radius: 0px 9px 8px 11px;
          -webkit-border-radius: 0px 9px 8px 11px;
        `
      : css`
          border-radius: 11px 0px 9px 8px;
          -moz-border-radius: 11px 0px 9px 8px;
          -webkit-border-radius: 11px 0px 9px 8px;
        `};
`;
