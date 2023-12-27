import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import InputEmoji from "react-input-emoji";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Cookie from "js-cookie";
import moment from "moment";
import useChat from "@/hooks/chat/useChat";

const Chat = () => {
  const {
    loading,
    message,
    messages,
    user,
    scrollRef,
    setMessage,
    handleSendClick,
    handleImageChange,
  } = useChat();

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="h-[calc(100vh-180px)] pr-5 overflow-y-auto">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex justify-between items-center w-full ${
                msg.senderId === user?.id ? "flex-row" : "flex-row-reverse"
              }  ${
                msg.senderId === user?.id ? `bg-purple-500` : `bg-gray-200`
              }  rounded-md p-2 py-4 mb-2`}
              ref={scrollRef}
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
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
