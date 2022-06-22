import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";

export const StyledCardSection = styled.div`
  height: auto;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${Colors.chatBotBack};
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
`;

export const StyledCardMessage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCardTitle = styled.p`
  flex-direction: column;
  border-bottom: 1px solid #7070703a;
`;

export const StyledCardDescription = styled.h4`
  flex-direction: column;
  border-bottom: 1px solid #7070703a;
  font-size: 16px;
  font-weight: normal;
`;

export const StyledCardImage = styled.img`
  width: 100px;
`;

export const StyledAction = styled.a`
  border: 1px solid #7070703a;
  padding: 10px;
  background: ${Colors.chatUserBack};
  text-decoration: none;
  font-weight: bold;
`;
