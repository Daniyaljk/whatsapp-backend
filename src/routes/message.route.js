import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {getMessage, sendMessage} from "../controllers/message.controller.js";



const router = express.Router();

router.post("/",authMiddleware,sendMessage)
router.get("/:con_id",authMiddleware,getMessage)


export default router;
