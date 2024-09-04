import express from "express";
 const route = express.Router();
import MemberController from '../controllers/member_controller.js'

route.get('/all', MemberController.afficher_All);
route.post('/create', MemberController.create_Member);
route.put('/update/:id', MemberController.update_Member);
route.delete('/delete/:id', MemberController.delete_Member);
route.get('/find/:id', MemberController.findMember);
route.get('/count', MemberController.count);
export default route;
