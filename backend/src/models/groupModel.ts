import mongoose, { Document, Schema } from 'mongoose';


export type Group =
    {
        _id: string,
        groupName: string,
        members: Array<String>,
        allGroups?: Array<any>
    };

const groupSchema = new Schema(
    {
        groupName: { type: String, required: true },
        members: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model<Group & Document>('Group', groupSchema);

export default Group;


// import mongoose from "mongoose";

// const groupSchema = mongoose.Schema(
//     {
//         groupName: { type: String, required: true },
//         members: { type: Array, required: true },
//     },
//     {
//         timestamps: true,
//     }
// );

// const Group = mongoose.model('Group', groupSchema);

// export default Group;