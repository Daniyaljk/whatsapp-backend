import express from "express";
import {create_open_conversation, get_conversations} from "../controllers/conversation.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();


router.post("/",authMiddleware,create_open_conversation)
router.get("/",authMiddleware,get_conversations)

export default router;
