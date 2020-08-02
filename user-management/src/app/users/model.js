const mongoose = require("mongoose");
const md5 = require("md5");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    status: { type: String, required: true, enum: ["ACTIVE", "INACTIVE"] },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.setPass = function (password) {
  this.password = md5(password);
};

userSchema.methods.checkPass = function (password) {
  return this.password === md5(password);
};

module.exports = mongoose.model("User", userSchema);
