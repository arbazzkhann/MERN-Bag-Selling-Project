import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import bagRouter from "./routes/bag.route.js";


//app config
const app = express();
const PORT = 5000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use('/api/bag', bagRouter);
app.use('/images', express.static('uploads'));


app.get("/", (req, res) => {
    res.send("API is working :)");
});

app.listen(PORT, (req, res) => {
    console.log(`server is running on http://localhost:${PORT}`);
});