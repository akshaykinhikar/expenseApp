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
exports.retrieveMembers = exports.deleteMembers = exports.deleteMemberById = exports.getMembers = exports.addMember = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const memberModel_1 = __importDefault(require("../models/memberModel"));
// @desc Add new member
// @route POST /api/members
// @access Public
const addMember = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    //TODO: mapMemberID OR handle login scenario only that groups member should be visible
    const memberExist = yield memberModel_1.default.findOne({ email }).lean();
    if (memberExist) {
        return res.status(400).json({ status: 'error', message: "Member with same email already exist" });
        // throw new Error('Member already Exist');
    }
    const member = yield memberModel_1.default.create({
        name,
        email
    });
    if (member) {
        res.status(201).json({
            status: 'success',
            _id: member._id,
            name: member.name,
            email: member.email,
        });
    }
    else {
        res.status(400);
        throw Error('Invalid member Data');
    }
}));
exports.addMember = addMember;
// @desc Get all member
// @route POST /api/members
// @access Public
const getMembers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield retrieveMembers();
    res.json(members);
}));
exports.getMembers = getMembers;
const deleteMemberById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.id;
    // TODO: 
    let member;
    if (memberId) {
        member = yield memberModel_1.default.deleteOne({ _id: memberId });
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (member) {
        // const allmembers = await member.find({});
        const allMembers = yield memberModel_1.default.aggregate([
            {
                $match: {},
            },
            {
                "$project": { "label": "$name", "value": "$_id" }
            }
        ]);
        if (allMembers) {
            member.allMembers = allMembers;
        }
        res.status(201).json(member);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteMemberById = deleteMemberById;
const deleteMembers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // handle delete by groupName
    const deletedMembers = yield memberModel_1.default.deleteMany({});
    if (deletedMembers) {
        res.status(201).json(deletedMembers);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteMembers = deleteMembers;
// type memebersModel = Array<{ label: string, value: string }>
const retrieveMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield memberModel_1.default.aggregate([{
            $match: {}
        },
        { "$project": { "label": "$name", "value": "$_id" } }
    ]);
    return members;
});
exports.retrieveMembers = retrieveMembers;
