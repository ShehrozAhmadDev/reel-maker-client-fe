import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Conversation = {
  getUserConversation: async (userId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return await axios.get(
        `${baseUrl}/conversation/${userId}`,
        config
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  createNewConversation: async (userId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const body = {
        senderId: userId,
        receiverId: "658bf667f5a854fe616789d5"
    }
    return await axios.post(
        `${baseUrl}/conversation/`,
        body,
        config
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
};

export default Conversation;
