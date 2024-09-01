"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseRoutes = express_1.default.Router();
const expenseController_1 = require("../controllers/expenseController");
expenseRoutes.route('/').post(expenseController_1.addExpense);
expenseRoutes.route('/getExpenses').post(expenseController_1.getExpenses);
expenseRoutes.route('/:id').get(expenseController_1.getExpenseById);
expenseRoutes.route('/delete/').get(expenseController_1.deleteExpense);
expenseRoutes.route('/delete/:id').get(expenseController_1.deleteExpenseById);
expenseRoutes.route('/getExpenseSummary').post(expenseController_1.getExpenseSummary);
exports.default = expenseRoutes;
