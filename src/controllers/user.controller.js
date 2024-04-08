import {searchedUsers} from "../services/user.service.js";

export const searchUsers = async (req,res)=>{

    try {
        const keyword = req.query.search;

        if(!keyword){
            res.status(401).json({message : "keyword does not exist."})
        }

        const users = await searchedUsers(keyword);

        res.send(users)
    }catch (err){
        res.send("error")
    }

}
