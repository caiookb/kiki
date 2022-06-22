import React from "react";
import { connect } from "react-redux";
import { CustomButton } from "../../components";
import { StyledHome, StyledInfo, StyledOptions } from "./Styles";

const Welcome = (props) => {
  const { history } = props;

  return (
    <StyledHome>
      <StyledInfo>
        Welcome to Kiki! :)
        <StyledOptions>
          <CustomButton
            title={"First time on the app"}
            onClick={() => history.push("login")}
            color={"green"}
          />
          <CustomButton
            title={"I'm already a friend of kiki! "}
            onClick={() => history.push("home")}
            color={"red"}
          />
        </StyledOptions>
      </StyledInfo>
    </StyledHome>
  );
};

const mapStateToProps = (state) => {
  const {
    chat: { isOpened },
  } = state;
  return { isOpened };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
