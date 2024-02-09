
import asyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';

const addExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.create(req.body);
    //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'

    if (expense) {
        res.status(201).json(expense)
    } else {
        res.status(400);
        throw new Error('Error in adding expense');
    }
});

const getExpenses = asyncHandler(async (req, res) => {
    const expenseList = await Expense.find({});
    if (expenseList) {
        res.status(201).json(expenseList);
    } else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
})

const getExpenseById = asyncHandler(async (req, res) => {
    const expenseList = await Expense.find({ _id: req.params.id });
    if (expenseList) {
        res.status(201).json(expenseList);
    } else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
})

export {
    addExpense,
    getExpenses,
    getExpenseById
}