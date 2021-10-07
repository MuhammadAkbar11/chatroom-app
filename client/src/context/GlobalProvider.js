import React from "react";
import { useAuthState } from "./auth/auth.context";
import useRoomStore from "./room/room.context";

const GlobalContext = React.createContext();
const GlobalDispatch = React.createContext();

const GlobalProvider = ({ children }) => {
  const [roomState, roomDispatch] = useRoomStore();
  const [authState, authDispatch] = useAuthState();

  const state = {
    roomState: roomState,
    authState: authState,
    redirect: null,
  };

  const dispatch = {
    roomDispatch,

    ...authDispatch,
  };

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatch.Provider value={dispatch}>
        {children}
      </GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalDispatch };

export default GlobalProvider;
