import express from 'express';
const groupRoutes = express.Router();
import { addGroup, getGroups, getGroupById } from '../controllers/groupController.js';

groupRoutes.route('/').post(addGroup).get(getGroups)
groupRoutes.route('/:id').get(getGroupById)


export default groupRoutes