import express from "express";
const route = express.Router();
import SessionController from "../controllers/session_controller.js";
route.post("/addSession", SessionController.addSession);
route.delete("/deleteSession/:id", SessionController.deleteSession);
route.put("/updateSession/:id", SessionController.updateSession);
route.get("/getSessions", SessionController.getSessions);
route.get("/getSessionById/:id", SessionController.getSessionById);


export default route;
