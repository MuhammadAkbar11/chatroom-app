import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

function App() {
  const [user, setUser] = useState(null);
  // const userContext  =UserContext
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat/:room_id/:room_name" component={Chat} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
