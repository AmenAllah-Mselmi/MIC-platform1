const express = require("express");
const controller = require("../controllers/user_controller");
const authenticateJWT = require("../middlewares/VerifyToken");

const route = express.Router();

route.post("/login", controller.login);

module.exports = route;
