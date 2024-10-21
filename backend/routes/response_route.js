const express = require('express')
const response_controller = require('../controllers/response_controller')

const route = express.Router()

/**
 * @swagger
 * /api/response/responses:
 *   get:
 *     summary: Récupère toutes les réponses
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: Une liste de toutes les réponses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Response'
 *       500:
 *         description: Erreur serveur lors de la récupération des réponses
 */
route.get('/responses', response_controller.Display_All)

/**
 * @swagger
 * /api/response/responses:
 *   post:
 *     summary: Créer une nouvelle réponse
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *                 example: "6532ab12345678f1abc"
 *               assignmentId:
 *                 type: string
 *                 description: ID de l'assignment
 *                 example: "7e32ab1234bb78f1xyz"
 *               content:
 *                 type: string
 *                 description: Contenu de la réponse
 *                 example: "Voici ma réponse à l'assignement."
 *     responses:
 *       201:
 *         description: La réponse a été créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       400:
 *         description: L'utilisateur a déjà soumis une réponse pour cet assignment
 *       404:
 *         description: Assignment non trouvé
 *       500:
 *         description: Erreur serveur lors de la création de la réponse
 */
route.post('/responses', response_controller.create_Response)

/**
 * @swagger
 * /api/response/responsesByAssignmentIdAndUserId:
 *   get:
 *     summary: Récupérer une réponse par Assignment ID et User ID
 *     tags: [Responses]
 *     parameters:
 *       - in: query
 *         name: assignmentId
 *         required: true
 *         description: ID de l'assignement
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réponse trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 User_Id:
 *                   type: string
 *                 Assignment_Id:
 *                   type: string
 *                 Content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Réponse non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
route.get(
  '/responsesByAssignmentIdAndUserId',
  response_controller.Fetch_Response_By_Assignment_And_User
)

module.exports = route
