
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

const deleteExpense = asyncHandler(async (req, res) => {
    // handle delete by groupName
    const deletedExpenses = await Expense.deleteMany({});
    if (deleteExpense) {
        res.status(201).json(deletedExpenses);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

const deleteExpenseById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    let deletedExpense;
    // handle delete by groupName
    if (id) {
        deletedExpense = await Expense.deleteOne({ _id: id });
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (deleteExpense) {
        const availableRecords = await Expense.find({});
        if (availableRecords) {
            deletedExpense.availableRecords = availableRecords;
        }
        res.status(201).json(deletedExpense);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})


export {
    addExpense,
    getExpenses,
    getExpenseById,
    deleteExpense,
    deleteExpenseById
}