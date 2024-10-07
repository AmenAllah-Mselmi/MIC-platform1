const express = require('express')
const route = express.Router()
const MemberController = require('../controllers/member_controller')

/**
 * @swagger
 * /api/member/department/{departmentId}:
 *   get:
 *     summary: Récupérer la liste des assignments à partir d'un department
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         description: L'ID du département
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la session
 *                   Assignment:
 *                     type: string
 *                     description: Détails de l'assignement de la session
 *       404:
 *         description: Département non trouvé ou erreurs lors de la récupération des assignments
 */
route.get(
  '/department/:departmentId',
  MemberController.Member_get_assignments_of_his_department
)

/**
 * @swagger
 * /api/member/all:
 *   get:
 *     summary: Récupérer la liste des membres dans l'instructor show members
 *     tags:
 *         - "implementer dans interface instructor"
 *     responses:
 *       200:
 *         description: Liste des membres
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                     description: ID du membre
 *                   NomPrenom:
 *                     type: string
 *                     description: Nom complet du membre
 *                   Departement:
 *                     type: string
 *                     description: Departement du membre
 *                   ImageLink:
 *                     type: string
 *                     description: Image de profil du membre
 *       404:
 *         description: Erreur lors de la récupération des membres
 */
route.get('/all', MemberController.afficher_All)

/**
 * @swagger
 * /api/member/create:
 *   post:
 *     summary: Créer un nouveau membre
 *     requestBody:
 *       description: Les informations du membre à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Membre créé avec succès
 */
route.post('/create', MemberController.create_Member)

/**
 * @swagger
 * /api/member/update/{id}:
 *   put:
 *     summary: Mettre à jour un membre existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du membre à mettre à jour
 *     requestBody:
 *       description: Les informations à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Membre mis à jour avec succès
 */
route.put('/update/:id', MemberController.update_Member)

/**
 * @swagger
 * /api/member/delete/{id}:
 *   delete:
 *     summary: Supprimer un membre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du membre à supprimer
 *     responses:
 *       200:
 *         description: Membre supprimé avec succès
 */
route.delete('/delete/:id', MemberController.delete_Member)

/**
 * @swagger
 * /api/member/find/{id}:
 *   get:
 *     summary: Trouver un membre par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du membre à trouver
 *     responses:
 *       200:
 *         description: Informations du membre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
route.get('/find/:id', MemberController.findMember)

/**
 * @swagger
 * /api/member/count:
 *   get:
 *     summary: Récupérer le nombre total de membres
 *     responses:
 *       200:
 *         description: Nombre total de membres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: string
 */
route.get('/count', MemberController.count)

module.exports = route
