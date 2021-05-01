import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

import { io } from "socket.io-client";
import { ENDPOINT } from "../../constants/room";

let socket;

const Chat = () => {
  const { user, setUser } = React.useContext(UserContext);
  let { room_id, room_name } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);
    if (user) {
      socket.emit("join", { name: user.name, room_id, user_id: user.id });
    }
    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);

  return (
    <Container className="px-0">
      <p>Room {room_name}</p>
      <p>user {user && user.name}</p>
      <div className="mt-2">
        <LinkContainer to="/">
          <Button>Go to Home</Button>
        </LinkContainer>
      </div>
    </Container>
  );
};

export default Chat;
