"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseSummary = exports.deleteExpenseById = exports.deleteExpense = exports.getExpenseById = exports.getExpenses = exports.addExpense = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
const memberController_1 = require("./memberController");
;
const addExpense = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body._id", req.body);
    if (req.body._id) {
        const expense = yield expenseModel_1.default.findOneAndUpdate({ _id: req.body._id }, { $set: Object.assign(Object.assign({}, req.body), { updatedAt: new Date() }) }, { useFindAndModify: false });
        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'
        if (expense) {
            res.status(201).json(expense);
        }
        else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    }
    else {
        const expense = yield expenseModel_1.default.create(Object.assign(Object.assign({}, req.body), { createdAt: new Date() }));
        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'
        if (expense) {
            res.status(201).json(expense);
        }
        else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    }
}));
exports.addExpense = addExpense;
const getExpenses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, size, sort, searchString, groupId } = req.body;
    const searchQuery = {
        expenseName: { $regex: searchString },
    };
    if (groupId) {
        searchQuery.groupId = groupId;
    }
    const expenseList = yield expenseModel_1.default.find(searchQuery).sort({ createdAt: -1 }).lean();
    if (!page) {
        page = 1;
    }
    if (!size) {
        size = 10;
    }
    const pageCount = Math.ceil(expenseList.length / size);
    if (expenseList) {
        setTimeout(() => {
            res.status(201).json({
                "page": page,
                "pageCount": pageCount,
                "totalPages": expenseList.length,
                "data": expenseList.slice(page * size - size, page * size)
            });
        }, 2000);
    }
    else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
}));
exports.getExpenses = getExpenses;
const getExpenseById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id) {
        const expenseList = yield expenseModel_1.default.find({ _id: req.params.id });
        if (expenseList) {
            res.status(201).json(expenseList);
        }
        else {
            res.status(400);
            throw new Error('Error in retriving expense');
        }
    }
    else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
}));
exports.getExpenseById = getExpenseById;
const deleteExpense = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // handle delete by groupName
    const deletedExpenses = yield expenseModel_1.default.deleteMany({});
    if (deletedExpenses) {
        res.status(201).json(deletedExpenses);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteExpense = deleteExpense;
const deleteExpenseById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let deletedExpense;
    // handle delete by groupName
    if (id) {
        deletedExpense = (yield expenseModel_1.default.deleteOne({ _id: id }));
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (deletedExpense) {
        // TODO: 
        const availableRecords = yield expenseModel_1.default.find({});
        if (availableRecords) {
            deletedExpense.availableRecords = availableRecords;
        }
        res.status(201).json(deletedExpense);
    }
    else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
}));
exports.deleteExpenseById = deleteExpenseById;
// TODO:
const getExpenseSummary = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res: Response<expenseSummaryModel | ErrorResponse>) => {
    let { groupId } = req.body;
    const queryString = {};
    if (groupId) {
        queryString.groupId = groupId;
    }
    const expenseList = yield expenseModel_1.default.find(queryString).sort({}).lean();
    // TODO: Need to add group and memberID check in future
    // const groupId = req.body.groupId;
    const memberList = yield (0, memberController_1.retrieveMembers)();
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
                    };
                    if (primaryTransaction) {
                        obj.primaryTransaction = primaryTransaction;
                    }
                    shares.push(obj);
                    primaryTransaction = false;
                }
            });
        });
        // changes for calculating total group expenses
        const aggragateGpTtlQuery = [];
        if (groupId) {
            let filterByGroupId = {
                "$match": {
                    groupId: groupId
                }
            };
            aggragateGpTtlQuery.push(filterByGroupId);
        }
        aggragateGpTtlQuery.push({ $group: { _id: null, groupTotalExpense: { $sum: "$amount" } } });
        const groupTotalExpense = yield expenseModel_1.default.aggregate(aggragateGpTtlQuery);
        const expenseSummary = {
            shares: [],
            groupTotalExpense: [],
            memShares: [],
        };
        expenseSummary.shares = shares;
        expenseSummary.groupTotalExpense = groupTotalExpense;
        // changes to calculate individual shares
        let _memShares = memberList.map((mem, i) => {
            console.log("expenseList", expenseList);
            // TODO: acc: accModel
            return shares && shares.length > 0 && shares.reduce((acc, ele) => {
                var _a, _b;
                if (ele['owsBy'] == mem.value) {
                    acc['owsBy'] = mem['value'];
                    let keyOwsTo = ele['owsTo'];
                    if ((_a = acc === null || acc === void 0 ? void 0 : acc.amount) === null || _a === void 0 ? void 0 : _a[keyOwsTo]) {
                        acc.amount[keyOwsTo] = ((_b = acc === null || acc === void 0 ? void 0 : acc.amount) === null || _b === void 0 ? void 0 : _b[keyOwsTo]) + ele['amount'];
                    }
                    else {
                        acc.amount[keyOwsTo] = ele['amount'];
                    }
                }
                // total expense by individual
                if (ele['owsTo'] == mem['value']) {
                    acc.totalExpenseByMember = ((ele['primaryTransaction'] && ele['transactionTotalAmt']) ? ele['transactionTotalAmt'] : 0)
                        + ((acc === null || acc === void 0 ? void 0 : acc.totalExpenseByMember) ? acc.totalExpenseByMember : 0);
                }
                acc.member = mem;
                return acc;
            }, { amount: {} });
        });
        // TODO:
        expenseSummary.memShares = _memShares;
        return res.status(201).json(expenseSummary);
    }
    else {
        return res.status(201).json({});
    }
}));
exports.getExpenseSummary = getExpenseSummary;
