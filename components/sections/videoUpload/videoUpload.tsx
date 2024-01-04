import { useState } from "react";
import AddProject from "@/services/addProject";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import User from "@/services/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user-slice";

const CustomTextEditor = dynamic(() => import("./CustomTextEditor"), {
  ssr: false,
});

const VideoForm = () => {
  const { user } = useAppSelector((state) => state.userReducer.value);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = Cookie.get("token");

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

  const handleGetUser = async () => {
    try {
      const data = await User.getUser(token);
      if (data?.status === 200) {
        dispatch(setUser(data.user));
      } else {
        toast.error("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user?.subscriptionId?.subscriptionId &&
      user?.subscriptionId?.noOfVideosRemaining <= 0
    ) {
      toast.error("Please upgrade your plan... Redirecting to pricing page");
      setTimeout(() => {
        router.push("/pricing");
      }, 3000);
    } else if (
      user?.subscriptionId?.subscriptionId &&
      user?.subscriptionId?.paymentStatus === "approved" &&
      user?.subscriptionId?.noOfVideosRemaining > 0
    ) {
      try {
        if (title && link && descriptionContent) {
          const data = await AddProject.postAddProject(
            token,
            title,
            link,
            descriptionContent,
            user?.id
          );
          if (data.status === 200) {
            setTitle("");
            setLink("");
            setDescriptionContent("");
            setEditorHtml("");
            toast.success("Project has been added");
            handleGetUser();
          }
        } else {
          toast.error("Fields can't be empty");
        }
      } catch (error) {
        toast.error("Project can't be added");
        console.error("Error:", error);
      }
    } else {
      toast.error(
        "Please get subscribe first to upload a video... Redirecting to pricing page"
      );
      setTimeout(() => {
        router.push("/pricing");
      }, 3000);
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-4xl font-bold mb-8 text-white">Video Upload</h2>
      <form className="bg-transparent text-white" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-1">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 bg-[#212121] border-[#2f2f2f] rounded-md p-2 w-full focus:outline-none"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-white mb-1">
            Link:
          </label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border-2 bg-[#212121] border-[#2f2f2f] rounded-md p-2 w-full focus:outline-none"
            placeholder="Enter video link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-1">
            Description:
          </label>
          <div className="  rounded-md">
            <CustomTextEditor
              editorHtml={editorHtml}
              setEditorHtml={setEditorHtml}
              setDescriptionContent={setDescriptionContent}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-[300px] bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
