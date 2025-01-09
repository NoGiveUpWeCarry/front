import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

export const useCreateTiptapEditor = () =>
  useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
      Image,
      Link.configure({
        openOnClick: false, // 기본 동작을 false로 설정
        linkOnPaste: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
      handleClick(view, pos, event) {
        const { href } = view.state.doc.nodeAt(pos)?.attrs || {};
        if (href) {
          window.open(href, '_blank'); // 새 창으로 열기
          return true; // 이벤트 처리 완료
        }
        return false; // 다른 기본 클릭 동작 유지
      },
    },
    content: '',
  });
