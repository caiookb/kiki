import React from "react";
import { StyledNav, StyledImage, StyledOptions } from "./Styles";
import { kikilogo, kiki } from "../../assets/images";
import { StyledLetterSpan } from "../../pages/Home/Styles";
const Nav = (props) => {
  const isChat = window.location.pathname.includes("chat");

  return (
    <StyledNav>
      <StyledImage src={isChat ? kiki : kikilogo}></StyledImage>
      <p style={{ marginLeft: 30, marginTop: 20, fontSize: 26 }}>
        <StyledLetterSpan style={{ color: "#C76E80" }}>k</StyledLetterSpan>i
        <StyledLetterSpan style={{ color: "#F9A54B" }}>k</StyledLetterSpan>i
      </p>

      <StyledOptions></StyledOptions>
    </StyledNav>
  );
};

export default Nav;
