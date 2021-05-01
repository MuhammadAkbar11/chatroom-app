import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import Header from "./components/Layouts/Header";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

function App() {
  const [user, setUser] = useState(null);
  // const userContext  =UserContext
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="py-3 bg-black-50">
          <UserContext.Provider value={{ user, setUser }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/chat/:room_id/:room_name" component={Chat} />
            </Switch>
          </UserContext.Provider>
        </main>
        <footer className="footer">
          <h6>Footer</h6>
        </footer>
      </div>
    </>
  );
}

export default App;
