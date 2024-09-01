"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memberRoutes = express_1.default.Router();
const memberController_1 = require("../controllers/memberController");
memberRoutes.route('/')
    .post(memberController_1.addMember)
    .get(memberController_1.getMembers);
memberRoutes.route('/delete/').get(memberController_1.deleteMembers);
memberRoutes.route('/delete/:id').get(memberController_1.deleteMemberById);
exports.default = memberRoutes;
