import Assignment from "../models/assignment.js";

const assignmentController = {
  addAssignment: async (req, res) => {
    try {
      const {
        Title,
        Description,
        DueDate,
        Instructor,
        Attachments,
        Responses,
      } = req.body;
      const newAssignment = new Assignment({
        Title,
        Description,
        DueDate,
        Instructor,
        Attachments,
        Responses,
      });
      await newAssignment.save();
      res.status(201).json({ message: "Assignment created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAssignment: async (req, res) => {
    try {
      const { id } = req.params;
      await Assignment.findByIdAndDelete(id);
      res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateAssignment: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({
          message: "Assignment updated successfully",
          updatedAssignment,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAssignments: async (req, res) => {
    try {
      const assignments = await Assignment.find();
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAssignmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const assignment = await Assignment.findById(id);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default assignmentController;
