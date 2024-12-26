import mongoose from "mongoose";

const connectDB = async () => {

    try {
        console.log("Connecting to MongoDB")
        const URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : 'mongodb://localhost:27017/expense-app';
        const conn = await mongoose.connect(URL as string, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error: any) {
        console.log("Error: mongoConnect Error");
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export {connectDB} ;