import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import AuthProvider from "./context/auth/auth.context";
import PrivateRoute from "./components/Route/PrivateRoute";
import PublicRoute from "./components/Route/PublicRoute";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/chat/:room_id/:room_name" component={Chat} />
            <PublicRoute restricted={true} path="/login" component={Login} />
            <PublicRoute restricted={true} path="/signup" component={SignUp} />
          </Switch>
        </AuthProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
