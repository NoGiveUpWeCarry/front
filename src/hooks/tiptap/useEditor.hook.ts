import { useEditor } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

type UseCreateTiptapEditor = (
  setContent: React.Dispatch<React.SetStateAction<string>>
) => Editor | null;

export const useCreateTiptapEditor: UseCreateTiptapEditor = (setContent) =>
  useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
      Image,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'tiptap-editor prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // 에디터 내용 업데이트
    },
  });
