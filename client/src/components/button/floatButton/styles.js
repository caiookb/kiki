import styled, { css, keyframes } from "styled-components";
import { Colors } from "../../../utils/Colors";

export const StyledFloatButton = styled.div`
  width: fit-content;
  background-color: ${Colors.frontend};
  border: 1px solid #7070703a;
  border-radius: 0px 200px 200px 200px;
  -moz-border-radius: 0px 200px 200px 200px;
  -webkit-border-radius: 0px 200px 200px 200px;
  padding: 20px 25px;

  position: absolute;
  bottom: 15px;
  right: 15px;

  //   -webkit-box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
  //   -moz-box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
  //   box-shadow: 4px 5px 26px -10px rgba(0, 0, 0, 0.75);
`;
