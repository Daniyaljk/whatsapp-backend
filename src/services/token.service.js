import {sign, verify} from "../utils/token.util.js";

export const generate_token = async (payload,expiresIn,secret)=>{
    return await sign(payload, expiresIn, secret)
}

export const verifyToken = async (token,secret)=>{
    return await verify(token, secret)
}
