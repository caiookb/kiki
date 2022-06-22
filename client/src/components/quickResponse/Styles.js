import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";

export const StyledQuickReplies = styled.div`
  margin-top: 5px;
`;

export const StyledTextView = styled.div`
  background-color: ${Colors.chatUserQuickBack};
  color: ${Colors.chatBotColor};
  border-radius: 8px;
  border: 1px solid #7070703a};
  border-radius: 0px 9px 8px 11px;
  -moz-border-radius: 0px 9px 8px 11px;
  -webkit-border-radius: 0px 9px 8px 11px;
  max-width: 35%;
  padding: 10px;
  margin-bottom: 30px;

    @media (max-width: 500px) {
    width: unset;

    max-width: 80%;
  }
`;

export const StyledText = styled.p``;

export const StyledOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  ${(props) =>
    props.length > 2 &&
    css`
      @media (max-width: 500px) {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
      }
    `}
`;

export const StyledQuickReply = styled.a`
  background-color: ${Colors.chatUserQuickBack};
  border-radius: 8px;
  color: ${Colors.chatUserColor};
  padding: 10px;
  min-width: 50px;
  text-align: center;
  transition: 0.2s ease-in;
  border: 2px solid ${Colors.chatUserQuickBorder};
  margin-left: 25px;

  @media (max-width: 500px) {
    margin-top: 5px;
  }

  &:hover {
    transition: 1s ease in;
    filter: saturate(8);
  }
`;
