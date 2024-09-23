const { Instructor } = require("../models/user");

const controller = {
  afficher_All: async (req, res) => {
    try {
      const Instructors = await Instructor.find();
      res.status(200).json(Instructors);
    } catch (error) {
      res.status(404).json({ message: "Error in generating Instructors" });
    }
  },

  create_Instructor: async (req, res) => {
    try {
      console.log("Request body before creation:", req.body); // Log request body
      
      const create = await Instructor.create(req.body);
      
      console.log("Request body after creation:", req.body); // Log request body after creation (if this point is reached)
      
      res.status(201).json({
        message: "Instructor created successfully",
        instructor: create,
      });
    } catch (error) {
      console.error("Error in creating Instructor:", error); // Log the error for better insight
      res.status(400).json({ message: "Error in creating Instructor", error: error.message });
    }
  },

  update_Instructor: async (req, res) => {
    try {
      const id = req.params.id;
      const update = await Instructor.updateOne({ _id: id }, req.body);
      if (update.nModified === 0) {
        return res.status(404).json({ message: "Instructor not found or no changes made" });
      }
      res.status(200).json({ message: "Instructor updated successfully" });
    } catch (error) {
      res.status(404).json({ message: "Error in updating Instructor" });
    }
  },

  delete_Instructor: async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await Instructor.deleteOne({ _id: id });
      if (deleted.deletedCount === 0) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.status(200).json({ message: "Instructor deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: "Error in deleting Admin" });
    }
  },

  findInstructor: async (req, res) => {
    try {
      const id = req.params.id;
      const instructor = await Instructor.findById(id);

      if (!instructor) {
        return res.status(404).json({ message: "This instructor doesn't exist" });
      }

      return res.status(200).json(instructor);
    } catch (error) {
      console.error("Error in finding instructor:", error);
      return res.status(400).json({ message: "Error in finding instructor" });
    }
  },

  count: async (req, res) => {
    try {
      const instructors = await Instructor.countDocuments();
      res.status(200).json(instructors);
    } catch (error) {
      res.status(404).json({ message: "Error in counting instructors" });
    }
  },
};

module.exports = controller;
