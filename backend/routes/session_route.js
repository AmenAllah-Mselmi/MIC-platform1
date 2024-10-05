const express = require('express')
const route = express.Router()
const SessionController = require('../controllers/session_controller')

const { Member } = require('../models/user')

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

module.exports = route
