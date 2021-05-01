import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Room from "./Room";

const RoomList = ({ rooms }) => {
  return (
    rooms &&
    rooms.map(room => {
      return (
        <Link
          className="pointer-event text-decoration-none"
          key={room._id}
          to={`/chat/${room._id}/${room.name}`}
        >
          <Room name={room.name} />
        </Link>
      );
    })
  );
};

export default RoomList;
