import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const RoomModel = mongoose.model("RoomModel", roomSchema, "room");

export default RoomModel;
