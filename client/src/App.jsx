import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

function App() {
  const [user, setUser] = useState(null);
  // const userContext  =UserContext
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
