
import asyncHandler from 'express-async-handler';
import Expenditure from '../models/expenditureModel';
import { retrieveMembers } from './memberController';
// @ts-ignore
import { Request, Response } from 'express';


interface data { name: string };
type expenditureModel = {
    _id: string;
    name: string;
    category: string;
    dueDate: Date;
    paymentMethod: string;
    payee: string;
    notes: string;
    recurring: string;
    recurringTill: Date | null;
    tags: string;
    status: boolean;
    // userId: string;
    createdAt: Date;
    updatedAt: Date;
};

type deleteExpenditureModel = {
    "deletedCount": number,
    "availableRecords": Array<expenditureModel>
};

const addExpenditure = asyncHandler(async (req: any, res: any) => {
    console.log("req.body._id", req.body)
    if (req.body._id) {
        const expenditure = await Expenditure.findOneAndUpdate({ _id: req.body._id }, { $set: { ...req.body, updatedAt: new Date() } }, { useFindAndModify: false });

        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'
        if (expenditure) {
            res.status(201).json(expenditure)
        } else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    } else {
        const expenditure = await Expenditure.create({ ...req.body, createdAt: new Date() });
        //'[{"expenseName":"test expense","amount":"100","paidBy":"","addedBy":"","groupId":"","selectedMembers":["65c4e7065d63f06fb8566be9"]}]'

        if (expenditure) {
            res.status(201).json(expenditure)
        } else {
            res.status(400);
            throw new Error('Error in adding expense');
        }
    }
});

const getExpenditures = asyncHandler(async (req: any, res: any) => {
    console.log("**** getExpenditures", req.body);
    let { page, size, sort, searchString } = req.body;

    // TODO: 
    // type searchQueryModel = {
    //     expenditure: { $regex: string };
    // };

    // const searchQuery: searchQueryModel = {
    //     expenditure: { $regex: searchString },
    // }


    // modify due date tobe in format of YYYY-MM-DD
    const expenditureList = await Expenditure.find().sort({ createdAt: -1 }).lean();

    // Format dueDate to YYYY-MM-DD
    const formattedExpenditureList = expenditureList.map((expenditure) => ({
        ...expenditure,
        dueDate: expenditure.dueDate ? new Date(expenditure.dueDate as any).toISOString().split('T')[0] : null, // Format dueDate
        recurringTill: expenditure.recurringTill ? new Date(expenditure.recurringTill as any).toISOString().split('T')[0] : null, // Format recurringTill
    }));

    if (!page) {
        page = 1;
    }

    if (!size) {
        size = 10;
    }

    const pageCount = Math.ceil(formattedExpenditureList.length / size);


    if (formattedExpenditureList) {
        setTimeout(() => {
            res.status(201).json({
                "page": pageCount < page ? pageCount : page,
                "pageCount": pageCount,
                "totalPages": formattedExpenditureList.length,
                "data": formattedExpenditureList.slice(page * size - size, page * size)
            });
        }, 2000)
    } else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
});


const getFutureExpenditures = asyncHandler(async (req: any, res: any) => {
    console.log("**** getFutureExpenditures", req.body);
    let { page, size, sort, searchString } = req.body;

    // TODO: 
    // type searchQueryModel = {
    //     expenditure: { $regex: string };
    // };

    const { year, month } = req.body;
    const startDate = new Date(year, month - 1, 1);
    // const startDate = new Date(2025, 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month
    // const endDate = new Date(2025, 5, 0); // Last day of the month

    const searchQuery = {  
        dueDate: {
            $gte: startDate,
            $lt: endDate
        },

    };

    const expenditureList = await Expenditure.find(searchQuery as any).sort({ createdAt: -1 }).lean();

    console.log("**** FUTUREexpenditureList", expenditureList);
    if (!page) {
        page = 1;
    }

    if (!size) {
        size = 10;
    }

    const pageCount = Math.ceil(expenditureList.length / size);


    if (expenditureList) {
        setTimeout(() => {
            res.status(201).json({
                "page": pageCount < page ? pageCount : page,
                "pageCount": pageCount,
                "totalPages": expenditureList.length,
                "data": expenditureList.slice(page * size - size, page * size)
            });
        }, 2000)
    } else {
        res.status(400);
        throw new Error('Error in retriving expense');
    }
});



const getExpenditureById = asyncHandler(async (req: any, res: any) => {
    if (req.params.id) {
        const expenditureList = await Expenditure.find({ _id: req.params.id });
        if (expenditureList) {
            res.status(201).json(expenditureList);
        } else {
            res.status(400);
            throw new Error('Error in retriving expenditure');
        }
    } else {
        res.status(400);
        throw new Error('Error in retriving expenditure');
    }
})

