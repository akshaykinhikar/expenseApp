import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
    {
        expenseName: { type: String, required: true },
        amount: { type: Number, required: true },
        members: { type: Array, required: true },
        paidBy: { type: String, required: true },
        addedBy: { type: String, required: true },
        groupId: { type: String, required: true },
    }
);

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;