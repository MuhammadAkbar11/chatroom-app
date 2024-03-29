import React, { useEffect, useState } from "react";
import { Button, ListGroup, Row, Col, Container, Form } from "react-bootstrap";
import { useParams } from "react-router";
// import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/UserContext";

import { io } from "socket.io-client";
import { ENDPOINT } from "../../constants/room";
import Messages from "./Messages/Messages";
import Template from "../Layouts/Template";

let socket;

const Chat = ({ history }) => {
  // console.log(props);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user, setUser } = React.useContext(UserContext);
  let { room_id, room_name } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);

    if (!user) {
      console.log("okk");
      history.push("/");
      return;
    }

    socket.emit("join", { name: user.name, room_id, user_id: user.id });
    return () => {
      socket.on("disconnect");
      socket.off();
      setMessages([]);
      setMessage("");
    };
  }, [ENDPOINT, user]);

  // useEffect(() => {
  //   socket.emit("load-room-messages", { room_id }, msgs => {
  //     setMessages(msgs);
  //   });
  // }, [room_id]);

  useEffect(() => {
    socket.on("message", msg => {
      setMessages(prevState => [...prevState, msg]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      console.log(message);

      socket.emit("send-message", { message, room_id }, () => setMessage(""));
    }
  };

  console.log(messages);

  return (
    <Template fixed>
      <Container fluid className="pr-2 pr-md-4 chat-container pb-2  ">
        <Row className=" d-flex mx-0 align-items-stretch    ">
          <Col md={4} className="px-0 pr-2  ">
            <ListGroup className="">
              <ListGroup.Item className=" border-top-0 border-left-0 border-right-0 py-3 bg-transparent  ">
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item className=" border-top-0 border-left-0 border-right-0 py-3 bg-transparent  ">
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item className=" border-top-0 border-left-0 border-right-0 py-3 bg-transparent  ">
                Morbi leo risus
              </ListGroup.Item>
              <ListGroup.Item className=" border-top-0 border-left-0 border-right-0 py-3 bg-transparent  ">
                Porta ac consectetur ac
              </ListGroup.Item>
              <ListGroup.Item className=" border-top-0 border-left-0 border-right-0 py-3 bg-transparent  ">
                Vestibulum at eros
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={8} className="chat-box px-0 h-100 ">
            <div></div>
            <Messages messages={messages} userId={user && user.id} />
            <div className="chat-form py-2 px-2">
              <Form onSubmit={sendMessage}>
                <Form.Control
                  placeholder="type your message"
                  className="chat-input mx-2 rounded-pill py-2"
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
                />
                <Button type="submit" variant="link" className=" shadow-none ">
                  <i className="fa fa-paper-plane"></i>
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

export default Chat;
