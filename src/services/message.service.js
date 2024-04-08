import MessageModel from "../models/message-model.js";
import ConversationModel from "../models/conversation-model.js";


export const populateMessage = async (id)=>{

    let msg = await MessageModel.findById(id)
        .populate({
            path : "sender",
            select : "name picture",
            model : "UserModel"
        })
        .populate({
            path : "conversation",
            select : "name isGroup users",
            model : "ConversationModel",
            populate : {
                path : "users",
                select : "name email picture status",
                model : "UserModel",
            }
        })

    if (!msg) console.log("message does not exist.")

    return msg;
}

export const update_latest_message = async (con_id,msg)=>{
    const update_con = await ConversationModel.findByIdAndUpdate(con_id,{
        latestMessage : msg
    });

    if (!update_con) console.log("update con does not exist")

    return update_con;

}

export const getConversationMessage = async (conId)=>{
    const message = await MessageModel.find({conversation : conId})
        .populate("sender","name picture email status")
        .populate("conversation");

    if (!message) console.log("message does not exist");

    return message;
}
