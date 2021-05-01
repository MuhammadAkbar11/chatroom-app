import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

const Chat = () => {
  const { user, setUser } = React.useContext(UserContext);
  let { room_id, room_name } = useParams();
  return (
    <Container className="px-0">
      <p>Room {room_name}</p>
      <div className="mt-2">
        <LinkContainer to="/">
          <Button>Go to Home</Button>
        </LinkContainer>
      </div>
    </Container>
  );
};

export default Chat;
