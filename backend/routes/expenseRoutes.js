import express from 'express';
const expenseRoutes = express.Router();
import { addExpense, getExpenses, getExpenseById, deleteExpenseById, deleteExpense } from '../controllers/expenseController.js';

expenseRoutes.route('/').post(addExpense).get(getExpenses)
expenseRoutes.route('/:id').get(getExpenseById)
expenseRoutes.route('/delete/').get(deleteExpense)
expenseRoutes.route('/delete/:id').get(deleteExpenseById)


export default expenseRoutes