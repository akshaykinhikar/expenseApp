"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupRoutes = express_1.default.Router();
const groupController_1 = require("../controllers/groupController");
groupRoutes.route('/').post(groupController_1.addGroup).get(groupController_1.getGroups);
groupRoutes.route('/:id').get(groupController_1.getGroupById);
groupRoutes.route('/delete/').get(groupController_1.deleteGroup);
groupRoutes.route('/delete/:id').get(groupController_1.deleteGroupById);
exports.default = groupRoutes;
