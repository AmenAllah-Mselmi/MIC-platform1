import express from "express";
import response_controller from "../controllers/response_controller.js";

const route = express.Router();

route.get("/all", response_controller.Display_All);
route.post("/create", response_controller.create_Response);
route.put("/update/:id", response_controller.update_Response);
route.delete("/delete/:id", response_controller.delete_Response);
route.get("/findById/:id", response_controller.findResponsebyId);
route.get("/findByUserId/:id", response_controller.findResponsebyUserId);
route.get("/count", response_controller.count);

export default route;
