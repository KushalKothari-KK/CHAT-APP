import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type: String,
        required:true
    },
    seen:{
        type:Boolean,
        default:false,
    },
    conversationId:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Conversation" 
    }
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema)

export default Message;