import { ChatTypes } from "../types";

const initialState = {
  isOpened: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ChatTypes.IS_CHAT_OPEN:
      return { ...state, isOpened: !state.isOpened };
    default:
      return state;
  }
};
