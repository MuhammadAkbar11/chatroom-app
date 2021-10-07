import axios from "axios";
import { setLogin } from "../../utils/auth";

import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQ,
  AUTH_LOGIN_SUCCESS,
  AUTH_RESET_LOGIN_ERROR,
  AUTH_RESET_SIGNUP_ERROR,
  AUTH_SIGNUP_FAIL,
  AUTH_SIGNUP_REQ,
  AUTH_SIGNUP_SUCCESS,
} from "../../constants/auth.constants";

export const signUpAction = values => async dispatch => {
  const { signUpDispatch } = dispatch;
  signUpDispatch({ type: AUTH_SIGNUP_REQ });
  try {
    const result = await axios.post("/api/auth/signup", { ...values });
    const { user } = result.data;
    setLogin(JSON.stringify(user));
    signUpDispatch({ type: AUTH_SIGNUP_SUCCESS });
    return true;
  } catch (error) {
    let singupErr = {};
    if (error.response && error.response.data) {
      const { errors } = error.response.data;

      singupErr = {
        message: "Failed to create new account",
      };

      if (errors?.validation) {
        let errorObj = {};

        Object.values(errors.validation).map(x => {
          const properties = x.properties;
          errorObj[properties.path] = properties.message;
        });
        singupErr.message = null;
        singupErr.validation = errorObj;
      }
    }

    signUpDispatch({ type: AUTH_SIGNUP_FAIL, payload: singupErr });
  }
};

export const resetSignUpErrorAction = () => dispatch => {
  const { signUpDispatch } = dispatch;
  signUpDispatch({ type: AUTH_RESET_SIGNUP_ERROR });
};

export const loginAction = values => async dispatch => {
  const { loginDispatch } = dispatch;

  loginDispatch({ type: AUTH_LOGIN_REQ });
  try {
    const result = await axios.post("/api/auth/login", { ...values });
    const { user } = result.data;

    setLogin(JSON.stringify(user));
    loginDispatch({ type: AUTH_LOGIN_SUCCESS });
    return true;
  } catch (error) {
    let singupErr = {
      message: error.message,
    };
    if (error.response && error.response.data) {
      const { errors } = error.response.data;
      singupErr = {
        message: "Failed to create new account",
      };

      if (errors?.validation) {
        let errorObj = {};

        Object.values(errors.validation).map(x => {
          const properties = x.properties;
          errorObj[properties.path] = properties.message;
        });
        singupErr.message = null;
        singupErr.validation = errorObj;
      }
    }
    loginDispatch({ type: AUTH_LOGIN_FAIL, payload: singupErr });
    return false;
  }
};

export const resetLoginErrorAction = () => dispatch => {
  const { loginDispatch } = dispatch;
  loginDispatch({ type: AUTH_RESET_LOGIN_ERROR });
};
