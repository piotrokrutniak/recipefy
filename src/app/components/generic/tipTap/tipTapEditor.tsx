// src/Tiptap.jsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { FaRedo, FaUndo } from "react-icons/fa";

// define your extension array
const extensions = [StarterKit];

async function GetText(editor: Editor, setValue: any, index: number) {
  const text = editor?.getHTML();
  setValue(text, index);
}

export default function Tiptap({
  setValue,
  defaultValue,
  className,
  index = -1
}: {
  setValue: any;
  defaultValue?: string;
  className?: string;
  index?: number;
}) {
  const [focused, setFocused] = useState(false);
  const content = defaultValue || "<p></p>";

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert h-full prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none"
      }
    }
  });

  return (
    <div className={`${className} h-80 rounded-lg mt-5 overflow-hidden`}>
      {editor && (
        <>
          <EditorContent
            className="bg-slate-500/40 overflow-y-auto h-full focus-within:bg-slate-500/50 transition-all p-5 rounded-lg relative"
            onBlur={() => {
              GetText(editor, setValue, index);
              setFocused(false);
            }}
            onFocus={() => setFocused(true)}
            editor={editor}
          >
            {editor?.getText() == "" && !focused && (
              <div className="absolute top-0 select-none opacity-60 pt-5">Start typing...</div>
            )}
          </EditorContent>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bg-slate-800/80 text-black p-2 rounded-md flex gap-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${editor.isActive("bold") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 font-bold p-2 rounded leading-3`}
              >
                A
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${editor.isActive("italic") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8  italic font-medium p-2 rounded leading-3`}
              >
                A
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`${editor.isActive("strike") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
              >
                A
              </button>

              <button
                className={`${editor.isActive("strike") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                <FaUndo />
              </button>
              <button
                className={`${editor.isActive("strike") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                <FaRedo />
              </button>
              <button
                className={`${editor.isActive("h1") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                H1
              </button>
              <button
                className={`${editor.isActive("bullet") ? "bg-slate-50" : "bg-slate-50/40 text-white"} h-8 w-8 line-through font-medium p-2 rounded leading-3`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                ul
              </button>
            </div>
          </BubbleMenu>
        </>
      )}
    </div>
  );
}
