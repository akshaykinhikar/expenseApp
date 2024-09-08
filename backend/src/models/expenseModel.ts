import mongoose from 'mongoose';

const { Schema } = mongoose;

type Expense = {
    id?: string,
    expenseName: { type: String, required: true },
    amount: { type: Number, required: true },
    members: { type: Array<string>, required: true },
    paidBy: { type: String, required: true },
    addedBy: { type: String, required: true },
    groupId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
};

const expenseSchema = new Schema({
    expenseName: { type: String, required: true },
    amount: { type: Number, required: true },
    members: { type: Array<string>, required: true },
    paidBy: { type: String, required: true },
    addedBy: { type: String, required: true },
    groupId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
});

const Expense = mongoose.model<Expense & mongoose.Document>('Expense', expenseSchema);
export default Expense;
// const expenseSchema = mongoose.Schema(
//     {
//         expenseName: { type: String, required: true },
//         amount: { type: Number, required: true },
//         members: { type: Array, required: true },
//         paidBy: { type: String, required: true },
//         addedBy: { type: String, required: true },
//         groupId: { type: String, required: true },
//         createdAt: { type: Date, required: true },
//         updatedAt: { type: Date, required: false },
//     }
// );

// const Expense = mongoose.model('Expense', expenseSchema);
// 