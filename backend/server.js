import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';


import memberRoutes from './routes/memberRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//GET POST  /api/members/
app.use('/api/members/', memberRoutes);


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('App is Running....')
})

app.listen(
    PORT,
    console.log(
        `Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);