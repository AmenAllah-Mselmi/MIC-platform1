const express = require("express");
const route = express.Router();
const assignmentController = require("../controllers/assignment_controller");

route.post("/addAssignment", assignmentController.addAssignment);
route.delete("/deleteAssignment/:id", assignmentController.deleteAssignment);
route.put("/updateAssignment/:id", assignmentController.updateAssignment);
route.get("/getAssignments", assignmentController.getAssignments);
route.get("/getAssignmentById/:id", assignmentController.getAssignmentById);

module.exports = route;
