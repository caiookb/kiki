import React, { useEffect, useState, useRef, Component } from "react";
import {
  StyledMessagesField,
  StyledCardView,
  StyledChatComponent,
  StyledInputView,
  StyledImage,
} from "./Styles";
import { Card, Messages, Nav, TextInput } from "../../components";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import axios from "axios";
import QuickReplies from "../../components/quickResponse/QuickReplies";
import { send } from "../../assets/images";

const cookies = new Cookies();

class Chat extends Component {
  messagesEnd;
  talkInput;

  constructor(props) {
    super(props);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._saveUserTexting = this._saveUserTexting.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
    this.state = {
      messages: [],
      text: "",
      nextResponseDate: "text",
      mental_health_stage: "",
      behaviour_quiz: "",
      flow_status: "",
      hiv_status: "",
      stage: "",
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
  }

  async updateUserState(user) {
    if (user) {
      const userStatus = user?.userStatus[0];
      this.setState({
        mental_health_stage: userStatus?.mental_health_stage,
        behaviour_quiz: userStatus?.behaviour_quiz,
        flow_status: userStatus?.flow_status,
        hiv_status: userStatus?.hiv_status,
        stage: userStatus?.stage,
      });
    }
  }

  async get_user_status() {
    try {
      const user = await (
        await axios.get("/api/me", {
          withCredentials: true,
          credentials: "include",
        })
      ).data;
      this.updateUserState(user);
    } catch (err) {
      // console.log("err", err);
    }
  }

  async df_text_query(queryText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText,
        },
      },
    };
    this.setState({ messages: [...this.state.messages, says] });

    const response = await axios.post(
      "/api/df_text_query",
      {
        text: queryText,
        userID: cookies.get("userID"),
      },
      { withCredentials: true, credentials: "include" }
    );

    if (response.data.token) {
      cookies.set("token", response.data.token, { path: "/" });
      cookies.set("token-test", response.data.token, { path: "/" });
    }

    if (response.data.me) {
      this.updateUserState(response.data.me[0]);
    }
    const res = response.data.responses[0].queryResult;

    const isNextResponseADate = res.fulfillmentText?.includes("date")
      ? "date"
      : "text";

    for (let msg of res.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({
        messages: [...this.state.messages, says],
        nextResponseDate: isNextResponseADate,
      });
    }
  }

  async df_event_query(eventName) {
    const res = await axios.post(
      "/api/df_event_query",
      {
        event: eventName,
        userID: cookies.get("userID"),
      },
      { withCredentials: true, credentials: "include" }
    );

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };

      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async componentDidMount() {
    const status = await this.get_user_status();
    const {
      flow_status,
      hiv_status,
      mental_health_stage,
      stage,
      behaviour_quiz,
    } = this.state;

    if (
      !flow_status &&
      !hiv_status &&
      !mental_health_stage &&
      !stage &&
      !behaviour_quiz
    ) {
      return this.df_event_query("welcome").then(() => {
        this.df_event_query("call_register_user");
      });
    }

    // if (mental_health_stage === "mental_health_started") {
    //   return this.df_event_query("call_realize_mental_test");
    // }

    if (flow_status === "user_signed_up" && !mental_health_stage) {
      return this.df_event_query("call_introduction");
    }

    if (mental_health_stage === "mental_health_started") {
      return this.df_event_query("call_realize_mental_test");
    } else {
      return this.df_event_query("call_introduction");
    }
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.talkInput?.focus();
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    this.df_text_query(text);
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message?.msg?.text?.text) {
      return (
        <Messages
          speaks={message.speaks}
          text={message.msg.text.text}
          key={i}
        />
      );
    } else if (message?.msg?.payload?.fields?.cards) {
      return (
        <StyledCardView key={i}>
          {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
        </StyledCardView>
      );
    } else if (message?.msg?.payload?.fields?.quick_replies) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  _saveUserTexting(e) {
    this.setState({ text: e.target.value });
  }

  _sendMessageByButton(text) {
    this.df_text_query(text);
  }
  render() {
    const { nextResponseDate } = this.state;
    return (
      <StyledChatComponent>
        <Nav />
        <StyledMessagesField>
          {this.renderMessages(this.state.messages)}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </StyledMessagesField>
        <StyledInputView>
          <TextInput
            type={nextResponseDate}
            placeholder="Type a message:"
            ref={(input) => {
              this.talkInput = input;
            }}
            onKeyPress={this._handleInputKeyPress}
            onChange={this._saveUserTexting}
          />
          <StyledImage
            src={send}
            onClick={() => this._sendMessageByButton(this.state.text)}
          ></StyledImage>
        </StyledInputView>
      </StyledChatComponent>
    );
  }
}

export default Chat;
