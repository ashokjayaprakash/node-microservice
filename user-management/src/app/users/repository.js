const mongoose = require("mongoose");

const User = mongoose.model("User");

const saveUser = (data) => {
  const user = new User(data);
  user.setPass(data.password);
  return user.save();
};

const editUser = (user, data) => {
  const { firstName, lastName, phone } = data;
  const currentUser = user;

  currentUser.firstName = firstName;
  currentUser.lastName = lastName;
  currentUser.phone = phone;
  return user.save();
};

const deleteUser = (user, data) => {
  const { status } = data;
  const currentUser = user;

  currentUser.status = status;
  return user.save();
};

const findUser = (id) => User.findOne({ _id: id });

const findUserByUserName = (username) => User.findOne({ username });

module.exports = {
  saveUser,
  editUser,
  deleteUser,
  findUser,
  findUserByUserName,
};
