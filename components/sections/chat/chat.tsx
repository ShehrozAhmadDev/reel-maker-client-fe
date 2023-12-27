import Image from "next/image";
import { useState } from "react";
import InputEmoji from "react-input-emoji";

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; time: string; image?: string }[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  const handleSendClick = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const newHours = hours % 12 || 12;

    const newMessage = {
      text: message,
      time: `${newHours}:${minutes.toString().padStart(2, "0")} ${ampm}`,
      image: imageURL,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setImageURL("");
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageURL(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="max-h-96 pr-5 overflow-y-auto">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200 rounded-md p-2 mb-2"
          >
            <span className="flex flex-col w-[90%] justify-start">
              {msg.image && (
                <Image
                  src={msg.image}
                  alt="Sent"
                  width={40}
                  height={40}
                  className="w-[50%] max-w-[70%] h-full max-h-72 object-fit rounded mt-2"
                />
              )}
              <p>{msg.text}</p>
            </span>
            <p className="text-xs text-gray-500">{msg.time}</p>
          </div>
        ))}
      </div>
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