const deleteExpenditure = asyncHandler(async (req: any, res: any) => {
    // handle delete by groupName
    const deletedExpenditures = await Expenditure.deleteMany({});
    if (deletedExpenditures) {
        res.status(201).json(deletedExpenditures);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})


const deleteExpenditureById = asyncHandler(async (req: any, res: any) => {
    const id = req.params.id;

    let deletedExpenditure: deleteExpenditureModel;
    // handle delete by groupName
    if (id) {
        deletedExpenditure = await Expenditure.deleteOne({ _id: id }) as deleteExpenditureModel;
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
    if (deletedExpenditure) {
        // TODO: 
        const availableRecords = await Expenditure.find({}) as any;
        if (availableRecords) {
            deletedExpenditure.availableRecords = availableRecords;
        }
        res.status(201).json(deletedExpenditure);
    } else {
        res.status(400);
        throw new Error('Error in deleting records, Please try again');
    }
})

// TODO:
// const getExpenseSummary = asyncHandler(async (req: Request<{}, {}, expenseSummaryPayModel>,
//     res: any) => {
//     // res: Response<expenseSummaryModel | ErrorResponse>) => {
//     let { groupId } = req.body;

//     const queryString: queryStringModel = {}

//     if (groupId) {
//         queryString.groupId = groupId;
//     }

//     const expenseList: Array<expenseModel> = await Expense.find(queryString as any).sort({}).lean();
//     console.log("*****expenseList", expenseList);

//     // TODO: Need to add group and memberID check in future


//     // const groupId = req.body.groupId;
//     const memberList: Array<memebersModel> = await retrieveMembers();

//     let shares: Array<sharesModel> = [];
//     if (expenseList && expenseList.length > 0) {
//         expenseList.map((exp: expenseModel, i) => {
//             let splitAmount: number = exp.amount / exp.members.length as number;
//             let primaryTransaction = true;
//             exp.members.map(mem => {
//                 if (mem !== exp['paidBy']) {
//                     let obj: sharesModel = {
//                         'owsTo': exp['paidBy'],
//                         'amount': splitAmount,
//                         'owsBy': mem,
//                         'transactionTotalAmt': exp.amount,
//                         'transactionOwner': exp['paidBy']
//                     }
//                     if (primaryTransaction) {
//                         obj.primaryTransaction = primaryTransaction;
//                     }

//                     shares.push(obj);
//                     primaryTransaction = false;
//                 }
//             })
//         });

//         // changes for calculating total group expenses
//         const aggragateGpTtlQuery = [];
//         if (groupId) {
//             let filterByGroupId = {
//                 "$match": {
//                     groupId: groupId
//                 }
//             }
//             aggragateGpTtlQuery.push(filterByGroupId);
//         }

//         aggragateGpTtlQuery.push({ $group: { _id: null, groupTotalExpense: { $sum: "$amount" } } });



//         const groupTotalExpense: groupTotalExpenseModel[] = await Expense.aggregate(aggragateGpTtlQuery);
//         const expenseSummary: expenseSummaryModel = {
//             shares: [],
//             groupTotalExpense: [],
//             memShares: [],
//         };
//         expenseSummary.shares = shares;
//         expenseSummary.groupTotalExpense = groupTotalExpense;


//         // changes to calculate individual shares
//         let _memShares = memberList.map((mem: memebersModel, i) => {
//             console.log("expenseList", expenseList);
//             type accModel = {
//                 owsBy?: string,
//                 amount: { [key: string]: number; },
//                 totalExpenseByMember: number,
//                 member: memebersModel
//             }
//             // TODO: acc: accModel
//             return shares && shares.length > 0 && shares.reduce((acc: any, ele: sharesModel) => {
//                 if (ele['owsBy'] == mem.value) {
//                     acc['owsBy'] = mem['value'];
//                     let keyOwsTo = ele['owsTo'];
//                     if (acc?.amount?.[keyOwsTo]) {
//                         acc.amount[keyOwsTo] = acc?.amount?.[keyOwsTo] + ele['amount'];

//                     } else {
//                         acc.amount[keyOwsTo] = ele['amount'];

//                     }

//                 }

//                 // total expense by individual
//                 if (ele['owsTo'] == mem['value']) {
//                     acc.totalExpenseByMember = ((ele['primaryTransaction'] && ele['transactionTotalAmt']) ? ele['transactionTotalAmt'] : 0)
//                         + (acc?.totalExpenseByMember ? acc.totalExpenseByMember : 0);
//                 }

//                 acc.member = mem;

//                 return acc
//             }, { amount: {} });


//         });
//         // TODO:
//         expenseSummary.memShares = _memShares as any;

//         return res.status(201).json(expenseSummary);
//     } else {
//         return res.status(201).json({});
//     }

// })


export {
    addExpenditure,
    getExpenditures,
    getExpenditureById,
    deleteExpenditure,
    deleteExpenditureById,
    // getExpenseSummary,
    getFutureExpenditures,
}