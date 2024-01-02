import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  editorHtml: string;
  setEditorHtml: (index: string) => void;
  setDescriptionContent: (index: string) => void;
}

const CustomTextEditor = ({
  editorHtml,
  setEditorHtml,
  setDescriptionContent,
}: RichTextEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleChange = (content: string) => {
    setEditorHtml(content);
    setDescriptionContent && setDescriptionContent(content);
  };

  return (
    <div className="text-white max-h-[calc(100vh-420px)] overflow-y-auto ">
      <ReactQuill
        theme="snow"
        className={"ql-border placeholder:text-white"}
        modules={modules}
        formats={formats}
        value={editorHtml}
        onChange={handleChange}
        placeholder="Type Here..."
      />
    </div>
  );
};

export default CustomTextEditor;
