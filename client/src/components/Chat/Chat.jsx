import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

const Chat = () => {
  const { user, setUser } = React.useContext(UserContext);

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <div className="mt-2">
        <LinkContainer to="/">
          <Button>Go to Home</Button>
        </LinkContainer>
      </div>
    </>
  );
};

export default Chat;
