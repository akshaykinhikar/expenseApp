"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
// const dbConfig = require('./config/db');
// import memberRoutes from './routes/memberRoutes';
// import groupRoutes from './routes/groupRoutes';
// import expenseRoutes from './routes/expenseRoutes';
// import imageUploadRoutes from './routes/imageUploadRoutes';
const memberRoutes = require('./routes/memberRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const imageUploadRoutes = require('./routes/imageUploadRoutes');
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
console.log("-----------------------------------------");
console.log(process.env.BUCKET);
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
//GET POST  /api/members/
app.use('/api/members/', memberRoutes.memberRoutes);
app.use('/api/group/', groupRoutes.groupRoutes);
app.use('/api/expense/', expenseRoutes.expenseRoutes);
app.use('/api/images', imageUploadRoutes.imageUploadRoutes);
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, '/expense-app/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'expense-app', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('App is Running....');
    });
}
app.listen(PORT);
// app.listen(
//     PORT,
//     console.log(
//         `Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`
//     )
// );
