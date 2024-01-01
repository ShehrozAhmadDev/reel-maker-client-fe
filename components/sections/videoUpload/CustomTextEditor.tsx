import React from "react";
import { EditorState, RawDraftContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface CustomTextEditorProps {
  editorState: EditorState;
  setEditorState: (index: EditorState) => void;
  setDescriptionContent: (index: RawDraftContentState) => void;
}

const CustomTextEditor = ({
  editorState,
  setEditorState,
  setDescriptionContent,
}: CustomTextEditorProps) => {
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    setDescriptionContent(convertToRaw(state.getCurrentContent()));
  };

  return (
    <div className="text-white max-h-[calc(100vh-340px)] overflow-y-auto">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
    </div>
  );
};

export default CustomTextEditor;
