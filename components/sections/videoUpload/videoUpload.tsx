import { useState } from "react";
import AddProject from "@/services/addProject";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useAppSelector } from "@/redux/store";
import CustomTextEditor from "./CustomTextEditor";

const VideoForm = () => {
  const { user } = useAppSelector((state) => state.userReducer.value);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookie.get("token");

    try {
      if (title && link && descriptionContent) {
        await AddProject.postAddProject(
          token,
          title,
          link,
          descriptionContent,
          user?.id
        );
        setTitle("");
        setLink("");
        setDescriptionContent("");
        setEditorHtml("");
        toast.success("Project has been added");
      } else {
        toast.error("Fields can't be empty");
      }
    } catch (error) {
      toast.error("Project can't be added");
      console.error("Error:", error);
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-4xl font-bold mb-8 text-white">Video Upload</h2>
      <form className="bg-transparent" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-1">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-full"
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
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter video link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-1">
            Description:
          </label>
          <div className="border-2 border-gray-300 rounded-md">
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
