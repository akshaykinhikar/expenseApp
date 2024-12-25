import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';

import memberRoutes from './routes/memberRoutes';
import groupRoutes from './routes/groupRoutes';
import expenseRoutes from './routes/expenseRoutes';
import imageUploadRoutes from './routes/imageUploadRoutes';

dotenv.config();

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
console.log("-----------------------------------------")
console.log(process.env.BUCKET);
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(bodyParser.json());

app.use('/api/members/', memberRoutes);


app.use('/api/group/', groupRoutes);

app.use('/api/expense/', expenseRoutes);

app.use('/api/images', imageUploadRoutes);

const PORT = process.env.PORT || 5000;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'production') {
    if (process.env.NODE_ENV) {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/expense-app/build')));

    app.get('*', (req: any, res: any) =>
        res.sendFile(path.resolve(__dirname, 'expense-app', 'build', 'index.html')));
} else {
    app.get('/', (req: any, res: any) => {
        res.send('App is Running....')
    })

}
app.listen(
    PORT, ()=> {
        return console.log(`Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`);
    }
);
