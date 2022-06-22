import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0% {
  }
  100% {
  }
`;

export const StyledLetterSpan = styled.span`
  animation-name: ${bounce};
  animation-duration: 1.5s;
  animation-direction: normal;
  animation-fill-mode: forwards;
  transition: 1s ease in;
`;
export const StyledHomeComponent = styled.div`
  animation-name: ${fade};
  animation-duration: 1.5s;
  animation-direction: normal;
  animation-fill-mode: forwards;
`;
export const StyledHome = styled.div`
  background: rgb(155, 209, 173);
  background: linear-gradient(
    180deg,
    rgba(155, 209, 173, 1) 73%,
    rgba(155, 209, 173, 0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 620px;
  margin-bottom: 50px;
  text-align: center;
`;

export const StyledStart = styled.div`
  cursor: pointer;
  transition: 0.2s ease-in;
  &:hover {
    transform: rotate(20deg); /* Equal to rotateZ(45deg) */
  }
`;
export const StyledOptions = styled.div``;
export const StyledImageView = styled.div`
  cursor: pointer;
`;
export const StyledImage = styled.img`
  cursor: pointer;
`;
