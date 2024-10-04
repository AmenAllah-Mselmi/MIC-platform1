const express = require('express')
const route = express.Router()
const SessionController = require('../controllers/session_controller')

const { Member } = require('../models/user')
/**
 * @swagger
 * /api/session/addSession:
 *   post:
 *     summary: Ajouter une nouvelle session
 *     description: Permet d'ajouter une nouvelle session avec un titre, une description, une date et un ID d'instructeur.
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 example: "Introduction to Advanced Algorithms"
 *                 description: Le titre de la session
 *               Description:
 *                 type: string
 *                 example: "Cette session couvrira les bases des algorithmes avancés."
 *                 description: La description de la session
 *               Date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-05T14:30:00.000Z"
 *                 description: La date et l'heure de la session
 *               InstructorId:
 *                 type: string
 *                 example: "651af0c8c3d9f5c72bcd4673"
 *                 description: L'ID de l'instructeur qui dirigera cette session
 *     responses:
 *       201:
 *         description: Session ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session added successfully"
 *       400:
 *         description: Requête invalide, erreur de validation ou données manquantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request or missing data"
 *       500:
 *         description: Erreur serveur lors de l'ajout de la session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */

route.post('/addSession', SessionController.addSession)
route.delete('/deleteSession/:id', SessionController.deleteSession)
route.put('/updateSession/:id', SessionController.updateSession)

/**
 * @swagger
 * /api/session/getSessions:
 *   get:
 *     summary: Récupérer la liste des membres dans l'instructor show members
 *     responses:
 *       200:
 *         description: Liste des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *
 *       404:
 *         description: Erreur lors de la récupération des membres
 */
route.get('/getSessions', SessionController.getSessions)
route.get('/getSessionById/:id', SessionController.getSessionById)
// by mariem for testing
/**
 * @swagger
 * /api/session/{id}:
 *   get:
 *     summary: Récupère un membre et les sessions pour un département spécifique
 *     description: Affiche les sessions associées à un membre d'un département précis (Basic, Intermediate, Advanced).
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du membre
 *         schema:
 *           type: string
 *       - in: path
 *         name: departement
 *         required: true
 *         description: Département du membre (Basic, Intermediate, Advanced)
 *         schema:
 *           type: string
 *           enum: [Basic, Intermediate, Advanced]
 *     responses:
 *       200:
 *         description: Membre et liste des sessions trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     NomPrenom:
 *                       type: string
 *                     Departement:
 *                       type: string
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       Title:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       Date:
 *                         type: string
 *                         format: date-time
 *                       Instructor:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           NomPrenom:
 *                             type: string
 *       400:
 *         description: Département invalide
 *       404:
 *         description: Aucun membre ou session trouvée
 *       500:
 *         description: Erreur serveur
 */

route.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Vérifier si le membre existe
    const member = await Member.findById(id).select('Departement')
    if (!member) {
      return res.status(404).json({ message: "Ce membre n'existe pas" })
    }
    const instructors = await Member.find({ Departement: member.Departement })

    // Retourner le membre et les sessions associées
    res.status(200).json({
      instructors
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = route
