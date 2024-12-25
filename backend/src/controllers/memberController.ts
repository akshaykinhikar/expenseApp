import asyncHandler from 'express-async-handler';
import Member, { Member as memberModel } from '../models/memberModel';


// @desc Add new member
// @route POST /api/members
// @access Public
const addMember = asyncHandler(async (req: any, res: any) => {
    const { name, email } = req.body;

    //TODO: mapMemberID OR handle login scenario only that groups member should be visible
    const memberExist = await Member.findOne({ email }).lean();

    if (memberExist) {
        return res.status(400).json({ status: 'error', message: "Member with same email already exist" });
        // throw new Error('Member already Exist');
    }

    const member: memberModel = await Member.create({
        name,
        email
    });

    if (member) {
        res.status(201).json({
            status: 'success',
            _id: member._id,
            name: member.name,
            email: member.email,
        })
    } else {
        res.status(400)
        throw Error('Invalid member Data')
    }

})

// @desc Get all member
// @route POST /api/members
// @access Public
const getMembers = asyncHandler(async (req: any, res: any) => {
    const members = await retrieveMembers();
    res.json(members)
})

const deleteMemberById = asyncHandler(async (req: any, res: any) => {
    const memberId = req.params.id;
    // TODO: 
    let member: any;
    if (memberId) {
        member = await Member.deleteOne({ _id: memberId });
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }

    if (member) {
        // const allmembers = await member.find({});
        const allMembers = await Member.aggregate(
            [
                {
                    $match: {},
                },
                {
                    "$project": { "label": "$name", "value": "$_id" }
                }
            ]
        );
        if (allMembers) {
            member.allMembers = allMembers;
        }
        res.status(201).json(member);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

const deleteMembers = asyncHandler(async (req: any, res: any) => {
    // handle delete by groupName
    const deletedMembers = await Member.deleteMany({});
    if (deletedMembers) {
        res.status(201).json(deletedMembers);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

// type memebersModel = Array<{ label: string, value: string }>
const retrieveMembers = async () => {
    const members = await Member.aggregate([{
        $match: {}
    },
    { "$project": { "label": "$name", "value": "$_id" } }
    ])
    return members
}

export {
    addMember,
    getMembers,
    deleteMemberById,
    deleteMembers,
    retrieveMembers
}