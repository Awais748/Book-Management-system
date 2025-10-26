import express from "express";
import {
  allBook,
  bookById,
  createBook,
  deleteBook,
  updateBook,
} from "../controller/controller.js"; 
const router = express.Router();

router.post("/addBook", createBook);
router.get("/booklists", allBook);
router.get("/:id", bookById);
router.put("/updatebook/:id", updateBook);
router.delete("/deletebook/:id", deleteBook);

export default router;
