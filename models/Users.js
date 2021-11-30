const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    maxlength: [75, "Name cannot be longer then 75 characters"],
    minlength: [3, "Name cannot be less then 3 characters"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: [true, "This email already exists"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password cannot be less then 6 characters"],
  },
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  totalExpense: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", UserSchema);
