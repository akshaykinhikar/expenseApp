import CONSTANTS from "../constants";

const ExpenseService = {
    getExpenses: async () => {
        const expenses = await fetch(CONSTANTS.GET_EXPENSES, {
            method: 'GET',
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
    }


}


export default ExpenseService;