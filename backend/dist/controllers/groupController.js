"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.deleteGroupById = exports.getGroups = exports.getGroupById = exports.addGroup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const groupModel_1 = __importDefault(require("../models/groupModel"));
const addGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupName, members } = req.body;
    const groupExists = yield groupModel_1.default.findOne({ groupName }).lean();
    if (groupExists) {
        return res.status(400).json({ status: 'error', message: "Group name already exist" });
        // res.status(400);
        // throw new Error('Group name already exist')
    }
    const group = yield groupModel_1.default.create({
        groupName,
        members
    });
    if (group) {
        res.status(201).json({
            status: 'success',
            _id: group._id,
            groupName: group.groupName,
            members: group.members
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid group data');
    }
}));
exports.addGroup = addGroup;
const getGroupById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params.id;
    const group = yield groupModel_1.default.find({ _id: id }).lean();
    if (group) {
        res.status(201).json({
            status: 'success',
            id: group._id,
            groupName: group.groupName,
            members: group.members
        });
    }
    else {
        res.status(400);
        throw new Error('invalid group');
    }
}));
exports.getGroupById = getGroupById;
const getGroups = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield groupModel_1.default.aggregate([
        {
            $match: {},
        },
        {
            "$project": { label: '$groupName', value: '$_id' }
        }
    ]);
    if (group) {
        res.status(201).json(group);
    }
    else {
        res.status(400);
        throw new Error('invalid group');
    }
}));
exports.getGroups = getGroups;
const deleteGroupById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.id;
    let group;
    if (groupId) {
        group = yield groupModel_1.default.deleteOne({ _id: groupId }).lean();
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (group) {
        // const allGroups = await Group.find({});
        const allGroups = yield groupModel_1.default.aggregate([
            {
                $match: {},
            },
            {
                "$project": { label: '$groupName', value: '$_id' }
            }
        ]);
        if (allGroups) {
            group.allGroups = allGroups;
        }
        res.status(201).json(group);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteGroupById = deleteGroupById;
const deleteGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // handle delete by groupName
    const deletedGroup = yield groupModel_1.default.deleteMany({});
    if (deletedGroup) {
        res.status(201).json(deletedGroup);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteGroup = deleteGroup;
