import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isAllStar: Boolean,
});

const Player = mongoose.model("Player", playerSchema);

export default Player;