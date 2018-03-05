const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  google_id: { type: String, required: true },
  google_email: { type: String, required: true },
  in_venue: { type: Boolean, required: true },
  lifetime_claps: { type: Number, required: true },
  perf_num: { type: Number, required: true },
  last_perf: { type: Date, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;