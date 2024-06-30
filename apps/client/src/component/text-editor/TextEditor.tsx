import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useState } from "react";
import { plugins, toolbars } from "~/component/text-editor/config";

export interface TextEditorProps {
  editorValue: string;
  handleChange: (value: string) => void;
}

export const TextEditor = ({ editorValue, handleChange }: TextEditorProps) => {
  const [, setText] = useState("");

  const onEditorInputChange = (newValue: string, editor: TinyMCEEditor) => {
    setText(editor.getContent({ format: "text" }));
    handleChange(newValue);
  };

  return (
    <Editor
      apiKey={import.meta.env.VITE_EDITOR_API_KEY}
      onEditorChange={(newValue, editor) =>
        onEditorInputChange(newValue, editor)
      }
      onInit={(_e, editor) => setText(editor.getContent({ format: "text" }))}
      value={editorValue}
      init={{
        plugins: plugins,
        toolbar: toolbars,
        placeholder: "Write you thoughts here..",
      }}
    />
  );
};
