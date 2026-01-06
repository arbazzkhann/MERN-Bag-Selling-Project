import express from "express";
import cors from "cors";
// import "dotenv/config.js";
import path from "path";

import { connectDB } from "./config/db.js";
import bagRouter from "./routes/bag.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

//app config
const app = express();
const PORT = process.env.PORT || 5000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});


//api endpoints
app.use('/api/bag', bagRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


//static files - for localhost:
// app.use('/images', express.static('uploads')); //static images endpoint
// for vercel:
const __dirname = path.resolve();
app.use(
  "/images",
  express.static(path.join(__dirname, "backend/uploads"))
);


app.get("/", (req, res) => {
    res.send("API is working :)");
});

// not using app.listen because of vercel - serverless
// app.listen(PORT, (req, res) => {
//     console.log(`server is running on http://localhost:${PORT}`);
// });

export default app;