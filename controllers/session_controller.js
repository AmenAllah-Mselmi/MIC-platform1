import Session from "../models/session.js";
const controller = {
  addSession: async (req, res) => {
    try {
      const { Title, Description, Date, InstructorId } = req.body;
      const newSession = new Session({
        Title,
        Description,
        Date,
        InstructorId,
      });
      await newSession.save();
      res.status(201).json({ message: "Session added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteSession: async (req, res) => {
    try {
      const sessionId = req.params.id;
      await Session.findById(sessionId).deleteOne();
      res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateSession: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const { Title, Description, Date, InstructorId } = req.body;
      await Session
        .findById(sessionId)
        .updateOne({ Title, Description, Date, InstructorId });
      res.status(200).json({ message: "Session updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSessions: async (req, res) => {
    try {
      const sessions = await Session.find();
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSessionById: async (req, res) => {
    try {
      const sessionId = req.params.id;
      const session = await Session.findById(sessionId);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
export default controller;
