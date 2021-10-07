import { useContext, useState, useEffect } from "react";
import { GlobalContext, GlobalDispatch } from "../context/GlobalProvider";

export const useSelector = () => useContext(GlobalContext);

export const useDispatch = () => {
  const getState = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatch);
  return action => Promise.resolve(action(dispatch, () => getState));
};

export const useIsAuthenticated = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("bae-chatroom-userinfo")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return isAuth;
};

// export const useDispatch = createDispatchHook();
