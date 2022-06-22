import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";
import { background } from "../../assets/images";
export const StyledChatComponent = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justicy-content: space-between;
  background: #f9a54b30;
`;

export const StyledMessagesField = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  padding-right: 8%;
  padding-left: 8%;
  background: url(${background});
`;

export const StyledCardView = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #7070703a;
  border-radius: 5px;
  max-width: 400px;
`;

export const StyledInputView = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-around;
  width: 98%;
  padding: 10px;
  padding-left; 20px;
  background: #F6F6F6;
`;

export const StyledImage = styled.img`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  height: 78px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
