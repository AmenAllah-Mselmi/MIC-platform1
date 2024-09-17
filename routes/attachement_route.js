import express from "express";
import Attachement_controller from '../controllers/attachement_controller.js';
import verifyToken from "../middlewares/VerifyToken.js";

const route = express.Router();

route.get("/all",verifyToken, Attachement_controller.Display_All);
route.post("/create", Attachement_controller.create_Attachement);
route.put("/update/:id", Attachement_controller.update_Attachement);
route.delete("/delete/:id", Attachement_controller.delete_Attachement);
route.get("/findById/:id", Attachement_controller.findAttachementbyId);
route.get("/findByInstructorId/:id", Attachement_controller.findAttachementbyInstructorId);
route.get("/findBySessionId/:id", Attachement_controller.findAttachementbySessionId);
route.get("/findByAssignementIdAndInstructorId/:Ass/:Ins", Attachement_controller.findAttachementbyAssignemntIdAndInstructorId);
route.get("/count", Attachement_controller.count);

export default route;
