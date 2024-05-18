import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useSeenMessage = () => {
    const {socket} = useSocketContext();
    const { authUser } = useAuthContext();
    const {messages,selectedConversation,setMessages} = useConversation();
  
    useEffect(()=>{
        const lastMessageIsFromOtherUser = messages.length && messages[messages.length-1].senderId !== authUser?._id && !messages[messages.length-1]?.seen
        if(lastMessageIsFromOtherUser) {
        //trigger this when receiver see the message
        socket.emit("markMessageAsSeen",{
            conversationId:messages[messages.length-1]?.conversationId,
            senderId:selectedConversation._id,
        })
     }
    // //  this will work on sender side to check if receiver has seen the message
     socket.on("messagesSeen", ({senderId})=>{
        if(authUser?._id === senderId) {
            const newMessage = messages?.map((message)=>{
                if(!message.seen){
                    return {
                        ...message,
                        seen:true
                    }
                }
                return message
            })
            setMessages(newMessage)
        }

     })
    },[socket,authUser._id,messages,selectedConversation,setMessages])
}

export default useSeenMessage