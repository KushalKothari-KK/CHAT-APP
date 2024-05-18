import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const messageSeenColor = message.seen ? "text-green-400" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName} z-0`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt='user avatar' />
        </div>
      </div>
      <div
        className={`flex items-center chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        <span>{message?.message}</span>
        {fromMe && <div className={`text-end ml-1 ${messageSeenColor} font-bold `}>
          <IoCheckmarkDoneSharp className='text-base text-center' />
        </div>}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
