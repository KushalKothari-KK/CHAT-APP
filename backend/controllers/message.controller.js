import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId,receiverId]
            },
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // Socket IO functionality

        // await conversation.save();
        // await newMessage.save()

        // optimized approach this will run in parallel

        await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json(newMessage)
    } catch (err){
        console.error('Error in sendMessage controller',err.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async (req,res) =>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId,userToChatId]},
        }).populate("messages"); // Not reference but actual message

        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages

        res.status(200).json(messages)

    } catch (err) {
        console.error('Error in sendMessage controller',err.message);
        res.status(500).json({error:"Internal server error"})
    }
}