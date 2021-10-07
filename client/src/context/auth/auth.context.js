import { useReducer } from "react";
import {
  authLoginReducer,
  authSignUpReducer,
  authUserReducer,
} from "./auth.reducer";

const userInfoFromStorage = localStorage.getItem("bae-chatroom-userinfo")
  ? JSON.parse(localStorage.getItem("bae-chatroom-userinfo"))
  : null;

const initState = {
  user: userInfoFromStorage,
  singup: { loading: false },
  login: { loading: false },
};

export const useAuthState = () => {
  const [user, userDispatch] = useReducer(authUserReducer, initState.user);
  const [signUpState, signUpDispatch] = useReducer(
    authSignUpReducer,
    initState.singup
  );
  const [loginState, loginDispatch] = useReducer(
    authLoginReducer,
    initState.login
  );

  const state = { user, signup: signUpState, login: loginState };
  const dispatch = { signUpDispatch, userDispatch, loginDispatch };
  return [state, dispatch];
};
