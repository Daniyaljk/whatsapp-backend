import jwt from "jsonwebtoken"

export const sign = async (payload, expiresIn, secret) => {

    return jwt.sign(payload, secret, {
        expiresIn
    })
}

export const verify = async (token,secret)=>{
    return jwt.verify(token,secret)
}
