import express from 'express';
const memberRoutes = express.Router();
import { addMember, getMembers } from '../controllers/memberController.js';

memberRoutes.route('/')
    .post(addMember)
    .get(getMembers)


export default memberRoutes