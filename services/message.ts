import { IMessage } from "@/types/type";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Message = {
  getConversationMessages: async (conversationId: string, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return await axios.get(
        `${baseUrl}/message/${conversationId}`,
        config
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  sendMessage: async (message: IMessage, token?: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return await axios.post(
        `${baseUrl}/message`,
        message,
        config
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
};

export default Message;
