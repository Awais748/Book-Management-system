import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./Routes/book.routes.js"

dotenv.config();
const app = express();

// database
connectDB();

// middleware

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books" , bookRoutes)

app.use("/", (req, res) => {
  res.send("Hellow from MANGO DB");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Sever is runnig on http://localhost:${PORT}`);
});
