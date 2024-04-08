import {doesConversationExist, getUserConversations, populateConversation} from "../services/conversation.service.js";
import {findUser} from "../services/user.service.js";
import ConversationModel from "../models/conversation-model.js";


export const create_open_conversation = async (req,res)=>{

    try{
        const sender_id = req.user.userId;

        const {receiver_id} = req.body;

        if (!receiver_id){
            res.status(502).json({
                message : "receiver_id doesn't exist"
            })
        }

        const existed_conversation = await doesConversationExist(sender_id,receiver_id)

        if (existed_conversation){
            res.status(201).json({
                existed_conversation,
            })
        }else {

            let receiver_user =await findUser(receiver_id);
            let con_data = {
                name : receiver_user.name,
                picture : receiver_user.picture,
                isGroup : false,
                users : [sender_id,receiver_id]
            }
            const newCon = await ConversationModel.create(con_data)
            const populatedCon = await populateConversation(
                newCon._id,
                "users",
                "-password"
            )

            res.status(201).json({
                populatedCon
            })
        }

    }catch (err){
        res.status(502).json({
            message : "something error!"
        })
    }
}


export const get_conversations = async (req,res)=>{

    try{

        const user_id = req.user.userId;
        const conversations = await getUserConversations(user_id);



        res.status(200).json({
            conversations
        })

    }catch (err){
        res.status(401).json({
            message : "get conversation went wrong."
        })
    }
}
