// @ts-ignore
import express from 'express';
const expenditureRoutes = express.Router();
import { addExpenditure, getExpenditures, getExpenditureById, deleteExpenditureById, deleteExpenditure, getFutureExpenditures } from '../controllers/expenditureController';

expenditureRoutes.route('/').post(addExpenditure)
expenditureRoutes.route('/getExpenditures').post(getExpenditures)
expenditureRoutes.route('/getFutureExpenditures').post(getFutureExpenditures)
expenditureRoutes.route('/:id').get(getExpenditureById)
expenditureRoutes.route('/delete/').get(deleteExpenditure)
expenditureRoutes.route('/delete/:id').get(deleteExpenditureById)
// expenditureRoutes.route('/getExpenditureummary').post(getExpenditureummary);


export default expenditureRoutes