import UserModel from "../models/user-model.js";

export const findUser = (id)=>{
    return UserModel.findOne({_id: id});
}

export const searchedUsers = async (keyword)=>{
    return UserModel.find({
        $or: [
            {name: {$regex: keyword, $options: "i"}},
            {email: {$regex: keyword, $options: "i"}}
        ]
    });
}
