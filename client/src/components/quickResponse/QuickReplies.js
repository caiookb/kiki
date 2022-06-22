import React, { Component } from "react";
import {
  StyledQuickReplies,
  StyledTextView,
  StyledText,
  StyledOptions,
} from "./Styles";
import { StyledQuickReply } from "./Styles";

const QuickReply = (props) => {
  if (props.reply.structValue.fields.payload) {
    return (
      <StyledQuickReply
        href="/"
        onClick={(event) =>
          props.click(
            event,
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </StyledQuickReply>
    );
  } else {
    return (
      <StyledQuickReply
        href={props.reply.structValue.fields.link.stringValue}
        className="btn-floating btn-large waves-effect waves-light red"
      >
        {props.reply.structValue.fields.text.stringValue}
      </StyledQuickReply>
    );
  }
};

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedQuick: null,
      clickedQuickID: null,
      repliesLength: this.props.payload.length,
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text);
    this.setState({ clickedQuick: text, clickedQuickID: payload });
  }

  renderQuickReply(reply, i) {
    return (
      <QuickReply
        key={i}
        click={this._handleClick}
        reply={reply}
        isClicked={this.state.clickedQuick}
        isClickedId={this.state.clickedQuickID}
      />
    );
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <StyledQuickReplies>
        <StyledTextView>
          <StyledText>{this.props.text.stringValue}</StyledText>
        </StyledTextView>
        <StyledOptions length={this.state.repliesLength}>
          {this.renderQuickReplies(this.props.payload)}
        </StyledOptions>
      </StyledQuickReplies>
    );
  }
}

export default QuickReplies;
