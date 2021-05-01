import React from "react";
import { Card } from "react-bootstrap";

const Room = ({ name }) => {
  return (
    <Card className=" border-0 shadow-sm px-3 py-1 mb-2   ">
      <Card.Body>
        <Card.Text>{name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Room;
