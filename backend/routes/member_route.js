const express = require('express')
const route = express.Router()
const MemberController = require('../controllers/member_controller')
const authenticateJWT = require('../middlewares/VerifyToken')

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
 * /api/member/all/{departmentId}:
 *   get:
 *     summary: Récupérer la liste des membres d'un département spécifique
 *     tags:
 *       - "Member"
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         description: ID du département pour lequel récupérer les membres
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du membre
 *                   NomPrenom:
 *                     type: string
 *                     description: Nom complet du membre
 *                   DepartmentIds:
 *                     type: string
 *                     description: Département du membre
 *                   ImageLink:
 *                     type: string
 *                     description: Lien de l'image de profil du membre
 *       404:
 *         description: Aucun membre trouvé ou département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *       500:
 *         description: Erreur serveur lors de la récupération des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                 error:
 *                   type: string
 *                   description: Détail de l'erreur
 */
route.get('/all/:departmentId', MemberController.afficher_All)
/**
 * @swagger
 * /api/member/admin/all:
 *   get:
 *     summary: Récupérer la liste des membres d'un département spécifique
 *     tags:
 *       - "Member"
 *     responses:
 *       200:
 *         description: Liste des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du membre
 *                   NomPrenom:
 *                     type: string
 *                     description: Nom complet du membre
 *                   DepartmentIds:
 *                     type: string
 *                     description: Département du membre
 *                   ImageLink:
 *                     type: string
 *                     description: Lien de l'image de profil du membre
 *       404:
 *         description: Aucun membre trouvé ou département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *       500:
 *         description: Erreur serveur lors de la récupération des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                 error:
 *                   type: string
 *                   description: Détail de l'erreur
 */
route.get('/admin/all', MemberController.afficher_All_For_Admin)

/**
 * @swagger
 * /api/member/create:
 *   post:
 *     summary: Créer un nouveau membre
 *     tags:
 *       - "Member"
 *     requestBody:
 *       description: Les informations du membre à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NomPrenom:
 *                 type: string
 *                 description: Le nom et prénom du membre
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse email du membre
 *               Password:
 *                 type: string
 *                 description: Le mot de passe du membre
 *                 minLength: 8
 *               Adresse:
 *                 type: string
 *                 description: L'adresse du membre
 *               ImageLink:
 *                 type: string
 *                 description: L'URL de l'image du membre (facultatif)
 *               DepartmentIds:
 *                 type: string
 *                 enum: [Basic, Intermediate, Advanced]
 *                 description: Le département auquel le membre appartient
 *             required:
 *               - NomPrenom
 *               - Email
 *               - Password
 *               - Adresse
 *               - DepartmentIds
 *     responses:
 *       201:
 *         description: Membre créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Member created successfully'
 *                 Member:
 *                   $ref: '#/components/schemas/Member'
 *       400:
 *         description: Champs requis manquants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Missing required fields'
 *       500:
 *         description: Erreur lors de la création du membre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Error in creating Member'
 *                 error:
 *                   type: string
 *                   description: Détails de l'erreur
 */

route.post('/create', MemberController.create_Member)

/**
 * @swagger
 * /api/member/update/{id}:
 *   put:
 *     summary: Mettre à jour un membre existant
 *     tags:
 *       - "Member"
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
 *     tags:
 *       - "Member"
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
