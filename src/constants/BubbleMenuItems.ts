import { Editor } from '@tiptap/core';
import {
  LinkIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
} from '@heroicons/react/24/outline';

export interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

const BubbleMenuItems: MenuItem[] = [
  {
    label: '굵게',
    icon: BoldIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive('bold'),
  },
  {
    label: '기울임꼴',
    icon: ItalicIcon,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive('italic'),
  },
  {
    label: '취소선',
    icon: StrikethroughIcon,
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
  },
  {
    label: '링크',
    icon: LinkIcon,
    action: (editor: Editor) => {
      const previousUrl = editor.getAttributes('link').href;
      const url = prompt('링크 URL을 입력하세요:', previousUrl || 'https://');
      if (url === null) {
        return;
      }
      if (url === '') {
        editor.chain().focus().unsetLink().run();
        return;
      }
      editor.chain().focus().setLink({ href: url }).run();
    },
    isActive: (editor: Editor) => editor.isActive('link'),
  },
];

export default BubbleMenuItems;
