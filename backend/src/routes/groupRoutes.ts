// @ts-ignore
import express from 'express';
const groupRoutes = express.Router();
import { addGroup, getGroups, getGroupById, deleteGroupById, deleteGroup } from '../controllers/groupController';
groupRoutes.route('/').post(addGroup).get(getGroups)
groupRoutes.route('/:id').get(getGroupById)
groupRoutes.route('/delete/').get(deleteGroup)
groupRoutes.route('/delete/:id').get(deleteGroupById)


export default groupRoutes