import { UserTypes } from "../types";

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserTypes.SAVE_USER_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
