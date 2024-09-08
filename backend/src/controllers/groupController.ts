import asyncHandler from 'express-async-handler';
import Group, { Group as groupModel } from '../models/groupModel';

const addGroup = asyncHandler(async (req: any, res: any) => {
    const { groupName, members } = req.body;

    const groupExists = await Group.findOne({ groupName }).lean();

    if (groupExists) {
        return res.status(400).json({ status: 'error', message: "Group name already exist" });
        // res.status(400);
        // throw new Error('Group name already exist')
    }

    const group = await Group.create({
        groupName,
        members
    })

    if (group) {
        res.status(201).json({
            status: 'success',
            _id: group._id,
            groupName: group.groupName,
            members: group.members
        })
    } else {
        res.status(400);
        throw new Error('Invalid group data')
    }
})

const getGroupById = asyncHandler(async (req: any, res) => {
    const { id } = req.params.id;

    const group: groupModel = await Group.find({ _id: id }).lean()

    if (group) {
        res.status(201).json({
            status: 'success',
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

    const group = await Group.aggregate(
        [
            {
                $match: {},
            },
            {
                "$project": { label: '$groupName', value: '$_id' }
            }
        ]
    );

    if (group) {
        res.status(201).json(group)
    } else {
        res.status(400);
        throw new Error('invalid group');
    }
});

const deleteGroupById = asyncHandler(async (req, res) => {
    const groupId = req.params.id;
    let group: groupModel;
    if (groupId) {
        group = await Group.deleteOne({ _id: groupId }).lean();
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }

    if (group) {
        // const allGroups = await Group.find({});
        const allGroups = await Group.aggregate(
            [
                {
                    $match: {},
                },
                {
                    "$project": { label: '$groupName', value: '$_id' }
                }
            ]
        );
        if (allGroups) {
            group.allGroups = allGroups;
        }
        res.status(201).json(group);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

const deleteGroup = asyncHandler(async (req, res) => {
    // handle delete by groupName
    const deletedGroup = await Group.deleteMany({});
    if (deletedGroup) {
        res.status(201).json(deletedGroup);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})


export {
    addGroup,
    getGroupById,
    getGroups,
    deleteGroupById,
    deleteGroup
}