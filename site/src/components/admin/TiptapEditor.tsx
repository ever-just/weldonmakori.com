"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      ImageExt,
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none prose-headings:font-light prose-p:text-white/50 prose-a:text-white/60 prose-strong:text-white/70 prose-blockquote:border-white/10 prose-blockquote:text-white/40 prose-code:text-white/60",
      },
    },
  });

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-1.5 rounded-sm transition-colors ${
      active ? "bg-white/15 text-white/70" : "text-white/30 hover:text-white/60 hover:bg-white/[0.06]"
    }`;

  const addLink = () => {
    const url = prompt("URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt("Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-white/10 rounded-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-white/[0.06] bg-white/[0.02]">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}>
          <Bold className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}>
          <Italic className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive("strike"))}>
          <Strikethrough className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive("heading", { level: 1 }))}>
          <Heading1 className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}>
          <Heading2 className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))}>
          <Heading3 className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}>
          <List className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}>
          <ListOrdered className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))}>
          <Quote className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive("codeBlock"))}>
          <Code className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)}>
          <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button type="button" onClick={addLink} className={btnClass(editor.isActive("link"))}>
          <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={addImage} className={btnClass(false)}>
          <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)}>
          <Undo className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)}>
          <Redo className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
