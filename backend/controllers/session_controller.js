const Session = require('../models/session')

const controller = {


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
        { Title, Description, Date, InstructorId },
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
  }
}



module.exports = controller
