const usersRouter = require("./users/router");
const sessionRouter = require("./session/router");

module.exports = (app) => {
  app.use("/session", sessionRouter);
  app.use("/users", usersRouter);
};
