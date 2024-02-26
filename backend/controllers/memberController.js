import asyncHandler from 'express-async-handler';
import Member from '../models/memberModel.js';


// @desc Add new member
// @route POST /api/members
// @access Public
const addMember = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    //TODO: mapMemberID OR handle login scenario only that groups member should be visible
    const memberExist = await Member.findOne({ email })

    if (memberExist) {
        return res.status(400).json({ status: 'error', message: "Member with same email already exist" });
        // throw new Error('Member already Exist');
    }

    const member = await Member.create({
        name,
        email
    })

    if (member) {
        res.status(201).json({
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
const getMembers = asyncHandler(async (req, res) => {
    const members = await Member.aggregate([{
        $match: {}
    },
    { "$project": { "label": "$name", "value": "$_id" } }
    ])
    res.json(members)
})


export {
    addMember,
    getMembers,
}