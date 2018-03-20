const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  upClaps: { type: Number },
  downClaps: { type: Number }
});

const User = mongoose.model("User", userSchema);

module.exports = User;