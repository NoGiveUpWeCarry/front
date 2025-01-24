import { uploadImage } from '@/apis/feed';
import {
  mergeAttributes,
  Node,
  nodeInputRule,
  CommandProps,
} from '@tiptap/core';

// RawCommands 확장: setImage 및 uploadImage 추가
declare module '@tiptap/core' {
  interface Commands {
    setImage: (options: {
      src: string;
      alt?: string;
      title?: string;
    }) => boolean;
    uploadImage: (file: File) => Promise<void>;
  }
}

export const EnhancedImage = Node.create({
  name: 'image',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      uploadImage:
        (file: File) =>
        async ({ commands }: CommandProps) => {
          try {
            // File 객체를 FormData로 변환
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadImage(formData);
            commands.insertContent({
              type: this.name,
              attrs: { src: response.imageUrl },
            });
          } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
          }
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;
          return { src, alt, title };
        },
      }),
    ];
  },
});
