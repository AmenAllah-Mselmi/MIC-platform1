const { Instructor } = require('../models/user')
const { department } = require('../models/department')
const session = require('../models/session')
const controller = {
  afficher_All: async (req, res) => {
    try {
      const Instructors = await Instructor.find()
      res.status(200).json(Instructors)
    } catch (error) {
      res.status(404).json({ message: 'Error in generating Instructors' })
    }
  },

  create_Instructor: async (req, res) => {
    try {
      console.log('Request body before creation:', req.body) // Log request body

      const create = await Instructor.create(req.body)

      console.log('Request body after creation:', req.body) // Log request body after creation (if this point is reached)

      res.status(201).json({
        message: 'Instructor created successfully',
        instructor: create
      })
    } catch (error) {
      console.error('Error in creating Instructor:', error) // Log the error for better insight
      res
        .status(400)
        .json({ message: 'Error in creating Instructor', error: error.message })
    }
  },
  // created by Mariem
  create_Instructor_with_department: async (req, res) => {
    try {
      const { departmentId, instructorData } = req.body // Extraction des données du corps de la requête

      // Vérifiez que le département existe
      const Mydepartment = await department.findById(departmentId) // Correction de 'department' en 'Department'
      if (!Mydepartment) {
        return res.status(404).json({ message: 'Department not found' })
      }

      // Créez un nouvel instructeur avec l'ID du département associé
      const instructor = new Instructor({
        ...instructorData,
        DepartmentId: departmentId
      })

      // Sauvegardez l'instructeur
      const savedInstructor = await instructor.save()

      // Optionnel : Ajouter l'instructeur au tableau des instructeurs du département (si vous avez un champ 'instructors' dans le modèle de département)
      Mydepartment.instructors.push(savedInstructor._id) // Ajoute l'instructeur dans le département
      await Mydepartment.save() // Sauvegarde les changements dans le département

      // Retourner une réponse avec les détails de l'instructeur sauvegardé
      return res.status(201).json({
        message: 'Instructor added successfully',
        instructor: savedInstructor
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Error adding instructor to department' })
    }
  },

  Instructor_add_Session_In_department: async (req, res) => {
    try {
      const { departmentId, instructorId, sessionData } = req.body

      // Vérifiez que le département existe
      const Mydepartment = await department.findById(departmentId) // Correction de 'department' en 'Department'
      if (!Mydepartment) {
        return res.status(404).json({ message: 'Department not found' })
      }

      const newSession = new session({
        Date: sessionData.Date,
        Description: sessionData.Description,
        Title: sessionData.Title,
        Instructor: instructorId
      })
      const savedSession = await newSession.save()

      // Optionnel : Ajouter l'instructeur au tableau des instructeurs du département (si vous avez un champ 'instructors' dans le modèle de département)
      Mydepartment.sessions.push(savedSession._id) // Ajoute l'instructeur dans le département
      await Mydepartment.save() // Sauvegarde les changements dans le département

      res.status(201).json({ message: 'Session added successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getSessionsByInstructor: async (req, res) => {
    try {
      const { instructorId } = req.params

      // Vérifiez si l'instructeur existe
      const instructorExists = await Instructor.findById(instructorId)
      if (!instructorExists) {
        return res.status(404).json({ message: 'Instructor not found' })
      }

      // Trouvez toutes les sessions liées à cet instructeur
      const sessions = await session.find({ Instructor: instructorId })

      res.status(200).json(sessions)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving sessions', error: error.message })
    }
  },

  getSessionsByDepartment: async (req, res) => {
    try {
      const { departmentId } = req.params

      // Vérifiez si le département existe
      const departmentExists = await department.findById(departmentId)
      if (!departmentExists) {
        return res.status(404).json({ message: 'Department not found' })
      }

      const sessions = await session.find({
        _id: { $in: departmentExists.sessions }
      })

      res.status(200).json(sessions)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving sessions', error: error.message })
    }
  },
  // end
  update_Instructor: async (req, res) => {
    try {
      const id = req.params.id
      const update = await Instructor.updateOne({ _id: id }, req.body)
      if (update.nModified === 0) {
        return res
          .status(404)
          .json({ message: 'Instructor not found or no changes made' })
      }
      res.status(200).json({ message: 'Instructor updated successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in updating Instructor' })
    }
  },

  delete_Instructor: async (req, res) => {
    try {
      const id = req.params.id
      const deleted = await Instructor.deleteOne({ _id: id })
      if (deleted.deletedCount === 0) {
        return res.status(404).json({ message: 'Instructor not found' })
      }
      res.status(200).json({ message: 'Instructor deleted successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in deleting Admin' })
    }
  },

  findInstructor: async (req, res) => {
    try {
      const id = req.params.id
      const instructor = await Instructor.findById(id)

      if (!instructor) {
        return res
          .status(404)
          .json({ message: "This instructor doesn't exist" })
      }

      return res.status(200).json(instructor)
    } catch (error) {
      console.error('Error in finding instructor:', error)
      return res.status(400).json({ message: 'Error in finding instructor' })
    }
  },

  count: async (req, res) => {
    try {
      const instructors = await Instructor.countDocuments()
      res.status(200).json(instructors)
    } catch (error) {
      res.status(404).json({ message: 'Error in counting instructors' })
    }
  }
}

module.exports = controller
