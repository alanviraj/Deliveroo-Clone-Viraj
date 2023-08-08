const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const jwt = require("../jwtValidate");

module.exports = function () {
  router.post("/create", users.create);
  router.post("/login", users.login);
  router.post("/get-user", jwt, users.getUser);
  return router;
};
