import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useLogout from "./useLogout";

const useGetConversations = () => {
  const [loading,setLoading] = useState(false)
  const [conversations,setConversations] = useState([]);
  const {logout} = useLogout()

  useEffect(()=>{
    const getConversation =  async()=>{
        setLoading(true);
        try {
            const res = await fetch('/api/users')
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }
            setConversations(data)
        } catch (error) {
            toast.error(error.message);
            logout()
        } finally {
            setLoading(false)
        }
    }
    getConversation()
  },[]);
  return {loading,conversations}
}

export default useGetConversations