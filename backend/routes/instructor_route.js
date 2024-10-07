const express = require('express')
const route = express.Router()

const instructorController = require('../controllers/instructor_controller')

/**
 * @swagger
 * /api/instructor/create-with-department:
 *   post:
 *     summary: Créer un nouvel instructeur
 *     description: Crée un instructeur et l'associe à un département avec les informations fournies dans le corps de la requête.
 *     tags:
 *       - Instructors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f99c"
 *                 description: L'ID du département auquel l'instructeur sera associé
 *               instructorData:
 *                 type: object
 *                 properties:
 *                   NomPrenom:
 *                     type: string
 *                     example: "John Doe"
 *                     description: Nom et prénom de l'instructeur
 *                   Email:
 *                     type: string
 *                     format: email
 *                     example: "johndoe@example.com"
 *                     description: Email unique de l'instructeur
 *                   Password:
 *                     type: string
 *                     format: password
 *                     example: "password123"
 *                     description: Mot de passe de l'instructeur (au moins 8 caractères)
 *                   Role:
 *                     type: string
 *                     example: "instructor"
 *                     description: Le rôle de l'utilisateur (ici ce sera "instructor")
 *                   Adresse:
 *                     type: string
 *                     example: "123 rue de Paris"
 *                     description: Adresse de l'instructeur
 *                   ImageLink:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *                     description: Lien vers l'image de profil de l'instructeur (optionnel)
 *     responses:
 *       201:
 *         description: Instructeur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Instructor added successfully"
 *                 instructor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     NomPrenom:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     Role:
 *                       type: string
 *                     Adresse:
 *                       type: string
 *                     ImageLink:
 *                       type: string
 *                     DepartmentId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding instructor to department"
 */
route.post(
  '/create-with-department',
  instructorController.create_Instructor_with_department
)
/**
 * @swagger
 * /api/instructor/add-session-in-department:
 *   post:
 *     summary: Ajouter une session à un département
 *     description: Ajoute une nouvelle session à un département en l'associant à un instructeur avec les informations fournies dans le corps de la requête.
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f99c"
 *                 description: L'ID du département auquel la session sera associée
 *               instructorId:
 *                 type: string
 *                 example: "615c1bc5e70b7e6f30f8f123"
 *                 description: L'ID de l'instructeur qui gérera la session
 *               sessionData:
 *                 type: object
 *                 properties:
 *                   Title:
 *                     type: string
 *                     example: "Session de mathématiques"
 *                     description: Le titre de la session
 *                   Description:
 *                     type: string
 *                     example: "Cours de mathématiques pour le niveau intermédiaire"
 *                     description: La description de la session
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-01T09:00:00Z"
 *                     description: Date et heure de la session
 *     responses:
 *       201:
 *         description: Session créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session added successfully"
 *                 session:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f456"
 *                     Title:
 *                       type: string
 *                     Description:
 *                       type: string
 *                     Date:
 *                       type: string
 *                       format: date-time
 *                     Instructor:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     DepartmentId:
 *                       type: string
 *                       example: "615c1bc5e70b7e6f30f8f99c"
 *       404:
 *         description: Département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department not found"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding session to department"
 */
route.post(
  '/add-session-in-department',
  instructorController.Instructor_add_Session_In_department
)
/**
 * @swagger
 * /api/instructor/{instructorId}:
 *   get:
 *     summary: Récupérer les sessions par instructeur
 *     description: Récupère toutes les sessions associées à un instructeur spécifique en fonction de son ID.
 *     tags:
 *       - Sessions
 *     parameters:
 *       - name: instructorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "615c1bc5e70b7e6f30f8f99c"
 *           description: L'ID de l'instructeur
 *     responses:
 *       200:
 *         description: Liste des sessions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Title:
 *                     type: string
 *                     example: "Introduction to AI"
 *                   Description:
 *                     type: string
 *                     example: "Learn the basics of artificial intelligence."
 *                   Instructor:
 *                     type: string
 *                     example: "615c1bc5e70b7e6f30f8f99c"
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-02T10:00:00Z"
 *       404:
 *         description: Instructeur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Instructor not found"
 *       500:
 *         description: Erreur serveur lors de la récupération des sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving sessions"
 */
route.get('/:instructorId', instructorController.getSessionsByInstructor)

/**
 * @swagger
 * /api/instructor/department/{departmentId}:
 *   get:
 *     summary: Récupérer les sessions par département
 *     description: Récupère toutes les sessions associées à un département spécifique en fonction de son ID.
 *     tags:
 *       - "implementer dans interface instructor"
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "615c1bc5e70b7e6f30f8f99c"
 *           description: L'ID du département
 *     responses:
 *       200:
 *         description: Liste des sessions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   Title:
 *                     type: string
 *                     example: "Advanced Web Development"
 *                   Description:
 *                     type: string
 *                     example: "A deep dive into modern web development practices."
 *                   Instructor:
 *                     type: string
 *                     example: "615c1bc5e70b7e6f30f8f99c"
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-03T14:00:00Z"
 *       404:
 *         description: Département non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Department not found"
 *       500:
 *         description: Erreur serveur lors de la récupération des sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving sessions"
 */
route.get(
  '/department/:departmentId',
  instructorController.getSessionsByDepartment
)

route.put('/update/:id', instructorController.update_Instructor)
route.delete('/delete/:id', instructorController.delete_Instructor)
route.get('/find/:id', instructorController.findInstructor)
route.get('/count', instructorController.count)

module.exports = route
