import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";
import RoomList from "./RoomList";
import { io } from "socket.io-client";

let socket;

const Home = () => {
  const ENDPT = "localhost:5000";
  const { user, setUser } = React.useContext(UserContext);
  const [room, setRoom] = useState("");

  const [rooms, setRooms] = useState([
    {
      name: "room1",
      _id: "room1",
    },
    { name: "room2", _id: "room2" },
    { name: "room3", _id: "room3" },
  ]);

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

  useEffect(() => {
    socket = io(ENDPT);

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, [ENDPT]);

  const submitHandler = e => {
    e.preventDefault();

    socket.emit("create-room", room);
    setRoom("");
  };

  return (
    <Container className=" home-container ">
      <Row className="  h-100 align-items-stretch  ">
        <Col xs={12} md={6}>
          <Card className=" border-0 shadow-sm px-3 pb-3 pt-3  ">
            <Row>
              <Col lg={7} className="mx-auto">
                <Form onSubmit={submitHandler}>
                  <Card.Body className="p-3 ">
                    <div className="my-4  text-center">
                      <h5>Welcome {user ? user.name : "Guest"}</h5>
                    </div>
                    <Form.Group controlId="room">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter Room"
                        value={room}
                        className=" rounded-0 "
                        onChange={e => {
                          setRoom(e.target.value);
                          // setDisabledSubmit(false);
                        }}
                        // isInvalid={!!error?.validation?.room}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        disabled={room === ""}
                        size="lg"
                        type="submit"
                        block
                        className="rounded-0"
                      >
                        Create Room
                      </Button>
                    </Form.Group>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-around bg-transparent border-0">
                    <a href="/#" onClick={setAsTofu}>
                      Set As Tofu
                    </a>
                    <a href="/#" onClick={setAsNezha}>
                      Set As Nezha
                    </a>
                  </Card.Footer>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <RoomList rooms={rooms} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
