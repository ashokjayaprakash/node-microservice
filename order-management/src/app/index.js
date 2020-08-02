const ordersRouter = require("./orders/router");

module.exports = (app) => {
  app.use("/orders", ordersRouter);
};
