import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../../utils/Colors";

export const StyledButton = styled.div`
  background-color: ${(props) => Colors[props.color]};
  border-radius: 0px 200px 200px 200px;
  -moz-border-radius: 0px 200px 200px 200px;
  -webkit-border-radius: 0px 200px 200px 200px;
  padding: 15px;
  text-align: center;
  margin-top: 5px;

  //   -webkit-box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
  //   -moz-box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
  //   box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
`;
