
import asyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';
import { retrieveMembers } from './memberController.js';
import fetch from 'node-fetch';


const addExpense = asyncHandler(async (req, res) => {
    console.log("req.body._id", req.body)
    if (req.body._id) {
        const expense = await Expense.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { useFindAndModify: false });

        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'
        if (expense) {
            res.status(201).json(expense)
        } else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    } else {
        const expense = await Expense.create(req.body);
        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'

        if (expense) {
            res.status(201).json(expense)
        } else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    }
});

const getExpenses = asyncHandler(async (req, res) => {

    const expenseList = await Expense.find();

    let { page, size, sort } = req.body;

    if (!page) {
        page = 1;
    }

    if (!size) {
        size = 10;
    }

    const pageCount = Math.ceil(expenseList.length / size);


    if (expenseList) {
        res.status(201).json({
            "page": page,
            "pageCount": pageCount,
            "totalPages": expenseList.length,
            "data": expenseList.slice(page * size - size, page * size)
        });
    } else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
});

const getExpenseById = asyncHandler(async (req, res) => {
    if (req.params.id) {
        const expenseList = await Expense.find({ _id: req.params.id });
        if (expenseList) {
            res.status(201).json(expenseList);
        } else {
            res.status(400);
            throw new Error('Error in retriving expense');
        }
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

const getExpenseSummary = asyncHandler(async (req, res) => {

    const expenseList = await Expense.find();


    // TODO: Need to add group and memberID check in future

    // const groupId = req.body.groupId;
    const memberList = await retrieveMembers();



    let shares = [];
    if (expenseList && expenseList.length > 0) {
        expenseList.map((exp, i) => {
            let splitAmount = exp.amount / exp.members.length;
            let primaryTransaction = true;
            exp.members.map(mem => {
                if (mem !== exp['paidBy']) {
                    let obj = {
                        'owsTo': exp['paidBy'],
                        'amount': splitAmount,
                        'owsBy': mem,
                        'transactionTotalAmt': exp.amount,
                        'transactionOwner': exp['paidBy']
                    }
                    if (primaryTransaction) {
                        obj.primaryTransaction = primaryTransaction;
                    }

                    shares.push(obj);
                    primaryTransaction = false;
                }
            })
        });

        // changes for calculating total group expenses
        const groupTotalExpense = await Expense.aggregate([{ $group: { _id: null, groupTotalExpense: { $sum: "$amount" } } }]);
        const expenseSummary = {};
        expenseSummary.shares = shares;
        expenseSummary.groupTotalExpense = groupTotalExpense;


        // changes to calculate individual shares
        let _memShares = memberList.map((mem, i) => {
            console.log("expenseList", expenseList);
            return shares && shares.length > 0 && shares.reduce((acc, ele) => {
                if (ele['owsBy'] == mem['value']) {
                    acc['owsBy'] = mem['value'];

                    if (acc['amount'][ele['owsTo']]) {
                        acc['amount'][ele['owsTo']] = acc['amount'][ele['owsTo']] + ele['amount'];

                    } else {
                        acc['amount'][ele['owsTo']] = ele['amount'];

                    }

                }

                // total expense by individual
                if (ele['owsTo'] == mem['value']) {
                    acc.totalExpenseByMember = ((ele['primaryTransaction'] && ele['transactionTotalAmt']) ? ele['transactionTotalAmt'] : 0)
                        + (acc?.totalExpenseByMember ? acc.totalExpenseByMember : 0);
                }

                acc.member = mem;

                return acc
            }, { amount: {} }) || [];


        });

        expenseSummary.memShares = _memShares;

        return res.status(201).json(expenseSummary);
    }

})


export {
    addExpense,
    getExpenses,
    getExpenseById,
    deleteExpense,
    deleteExpenseById,
    getExpenseSummary
}