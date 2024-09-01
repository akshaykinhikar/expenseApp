import express from 'express';
const expenseRoutes = express.Router();
import { addExpense, getExpenses, getExpenseById, deleteExpenseById, deleteExpense, getExpenseSummary } from '../controllers/expenseController';

expenseRoutes.route('/').post(addExpense)
expenseRoutes.route('/getExpenses').post(getExpenses)
expenseRoutes.route('/:id').get(getExpenseById)
expenseRoutes.route('/delete/').get(deleteExpense)
expenseRoutes.route('/delete/:id').get(deleteExpenseById)
expenseRoutes.route('/getExpenseSummary').post(getExpenseSummary);


export default expenseRoutes