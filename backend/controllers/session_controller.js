const Session = require('../models/session')
const { department } = require('../models/department')
const { Instructor } = require('../models/user')

const controller = {
  addSession: async (req, res) => {
    try {
      const { Title, Description, Date, InstructorId } = req.body
      const newSession = new Session({
        Title,
        Description,
        Date,
        Instructor: InstructorId // Use the correct field name 'Instructor'
      })

      // Check if the instructor exists
      const verifyInstructor = await Instructor.findById(InstructorId)
      if (!verifyInstructor) {
        return res.status(404).json({ message: 'Instructor not found' })
      }

      await newSession.save()
      res.status(201).json({ message: 'Session added successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getSessionsByInstructor: async (req, res) => {
    try {
      const { instructorId } = req.params

      // Check if the instructor exists
      const instructorExists = await Instructor.findById(instructorId)
      if (!instructorExists) {
        return res.status(404).json({ message: 'Instructor not found' })
      }

      // Find all sessions related to this instructor
      const sessions = await Session.find({ Instructor: instructorId })
      res.status(200).json(sessions)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving sessions', error: error.message })
    }
  },

  deleteSession: async (req, res) => {
    try {
      const sessionId = req.params.id
      await Session.findByIdAndDelete(sessionId)
      res.status(200).json({ message: 'Session deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateSession: async (req, res) => {
    try {
      const sessionId = req.params.id
      const { Title, Description, Date, InstructorId } = req.body

      const updatedSession = await Session.findByIdAndUpdate(
        sessionId,
        { Title, Description, Date, Instructor: InstructorId }, // Corrected 'Instructor' field
        { new: true }
      )
      res
        .status(200)
        .json({ message: 'Session updated successfully', updatedSession })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getSessions: async (req, res) => {
    try {
      const sessions = await Session.find()
      res.status(200).json(sessions)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getSessionById: async (req, res) => {
    try {
      const sessionId = req.params.id
      const session = await Session.findById(sessionId)
      if (!session) {
        return res.status(404).json({ message: 'Session not found' })
      }
      res.status(200).json(session)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getSessionsByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params

      // Check if the department exists
      const departmentExists = await department.findById(departmentId)
      if (!departmentExists) {
        return res.status(404).json({ message: 'Department not found' })
      }

      // Find sessions related to this department
      const sessions = await Session.find({
        _id: { $in: departmentExists.sessions }
      })

      res.status(200).json(sessions)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving sessions', error: error.message })
    }
  }
}

module.exports = controller
