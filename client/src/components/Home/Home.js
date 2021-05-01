import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { user, setUser } = React.useContext(UserContext);

  const setAsTofu = () => {
    const tofu = {
      name: "Tofu",
      email: "tofu.1998@gmail.com",
      password: "1234",
    };
    setUser(tofu);
  };

  const setAsNezha = () => {
    const nezha = {
      name: "Nezha",
      email: "nezha.1998@gmail.com",
      password: "1234",
    };

    setUser(nezha);
  };

  useEffect(() => {}, []);

  return (
    <Container fluid>
      <h1>Home</h1>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={setAsTofu}>Set as Tofu</Button>
      <Button onClick={setAsNezha} variant="info" className="ml-2">
        Set as Nezha
      </Button>
      <div className="mt-2">
        <LinkContainer to="/chat">
          <Button>Go to chat</Button>
        </LinkContainer>
      </div>
    </Container>
  );
};

export default Home;
