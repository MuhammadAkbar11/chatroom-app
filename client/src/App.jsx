import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

function App() {
  const [user, setUser] = useState(null);
  // const userContext  =UserContext
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat/:room_id/:room_name" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
