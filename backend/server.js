import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';


import memberRoutes from './routes/memberRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import multer, { memoryStorage } from 'multer';
import { getUserPreSignedUrls, uploadToS3 } from './s3.mjs';

dotenv.config();

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

const storage = memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());

//GET POST  /api/members/
app.use('/api/members/', memberRoutes);


app.use('/api/group/', groupRoutes);

app.use('/api/expense/', expenseRoutes);

app.post('/api/images', upload.single('image'), (req, res) => {
    const { file } = req;
    const userId = req.headers["x-user-id"];

    console.log(file);
    console.log(userId);

    if (!file || !userId) return res.status(400).json({ message: "Bad request" });

    const { error, key } = uploadToS3({ file, userId });

    if (error) return res.status(500).json({ message: error.message })

    res.send({ message: 'Success' });
});
app.get('/api/images', async (req, res) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(400).json({ message: "Bad request" });
    console.log(userId)
    const { error, presignedUrls } = await getUserPreSignedUrls(userId);
    if (error) return res.status(500).json({ message: error.message })

    res.json(presignedUrls);

});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/expense-app/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'expense-app', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('App is Running....')
    })

}

app.listen(
    PORT,
    console.log(
        `Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);