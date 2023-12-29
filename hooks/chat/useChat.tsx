import { useAppSelector } from "@/redux/store";
import React, { useRef, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import Cookie from "js-cookie";
import Conversation from "@/services/conversation";
import Message from "@/services/message";
import { IMessage } from "@/types/type";

interface IConversation {
  members: string[];
  _id: string;
}

interface IArrvalMessage {
  senderId: string;
  text: string;
  createdAt: string | number;
  image?: string;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:4000";

const useChat = () => {
  const [messages, setMessages] = useState<IArrvalMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<IArrvalMessage | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer.value);
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSendClick = async () => {
    if (message.length <= 0) return;
    const token = Cookie.get("token");
    const sendMessage: IMessage = {
      senderId: user && user.id,
      text: message,
      conversationId: currentChat && currentChat._id,
    };
    const receiverId =
      user &&
      currentChat &&
      currentChat.members.find((member) => member !== user.id);
    socket?.emit("sendMessage", {
      senderId: user && user.id,
      receiverId,
      text: message,
    });

    try {
      const data = await Message.sendMessage(sendMessage, token);
      setMessages([...messages, data]);
      setMessage("");
      setImageURL("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageURL(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      socket?.emit("addUser", user.id);
    }
  }, [user, socket]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: new Date().toISOString(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const getConversationWithAdmin = async () => {
      try {
        setLoading(true);
        const token = Cookie.get("token");

        if (user) {
          const data = await Conversation.getUserConversation(user.id, token);
          if (data.length > 0) {
            setCurrentChat(data[0]);
          } else if (data.length === 0 && !currentChat) {
            const newConversation = await Conversation.createNewConversation(
              user.id,
              token
            );
            setCurrentChat(newConversation?.conversation);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversationWithAdmin();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = Cookie.get("token");
        if (currentChat?._id) {
          const data = await Message.getConversationMessages(
            currentChat?._id,
            token
          );
          setMessages(data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    loading,
    message,
    messages,
    user,
    scrollRef,
    setMessage,
    handleSendClick,
    handleImageChange,
  };
};

export default useChat;
