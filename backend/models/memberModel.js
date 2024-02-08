import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true }
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.model('Member', memberSchema);

export default Member;