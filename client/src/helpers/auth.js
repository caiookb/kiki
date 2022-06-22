import { auth } from "../services/firebase";

export const signup = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const signIn = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);
s;
