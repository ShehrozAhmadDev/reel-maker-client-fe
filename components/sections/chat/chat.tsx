import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Cookie from "js-cookie";
import moment from "moment";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

const Chat = () => {
  const [messages, setMessages] = useState<IArrvalMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const socket = useRef<Socket>(io("ws://localhost:4000"));
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<IArrvalMessage | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer.value);
  const handleSendClick = async () => {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const sendMessage = {
      senderId: user && user.id,
      text: message,
      conversationId: currentChat && currentChat._id,
    };
    const receiverId =
      user &&
      currentChat &&
      currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user && user.id,
      receiverId,
      text: message,
    });
    try {
      const res = await axios.post(`${baseUrl}/message`, sendMessage, config);
      setMessages([...messages, res.data]);
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
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (user) socket.current.emit("addUser", user.id);
  }, [user]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: new Date().toISOString(),
      });
    });
  }, []);

  useEffect(() => {
    const getConversationWithAdmin = async () => {
      try {
        setLoading(true);
        const token = Cookie.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (user) {
          const res = await axios.get(
            `${baseUrl}/conversation/${user.id}`,
            config
          );
          if (res.data.length > 0) {
            setCurrentChat(res.data[0]);
            setLoading(false);
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
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (currentChat?._id) {
          const res = await axios.get(
            baseUrl + "/message/" + currentChat?._id,
            config
          );
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="max-h-96 pr-5 overflow-y-auto">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex justify-between items-center w-full ${
                msg.senderId === user?.id ? "flex-row" : "flex-row-reverse"
              }  ${
                msg.senderId === user?.id ? `bg-purple-500` : `bg-gray-200`
              }  rounded-md p-2 py-4 mb-2`}
            >
              <span className="flex flex-col w-fit justify-start">
                {msg.image && (
                  <Image
                    src={msg.image}
                    alt="Sent"
                    width={40}
                    height={40}
                    className="w-[50%] max-w-[70%] h-full max-h-72 object-fit rounded mt-2"
                  />
                )}
                <p
                  className={`w-fit ${
                    msg.senderId === user?.id ? "text-white" : "text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </span>
              <p
                className={`text-xs ${
                  msg.senderId === user?.id ? "text-white" : "text-gray-500"
                }`}
              >
                {moment(msg.createdAt).format("DD-MM-YY HH:mm")}
              </p>
            </div>
          ))}
        </div>
      )}
      <div tabIndex={0} className="flex relative">
        <InputEmoji
          value={message}
          onChange={setMessage}
          cleanOnEnter
          onEnter={handleSendClick}
          placeholder="Type a message..."
        />
        <label
          htmlFor="imageUpload"
          className="cursor-pointer absolute right-32 top-3.5 z-10"
        >
          <p className="text-2xl flex items-center justify-center border-gray-400 text-gray-400 border-2 rounded-full w-6 h-6">
            +
          </p>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
        <button
          onClick={handleSendClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
