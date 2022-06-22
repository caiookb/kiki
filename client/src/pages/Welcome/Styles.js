import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../utils/Colors";

export const StyledHome = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Colors.background};
  display: grid;
  place-items: center;
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 90vh;
  text-align: center;
`;

export const StyledOptions = styled.div``;
