import mongoose from 'mongoose';
import { DataBaseName } from '../../constant.js';


export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}${DataBaseName}`);
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(`MONGODB connection error:`,error);
    }
}