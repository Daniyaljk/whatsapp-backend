import ConversationModel from "../models/conversation-model.js";
import UserModel from "../models/user-model.js";
import {populate} from "dotenv";

export const doesConversationExist = async (senderId, receiverId) => {
    let convos = await ConversationModel.find({
        isGroup: false,
        $and: [
            {users: {$elemMatch: {$eq: senderId}}},
            {users: {$elemMatch: {$eq: receiverId}}}
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");


    //populate message model
    convos = await UserModel.populate(convos, {
        path: "latestMessage.sender",
        select: "name email picture status"
    })

    return convos[0]
}


export const populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
    return ConversationModel.findOne({_id: id}).populate(
        fieldToPopulate,
        fieldsToRemove
    );
}


export const getUserConversations = async (user_id)=>{
    let conversations;

    await ConversationModel.find({
        users : {$elemMatch : {$eq : user_id}},
    })
        .populate('users','-password')
        .populate('admin','-password')
        .populate('latestMessage')
        .sort({updateAt:-1})
        .then(async (results)=>{
            results = await UserModel.populate(results,{
                path : "latestMessage.sender",
                select : "name email picture status"
            })

            conversations = results;
        })


    return conversations;
}
