const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minlength: [4, "Minimum 8 char"],
    required: true,
  },
  roles: [String],
  accountStatus: {
    type: String,
    default: "PENDING",
  },
});

const User = model("User", userSchema);

module.exports = User;
