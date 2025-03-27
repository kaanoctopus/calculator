const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calculation" }],
});

module.exports = mongoose.model("User", UserSchema);
