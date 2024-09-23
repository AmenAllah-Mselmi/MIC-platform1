const express = require("express");
const route = express.Router();
const SessionController = require("../controllers/session_controller");

route.post("/addSession", SessionController.addSession);
route.delete("/deleteSession/:id", SessionController.deleteSession);
route.put("/updateSession/:id", SessionController.updateSession);
route.get("/getSessions", SessionController.getSessions);
route.get("/getSessionById/:id", SessionController.getSessionById);

module.exports = route;
