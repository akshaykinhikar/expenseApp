import express from 'express';
const groupRoutes = express.Router();
import { addGroup, getGroups, getGroupByID } from '../controllers/groupController.js';

groupRoutes.route('/').post(addGroup).get(getGroups)
groupRoutes.route('/:id').get(getGroupByID)


export default groupRoutes