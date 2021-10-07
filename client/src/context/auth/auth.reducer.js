import {
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_REQ,
  AUTH_SIGNUP_FAIL,
  AUTH_RESET_SIGNUP_ERROR,
  AUTH_LOGIN_REQ,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_RESET_LOGIN_ERROR,
  AUTH_SET_CURRENTUSER,
  AUTH_DELETE_CURRENTUSER,
} from "../../constants/auth.constants";

export const authSignUpReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SIGNUP_REQ:
      return {
        loading: true,
      };
    case AUTH_SIGNUP_SUCCESS: {
      return {
        loading: false,
      };
    }
    case AUTH_SIGNUP_FAIL: {
      return {
        loading: false,
        errors: action.payload,
      };
    }
    case AUTH_RESET_SIGNUP_ERROR: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const authLoginReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQ:
      return {
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS: {
      return {
        loading: false,
      };
    }
    case AUTH_LOGIN_FAIL: {
      return {
        loading: false,
        errors: action.payload,
      };
    }
    case AUTH_RESET_LOGIN_ERROR: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const authUserReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SET_CURRENTUSER:
      return {
        ...action.payload,
      };
    case AUTH_DELETE_CURRENTUSER:
      return {};
    default:
      return state;
  }
};
