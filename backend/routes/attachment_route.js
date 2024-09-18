import express from "express";
import Attachment_controller from '../controllers/attachment_controller.js';
import verifyToken from "../middlewares/VerifyToken.js";

const route = express.Router();

route.get("/all",verifyToken, Attachment_controller.Display_All);
route.post("/create", Attachment_controller.create_Attachement);
route.put("/update/:id", Attachment_controller.update_Attachement);
route.delete("/delete/:id", Attachment_controller.delete_Attachement);
route.get("/findById/:id", Attachment_controller.findAttachementbyId);
route.get("/findByInstructorId/:id", Attachment_controller.findAttachementbyInstructorId);
route.get("/findBySessionId/:id", Attachment_controller.findAttachementbySessionId);
route.get("/findByAssignementIdAndInstructorId/:Ass/:Ins", Attachment_controller.findAttachementbyAssignemntIdAndInstructorId);
route.get("/count", Attachment_controller.count);

export default route;
