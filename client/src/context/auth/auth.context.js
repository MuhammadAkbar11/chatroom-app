import React from "react";
import axios from "axios";
import {
  AUTH_RESET_SINGUP_ERROR,
  AUTH_SIGNUP_FAIL,
  AUTH_SIGNUP_REQ,
  AUTH_SIGNUP_SUCCESS,
} from "../../constants/auth.constants";
import { authSignUpReducer } from "./auth.reducer";
import { setLogin } from "../../utils/auth";

const AuthContext = React.createContext();
const AuthDispatchContext = React.createContext();

const userInfoFromStorage = localStorage.getItem("chatroom_user")
  ? JSON.parse(localStorage.getItem("chatroom_user"))
  : null;

const AuthProvider = ({ children }) => {
  const initState = {
    user: userInfoFromStorage,
    singup: { loading: false },
    login: { loading: false },
  };

  const [currentUser, setCurrentUser] = React.useState(initState.user);
  const [signupState, signupDispatch] = React.useReducer(
    authSignUpReducer,
    initState.singup
  );

  React.useEffect(() => {
    return () => {
      signupDispatch({ type: AUTH_RESET_SINGUP_ERROR });
    };
  }, []);

  const handleSignup = async data => {
    signupDispatch({ type: AUTH_SIGNUP_REQ });
    console.log(data, "<== values");
    try {
      const result = await axios.post("/api/auth/signup", { ...data });
      const { user } = result.data;
      setLogin(JSON.stringify(user));
      setCurrentUser(user);
      signupDispatch({ type: AUTH_SIGNUP_SUCCESS });
    } catch (error) {
      let singupErr = {};
      if (error.response && error.response.data) {
        const { errors } = error.response.data;

        singupErr = {
          message: "failed",
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

      signupDispatch({ type: AUTH_SIGNUP_FAIL, payload: singupErr });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authSignUp: signupState,
      }}
    >
      <AuthDispatchContext.Provider
        value={{
          onSignUp: handleSignup,
          onResetSingUpError: () => {
            return signupDispatch({ type: AUTH_RESET_SINGUP_ERROR });
          },
        }}
      >
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const useAuthDispatch = () => {
  return React.useContext(AuthDispatchContext);
};
export default AuthProvider;
