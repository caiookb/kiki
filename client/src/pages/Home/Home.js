import React from "react";
import { connect } from "react-redux";
import { Chat } from "..";
import { FloatButton, Nav } from "../../components";
import {
  StyledHome,
  StyledInfo,
  StyledImage,
  StyledOptions,
  StyledStart,
  StyledImageView,
  StyledHomeComponent,
  StyledLetterSpan,
} from "./Styles";

import { kiki, start } from "../../assets/images";

const Home = (props) => {
  const { activateChat, history } = props;

  return (
    <StyledHomeComponent>
      <Nav />
      <StyledHome>
        <StyledImageView>
          <StyledImage src={kiki} />
        </StyledImageView>
        <StyledInfo>
          <h2 style={{ fontSize: 40, fontWeight: 400 }}>
            Hey! I'm{" "}
            <StyledLetterSpan style={{ color: "#C76E80" }}>k</StyledLetterSpan>i
            <StyledLetterSpan style={{ color: "#F9A54B" }}>k</StyledLetterSpan>i
          </h2>
          <h4 style={{ fontSize: 25, fontWeight: 500 }}>
            I’m here to help you in your journey to better you emotional health
          </h4>
        </StyledInfo>
        <StyledStart onClick={() => history.push("/chat")}>
          <StyledImage src={start} />
        </StyledStart>
        <StyledInfo>
          <h4 style={{ fontSize: 20, fontWeight: 400 }}>
            Our conversations are private. Let me get to know you better and
            we’re good to go.
          </h4>
        </StyledInfo>
        <p style={{ fontSize: 20, fontWeight: 300 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </StyledHome>
    </StyledHomeComponent>
  );
};

const mapStateToProps = (state) => {
  const {
    chat: { isOpened },
  } = state;
  return { isOpened };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
