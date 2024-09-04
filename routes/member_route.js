const express = require('express');
const route = express.Router();

const MemberController = require('../controllers/member_controller');
// const authenticationMiddleware = require('../middlewares/Authentication');

route.get('/all', MemberController.afficher_All);
route.post('/create', MemberController.create_Member);
route.put('/update/:id', MemberController.update_Member);
route.delete('/delete/:id', MemberController.delete_Member);
route.get('/find/:id', MemberController.findMember);
route.get('/count', MemberController.count);
module.exports = route;