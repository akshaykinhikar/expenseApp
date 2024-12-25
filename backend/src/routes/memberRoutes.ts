// @ts-ignore
import express from 'express';
const memberRoutes = express.Router();
import { addMember, deleteMemberById, deleteMembers, getMembers } from '../controllers/memberController';

memberRoutes.route('/')
    .post(addMember)
    .get(getMembers)
memberRoutes.route('/delete/').get(deleteMembers)
memberRoutes.route('/delete/:id').get(deleteMemberById)



export default memberRoutes