const mongoose = require("mongoose");

const Order = mongoose.model("Order");

const saveOrder = (data) => {
  const order = new Order(data);
  return order.save();
};

const editOrder = (order, data) => {
  const { status } = data;
  const currentOrder = order;
  currentOrder.status = status;
  return order.save();
};

const deleteOrder = (order, data) => {
  const { status } = data;
  const currentOrder = order;

  currentOrder.status = status;
  return order.save();
};

const findOrder = (id) => Order.findOne({ _id: id });

const findOrderByOrderName = (ordername) => Order.findOne({ ordername });

module.exports = {
  saveOrder,
  editOrder,
  deleteOrder,
  findOrder,
  findOrderByOrderName,
};
