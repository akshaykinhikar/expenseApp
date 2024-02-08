import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
    {
        groupName: { type: String, required: true },
        members: { type: Array, required: true },

    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;