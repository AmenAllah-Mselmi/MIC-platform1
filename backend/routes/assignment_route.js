const express = require('express')
const route = express.Router()
const assignmentController = require('../controllers/assignment_controller')

route.post('/addAssignment', assignmentController.addAssignment)
route.delete('/deleteAssignment/:id', assignmentController.deleteAssignment)
route.put('/updateAssignment/:id', assignmentController.updateAssignment)
/**
 * @swagger
 * /api/assignment/getAssignments:
 *   get:
 *     summary: Récupérer la liste des assignments
 *     responses:
 *       200:
 *         description: Liste des assignments
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
route.get('/getAssignments', assignmentController.getAssignments)
route.get('/getAssignmentById/:id', assignmentController.getAssignmentById)

module.exports = route
