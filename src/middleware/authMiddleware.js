import jwt from "jsonwebtoken";

export default async function (req, res, next) {
    const bearerToken = req.headers["authorization"]

    if (bearerToken) {
        const token = bearerToken.split(' ')[1]

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    console.log(err);
                }

                req.user = payload
            })

            next()
        } catch (err) {
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
