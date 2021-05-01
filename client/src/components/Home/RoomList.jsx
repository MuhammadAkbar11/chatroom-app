import React from "react";
import Room from "./Room";

const RoomList = ({ rooms }) => {
  return (
    rooms &&
    rooms.map(room => {
      return <Room name={room.name} key={room._id} />;
    })
  );
};

export default RoomList;
