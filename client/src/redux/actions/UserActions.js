import { UserTypes } from "../types";

export const saveUserToken = (token) => ({
  type: UserTypes.SAVE_USER_TOKEN,
  payload: token,
});
