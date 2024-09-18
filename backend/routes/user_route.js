import express from "express"
import controller from "../controllers/user_controller.js"
const route = express.Router();
route.post("/login", controller.login);
export default route;
