import {
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_REQ,
  AUTH_SIGNUP_FAIL,
  AUTH_RESET_SINGUP_ERROR,
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
    case AUTH_RESET_SINGUP_ERROR: {
      return {
        loading: false,
      };
    }
    default:
      return state;
  }
};

// export const AuthUse
