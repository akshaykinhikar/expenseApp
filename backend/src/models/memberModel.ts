import mongoose from "mongoose";
const { Schema } = mongoose;

export type Member = {
    _id: string,
    name: string,
    email: string,
    status?: string
}

const memberSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true }
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.model<Member & mongoose.Document>('Member', memberSchema);

export default Member;