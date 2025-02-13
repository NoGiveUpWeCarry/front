import { MenuItem } from '@/constants/BubbleMenuItems';
import { H1Icon, H2Icon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ListBulletIcon,
  CodeBracketIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import { Editor } from '@tiptap/core';

export const createFloatingMenuItems = (
  uploadImageHandler: (file: File, editor: Editor) => void
): MenuItem[] => [
  {
    label: '제목1',
    icon: H1Icon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    label: '제목2',
    icon: H2Icon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    label: '글머리 기호',
    icon: ListBulletIcon,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
  },
  {
    label: '번호 매기기',
    icon: CheckCircleIcon,
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
  },
  {
    label: '코드 블록',
    icon: CodeBracketIcon,
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive('codeBlock'),
  },
  {
    label: '이미지',
    icon: PhotoIcon,
    action: (editor: Editor) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const resizedFile = await resizeImage(file, 400, 400);
          uploadImageHandler(resizedFile, editor);
        }
      };

      input.click();
    },
    isActive: () => false,
  },
];

const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          }
        }, file.type);
      };
    };
  });
};
