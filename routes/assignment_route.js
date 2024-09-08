import express from "express";
const route = express.Router();
import assignmentController from "../controllers/assignment_controller.js";

route.post("/addAssignment", assignmentController.addAssignment);
route.delete("/deleteAssignment/:id", assignmentController.deleteAssignment);
route.put("/updateAssignment/:id", assignmentController.updateAssignment);
route.get("/getAssignments", assignmentController.getAssignments);
route.get("/getAssignmentById/:id", assignmentController.getAssignmentById);

export default route;
