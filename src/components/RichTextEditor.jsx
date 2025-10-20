import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEditor({ value = "<p>ابدأ الكتابة هنا...</p>", dir, align = "left", onChange }) {
  const [currentBlock, setCurrentBlock] = useState("paragraph");
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: align,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "<p>ابدأ الكتابة هنا...</p>",
    editorProps: {
      attributes: {
        dir: dir,
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4 text-gray-800",
      },
    },
    onUpdate: ({ editor }) => {
      // كل مرة المستخدم يكتب أو يغير حاجة، نبعت التحديث للـ parent
      if (onChange) {
        onChange(editor.getHTML());
      }

      const heading = editor.getAttributes("heading").level;
      setCurrentBlock(heading ? `heading-${heading}` : "paragraph");

      setFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        align:
          editor.getAttributes("paragraph").textAlign ||
          editor.getAttributes("heading").textAlign ||
          "left",
      });
    },
  });

  // ✅ لو الداتا اتغيرت بعد التحميل، نحدّث محتوى الـ editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 rounded-t-xl">
        {["left", "center", "right"].map((a) => (
          <button
            key={a}
            onClick={() => editor.chain().focus().setTextAlign(a).run()}
            className={`px-2 py-1 text-sm rounded-md ${
              formats.align === a ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {a[0].toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm rounded-md ${
            formats.bold ? "bg-gray-200 font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm rounded-md ${
            formats.italic ? "bg-gray-200 italic" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 text-sm rounded-md ${
            formats.underline ? "bg-gray-200 underline" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 text-sm rounded-md ${
            currentBlock === "heading-1" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 text-sm rounded-md ${
            currentBlock === "heading-2" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 text-sm rounded-md ${
            currentBlock === "heading-3" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          H3
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-2 py-1 text-sm rounded-md ${
            currentBlock === "paragraph" ? "bg-gray-200" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          P
        </button>
      </div>

      <EditorContent editor={editor} className="w-full" />
    </div>
  );
}
