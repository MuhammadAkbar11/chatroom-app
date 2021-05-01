import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import Header from "./components/Layouts/Header";

function App() {
  const [user, setUser] = useState(null);
  // const userContext  =UserContext
  return (
    <>
      <Header />
      <main className="py-3 bg-black-50">
        <UserContext.Provider value={{ user, setUser }}>
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/chat" component={Chat} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </main>
    </>
  );
}

export default App;
