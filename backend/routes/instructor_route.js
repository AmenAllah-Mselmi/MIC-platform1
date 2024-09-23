const express = require("express");
const route = express.Router();

const instructorController = require("../controllers/instructor_controller");

route.get("/all", instructorController.afficher_All);
route.post("/create", instructorController.create_Instructor);
route.put("/update/:id", instructorController.update_Instructor);
route.delete("/delete/:id", instructorController.delete_Instructor);
route.get("/find/:id", instructorController.findInstructor);
route.get("/count", instructorController.count);

module.exports = route;
