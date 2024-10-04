const express = require('express')
const router = express.Router() // Fixed the variable name to router instead of route
const departementController = require('../controllers/departementController')

/**
 * @swagger
 * /api/department/all:
 *   get:
 *     summary: Récupérer la liste des départements
 *     tags:
 *       - department
 *     responses:
 *       200:
 *         description: Liste des départements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     description: ID du département
 *                   Nom:
 *                     type: string
 *                     description: Nom du département
 *       404:
 *         description: Erreur lors de la récupération des départements
 */
router.get('/all', departementController.afficher_All)

/**
 * @swagger
 * /api/department/create:
 *   post:
 *     summary: Créer un nouveau département
 *     tags:
 *       - department
 *     requestBody:
 *       description: Les informations du département à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du département
 *     responses:
 *       201:
 *         description: Département créé avec succès
 */
router.post('/create', departementController.create_Departement)

module.exports = router
