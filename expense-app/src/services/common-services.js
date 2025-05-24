import CONSTANTS from "../constants";

const ExpenseService = {
    getExpenses: async (data) => {
        const expenses = await fetch(CONSTANTS.GET_EXPENSES, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return expenses.json();
    },

    getMembers: async () => {
        const members = fetch(CONSTANTS.GET_MEMBERS, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        });
        return members;
    },

    getExpenseSummary: async(data) => {
        const expenseSummary = await fetch(CONSTANTS.EXPENSE_SUMMARY, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return expenseSummary.json();
    }
}

const ExpenditureService = {
    getExpenditures: async (data) => {
        const expenditures = await fetch(CONSTANTS.GET_EXPENDITURES, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return expenditures.json();
    },

    getFutureExpenditures: async (data) => {
        const expenditures = await fetch(CONSTANTS.GET_FUTURE_EXPENDITURES, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return expenditures.json();
    },

    getMembers: async () => {
        const members = fetch(CONSTANTS.GET_MEMBERS, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        });
        return members;
    },

    // getExpenseSummary: async(data) => {
    //     const expenseSummary = await fetch(CONSTANTS.EXPENSE_SUMMARY, {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data),
    //     })
    //     return expenseSummary.json();
    // }
}


export  {ExpenseService, ExpenditureService};