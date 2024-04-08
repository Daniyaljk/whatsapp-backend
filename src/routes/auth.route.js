import express from "express";

import {register,login,logout,refreshToken} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refresh_token",refreshToken)
router.get("/testing_auth_middleware",authMiddleware,(req,res)=>{
    res.status(201).json({
        message: "auth middleware"
    })
})

export default router;
