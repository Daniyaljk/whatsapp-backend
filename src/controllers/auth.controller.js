import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import {generate_token, verifyToken} from "../services/token.service.js";



export const register = async (req,res)=>{

    try{
        const {name,email,picture,status,password} = req.body;

        const findUser = await UserModel.findOne({email})

        if (!findUser){
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password,salt)

            const user = await UserModel.create({ name,email,picture,status,password:hashedPassword });

            const access_token = await generate_token({userId : user._id},"1d",process.env.ACCESS_TOKEN_SECRET)

            const refresh_token = await generate_token({userId : user._id},"30d",process.env.REFRESH_TOKEN_SECRET)

            res.cookie("refresh_token",refresh_token,{
                httpOnly : true,
                path : "/api/v1/auth/refresh_token",
                maxAge : 30 * 24 * 60 * 60 * 1000, //30 days
            })

            res.status(201).json({
                message : "register success.",
                user :{
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    picture : user.picture,
                    status : user.status,
                    access_token,
                }
            })
        }else {
            res.status(500).json({message : "already user."})
        }

    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const login = async (req,res)=>{

    try{
        const {email,password} = req.body

        const findUser = await UserModel.findOne({email});

        if(findUser){
            const checkPass = await bcrypt.compare(password,findUser.password);

            if (checkPass){
                const access_token = await generate_token({userId : findUser._id},"1d",process.env.ACCESS_TOKEN_SECRET)

                const refresh_token = await generate_token({userId : findUser._id},"30d",process.env.REFRESH_TOKEN_SECRET)

                res.cookie("refresh_token",refresh_token,{
                    httpOnly : true,
                    path : "/api/v1/auth/refresh_token",
                    maxAge : 30 * 24 * 60 * 60 * 1000, //30 days
                })

                res.status(201).json({
                    message : "register success.",
                    user :{
                        _id : findUser._id,
                        name : findUser.name,
                        email : findUser.email,
                        picture : findUser.picture,
                        status : findUser.status,
                        access_token,
                    }
                })
            }else {
                res.status(401).json({
                    message : "password wrong"
                })
            }



        }else {
            res.status(500).json({
                message : "not exist user"
            })
        }

    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const logout = async (req,res)=>{
    try{
        res.clearCookie("refresh_token",{path : "/api/v1/auth/refresh_token"})

        res.json({
            message : "logged out !"
        })

    }catch (err){
        res.status(500).json({message : err.message})
    }
}

export const refreshToken = async (req,res)=>{
    try{
        const refresh_token = req.cookies["refresh_token"];

        if (refresh_token){
            const check = await verifyToken(refresh_token,process.env.REFRESH_TOKEN_SECRET);

            const user = await UserModel.findOne({_id : check.userId});

            const access_token = await generate_token({userId : user._id},"1d",process.env.ACCESS_TOKEN_SECRET)

            res.status(201).json({
                user :{
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    picture : user.picture,
                    status : user.status,
                    access_token,
                }
            })

        }else {
            res.status(401).json({
                message : "token doesn't exist"
            })
        }


    }catch (err){
        res.status(500).json({message : err.message})
    }
}
