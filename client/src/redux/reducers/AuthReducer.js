import { AuthTypes } from "../types";

const initialState = {
  firebase: false,
  server: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthTypes.AUTHENTICATED_FIREBASE:
      return { ...state, firebase: payload };
    case AuthTypes.AUTHENTICATED_SERVER:
      return { ...state, server: payload };
    case AuthTypes.AUTHENTICATED_FIREBASE_AND_SERVER:
      return { ...state, server: payload, firebase: true };
    default:
      return state;
  }
};
