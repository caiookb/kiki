import { AuthTypes } from "../types";

export const saveFirebaseAuthStatus = (payload) => ({
  type: AuthTypes.AUTHENTICATED_FIREBASE,
  payload: payload,
});

export const saveServerStatus = (payload) => ({
  type: AuthTypes.AUTHENTICATED_SERVER,
  payload: payload,
});

export const saveFullAuthStatus = (payload) => ({
  type: AuthTypes.AUTHENTICATED_FIREBASE_AND_SERVER,
  payload: payload,
});
