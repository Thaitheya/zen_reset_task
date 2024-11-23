const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter first name:"],
    },
    lastname: {
      type: String,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      default: 0,
    },
    newPassword: {
      type: String,
      required: false,
    },
    oldPassword: {
      type: String,
      required: true,
    },
    reEnterPassword: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);

console.log(user);

module.exports = user;
