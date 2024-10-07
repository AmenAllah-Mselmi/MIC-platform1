const express = require('express')
const route = express.Router()
const SessionController = require('../controllers/session_controller')
const { Member } = require('../models/user')

// Delete a session by ID
route.delete('/deleteSession/:id', SessionController.deleteSession)

// Update a session by ID
route.put('/updateSession/:id', SessionController.updateSession)

/**
 * @swagger
 * /api/session/getSessions:
 *   get:
 *     summary: Récupérer la liste des sessions
 *     responses:
 *       200:
 *         description: Liste des sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *
 *       404:
 *         description: Erreur lors de la récupération des sessions
 */
route.get('/getSessions', SessionController.getSessions)

// Get a session by ID
route.get('/getSessionById/:id', SessionController.getSessionById)

// Get sessions by instructor ID
/**
 * @swagger
 * /api/session/getSessionsByInstructor/{instructorId}:
 *   get:
 *     summary: Récupérer les sessions par ID de l'instructeur
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: ID de l'instructeur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des sessions pour l'instructeur spécifié
 *       404:
 *         description: Instructeur non trouvé
 */
route.get(
  '/getSessionsByInstructor/:instructorId',
  SessionController.getSessionsByInstructor
)

// Get sessions by department ID
route.get(
  '/department/:departmentId',
  SessionController.getSessionsByDepartment
)

// Get a member by ID and associated sessions
route.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Vérifier si le membre existe
    const member = await Member.findById(id).select('Departement')
    if (!member) {
      return res.status(404).json({ message: "Ce membre n'existe pas" })
    }

    // Find instructors in the same department
    const instructors = await Member.find({ Departement: member.Departement })

    // Return the member and associated instructors
    res.status(200).json({
      member,
      instructors
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = route
