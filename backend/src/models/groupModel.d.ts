import mongoose from 'mongoose';
export type Group = {
    _id: string;
    groupName: string;
    members: Array<String>;
    allGroups?: Array<any>;
};
declare const Group: mongoose.Model<Group & mongoose.Document<any, any, any>, {}, {}>;
export default Group;
