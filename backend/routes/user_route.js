const express = require("express");
const controller = require("../controllers/user_controller");
const authenticateJWT = require("../middlewares/VerifyToken");

const route = express.Router();

route.post("/login", controller.login);
route.post("/logout", controller.logout);


module.exports = route;
