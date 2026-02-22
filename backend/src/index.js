import express from "express";
import authRoutes from "./routes/auth.route.js"
import bcrypt from "bcryptjs"
import dotenv, { config }  from "dotenv"
import { connectDB } from "./lib/db.js";
const app = express();

dotenv.config()
const PORT = process.env.PORT

app.use("app/auth",authRoutes)

app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running in port "+ PORT);
    connectDB();
});

