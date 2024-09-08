
import asyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel';
import { retrieveMembers } from './memberController';
import { Request, Response } from 'express';


interface data { name: string };
type expenseModel = {
    _id: string;
    members: [string];
    expenseName: string;
    amount: number;
    paidBy: string;
    addedBy: string;
    groupId: string;
};

type deleteExpenseModel = {
    "deletedCount": number,
    "availableRecords": Array<expenseModel>

};
type sharesModel = {
    'owsTo': string;
    'amount': number;
    'owsBy': string;
    'transactionTotalAmt': number;
    'transactionOwner': string,
    "primaryTransaction"?: true,
    totalExpenseByMember?: number,
    "member"?: {
        "_id": string,
        "label": string,
        "value": string
    },
};
type expenseSummaryPayModel = {
    groupId: string
};

type groupTotalExpenseModel =
    {
        "_id": null,
        "groupTotalExpense": number
    };

type memSharesModel = {
    "amount"?: { [key: string]: number; }
    "totalExpenseByMember"?: number,
    "member": {
        "_id": string,
        "label": string,
        "value": string
    },
    "owsBy"?: string
};

type expenseSummaryModel = {
    shares: Array<sharesModel>,
    groupTotalExpense: Array<groupTotalExpenseModel>,
    memShares: Array<memSharesModel>
};

type memebersModel = { 'label': string, 'value': string };

type queryStringModel = {
    groupId?: string | number;
};



const addExpense = asyncHandler(async (req, res) => {
    console.log("req.body._id", req.body)
    if (req.body._id) {
        const expense = await Expense.findOneAndUpdate({ _id: req.body._id }, { $set: { ...req.body, updatedAt: new Date() } }, { useFindAndModify: false });

        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'
        if (expense) {
            res.status(201).json(expense)
        } else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    } else {
        const expense = await Expense.create({ ...req.body, createdAt: new Date() });
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

    let { page, size, sort, searchString, groupId } = req.body;

    // TODO: 
    type searchQueryModel = {
        expenseName: { $regex: string };
        groupId?: string | number
    };

    const searchQuery: searchQueryModel = {
        expenseName: { $regex: searchString },
    }

    if (groupId) {
        searchQuery.groupId = groupId;

    }


    const expenseList = await Expense.find(searchQuery as any).sort({ createdAt: -1 }).lean();


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
        }, 2000)
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
    if (deletedExpenses) {
        res.status(201).json(deletedExpenses);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})


const deleteExpenseById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    let deletedExpense: deleteExpenseModel;
    // handle delete by groupName
    if (id) {
        deletedExpense = await Expense.deleteOne({ _id: id }) as deleteExpenseModel;
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (deletedExpense) {
        // TODO: 
        const availableRecords = await Expense.find({}) as any;
        if (availableRecords) {
            deletedExpense.availableRecords = availableRecords;
        }
        res.status(201).json(deletedExpense);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

// TODO:
const getExpenseSummary = asyncHandler(async (req: Request<{}, {}, expenseSummaryPayModel>,
    res: any) => {
    // res: Response<expenseSummaryModel | ErrorResponse>) => {
    let { groupId } = req.body;

    const queryString: queryStringModel = {}

    if (groupId) {
        queryString.groupId = groupId;
    }

    const expenseList: Array<expenseModel> = await Expense.find(queryString as any).sort({}).lean();

    // TODO: Need to add group and memberID check in future


    // const groupId = req.body.groupId;
    const memberList: Array<memebersModel> = await retrieveMembers();

    let shares: Array<sharesModel> = [];
    if (expenseList && expenseList.length > 0) {
        expenseList.map((exp: expenseModel, i) => {
            let splitAmount: number = exp.amount / exp.members.length as number;
            let primaryTransaction = true;
            exp.members.map(mem => {
                if (mem !== exp['paidBy']) {
                    let obj: sharesModel = {
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
        const aggragateGpTtlQuery = [];
        if (groupId) {
            let filterByGroupId = {
                "$match": {
                    groupId: groupId
                }
            }
            aggragateGpTtlQuery.push(filterByGroupId);
        }

        aggragateGpTtlQuery.push({ $group: { _id: null, groupTotalExpense: { $sum: "$amount" } } });



        const groupTotalExpense: groupTotalExpenseModel[] = await Expense.aggregate(aggragateGpTtlQuery);
        const expenseSummary: expenseSummaryModel = {
            shares: [],
            groupTotalExpense: [],
            memShares: [],
        };
        expenseSummary.shares = shares;
        expenseSummary.groupTotalExpense = groupTotalExpense;


        // changes to calculate individual shares
        let _memShares = memberList.map((mem: memebersModel, i) => {
            console.log("expenseList", expenseList);
            type accModel = {
                owsBy?: string,
                amount: { [key: string]: number; },
                totalExpenseByMember: number,
                member: memebersModel
            }
            // TODO: acc: accModel
            return shares && shares.length > 0 && shares.reduce((acc: any, ele: sharesModel) => {
                if (ele['owsBy'] == mem.value) {
                    acc['owsBy'] = mem['value'];
                    let keyOwsTo = ele['owsTo'];
                    if (acc?.amount?.[keyOwsTo]) {
                        acc.amount[keyOwsTo] = acc?.amount?.[keyOwsTo] + ele['amount'];

                    } else {
                        acc.amount[keyOwsTo] = ele['amount'];

                    }

                }

                // total expense by individual
                if (ele['owsTo'] == mem['value']) {
                    acc.totalExpenseByMember = ((ele['primaryTransaction'] && ele['transactionTotalAmt']) ? ele['transactionTotalAmt'] : 0)
                        + (acc?.totalExpenseByMember ? acc.totalExpenseByMember : 0);
                }

                acc.member = mem;

                return acc
            }, { amount: {} });


        });
        // TODO:
        expenseSummary.memShares = _memShares as any;

        return res.status(201).json(expenseSummary);
    } else {
        return res.status(201).json({});
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