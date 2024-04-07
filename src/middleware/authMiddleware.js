import jwt from "jsonwebtoken";

export default async function (req, res) {
    const bearerToken = req.headers["authorization"]

    if (bearerToken) {
        const token = bearerToken.split(' ')[1]

       try{
           const test = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

           console.log(req.user)
           res.status(201).json({
               message: "auth middleware"
           })
       }catch (err){
           res.status(401).json({
               message: "dont match token"
           })
       }

    } else {
        res.status(401).json({
            message: "does not authorization"
        })
    }


}
