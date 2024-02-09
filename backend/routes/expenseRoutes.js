import express from 'express';
const expenseRoutes = express.Router();
import { addExpense, getExpenses, getExpenseById } from '../controllers/expenseController.js';

expenseRoutes.route('/').post(addExpense).get(getExpenses)
expenseRoutes.route('/:id').get(getExpenseById)


export default expenseRoutes