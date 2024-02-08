import asyncHandler from 'express-async-handler';
import Group from '../models/groupModel.js';

const addGroup = asyncHandler(async (req, res) => {
    const { groupName, members } = req.body;

    const groupExists = await Group.findOne({ groupName });

    if (groupExists) {
        res.status(400);
        throw new Error('Group name already exist')
    }

    const group = await Group.create({
        groupName,
        members
    })

    if (group) {
        res.status(201).json({
            _id: group._id,
            groupName: group.groupName,
            members: group.members
        })
    } else {
        res.status(400);
        throw new Error('Invalid group data')
    }
})

const getGroupByID = asyncHandler(async (req, res) => {
    const { id } = req.params.id;

    const group = await Group.find({ _id: id })

    if (group) {
        res.status(201).json({
            id: group._id,
            groupName: group.groupName,
            members: group.members
        })
    } else {
        res.status(400);
        throw new Error('invalid group');
    }
});


const getGroups = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const group = await Group.find({})

    if (group) {
        res.status(201).json({
            id: group._id,
            groupName: group.groupName,
            members: group.members
        })
    } else {
        res.status(400);
        throw new Error('invalid group');
    }
});

export {
    addGroup,
    getGroupByID,
    getGroups
}