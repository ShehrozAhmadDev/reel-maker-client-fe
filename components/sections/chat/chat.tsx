import Image from "next/image";
import InputEmoji from "react-input-emoji";
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
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Chat</h2>
      <div className="bg-transparent border border-white/[.20] rounded-lg shadow-md">
        {loading ? (
          <p className="text-white font-bold my-2">Loading....</p>
        ) : (
          <div className="h-[calc(100vh-190px)] overflow-y-auto p-4 ">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.senderId === user?.id ? "flex-row" : "flex-row-reverse"
                }   mb-2`}
                ref={scrollRef}
              >
                <div
                  className={`flex flex-col w-[450px] ${
                    msg.senderId === user?.id ? `bg-purple-500` : `bg-gray-200`
                  }  rounded-md p-2 `}
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
                        msg.senderId === user?.id
                          ? "text-white"
                          : "text-black/[.80]"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </span>
                  <p
                    className={`text-xs text-end ${
                      msg.senderId === user?.id
                        ? "text-white/[.70]"
                        : "text-gray-500"
                    }`}
                  >
                    {moment(msg.createdAt).format("DD-MM-YY hh:mm A")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4">
          <div
            tabIndex={0}
            className="flex items-center bg-white/[.60] rounded-lg p-1"
          >
            <InputEmoji
              value={message}
              onChange={setMessage}
              cleanOnEnter
              onEnter={handleSendClick}
              placeholder="Type a message..."
            />
            <label htmlFor="imageUpload" className="cursor-pointer mr-2">
              <p className="text-2xl flex items-center justify-center border-gray-500 text-gray-500 border-2 rounded-full w-6 h-6">
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
      </div>
    </div>
  );
};

export default Chat;
