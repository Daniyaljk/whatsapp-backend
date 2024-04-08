import MessageModel from "../models/message-model.js";
import {getConversationMessage, populateMessage, update_latest_message} from "../services/message.service.js";


export const sendMessage = async (req,res)=>{

    try{
        const user_id = req.user.userId

        const {message,con_id,files} = req.body;


        if (!con_id || (!message && !files)){
            res.status(400).json({
                message : "invalid data passed into request."
            })
        }



        const message_data = {
            sender : user_id,
            message,
            conversation : con_id,
            files : files || [],
        }



        const newMessage = await MessageModel.create(message_data);


        if (newMessage){
            let populatedMessage = await populateMessage(newMessage._id);
            await update_latest_message(con_id,newMessage)

            res.status(201).json(populatedMessage)
        }else{
            res.status(401).json({
                message : "new message does not exist"
            })
        }

    }catch (err){
        res.status(401).json({err})
    }
}

export const getMessage = async (req,res)=>{
   try {
       const conId = req.params.con_id;

       if (!conId){
           res.status(400).json({
               message : "conversation id does not exist."
           })
       }

       const messages = await getConversationMessage(conId)

       res.status(201).json(messages);
   }catch (err){
       res.status(401).json({err})
   }
}
