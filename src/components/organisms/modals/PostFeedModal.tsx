import InputDropdown from '@/components/molecules/InputDropdown';
import Modal2 from '@/components/molecules/Modal';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import useFeedStore from '@/store/postFeedStore';
import { usePostFeed } from '@/hooks/queries/feed.query';
import { date } from '@/utils/date';
import { useState } from 'react';

interface PostFeedModalProps {
  onClose: () => void;
}

const PostFeedModal = ({ onClose }: PostFeedModalProps) => {
  const title = useFeedStore((state) => state.title);
  const content = useFeedStore((state) => state.content);
  console.log('content: ' + content);
  const tags = useFeedStore((state) => state.tag);
  const setContent = useFeedStore((state) => state.setContent);
  const resetFeed = useFeedStore((state) => state.resetFeed);

  const [errors, setErrors] = useState({
    title: false,
    tags: false,
    content: false,
  });

  const { mutate: postFeed, isPending } = usePostFeed();

  const onSubmit = () => {
    const isContentEmpty = (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const textContent = doc.body.textContent?.trim() || '';
      return textContent === '';
    };

    const hasError = {
      title: title.trim() === '',
      tags: tags.length === 0,
      content: isContentEmpty(content),
    };

    setErrors(hasError);

    if (!hasError.title && !hasError.tags && !hasError.content) {
      postFeed(
        { title, tags, content },
        {
          onSuccess: () => {
            console.log('폼 제출 성공:', { title, tags, content });
            resetFeed();
            onClose();
          },
          onError: (error) => {
            console.error('폼 제출 실패:', error);
          },
        }
      );
    } else {
      console.log('폼 검증 실패:', hasError);
    }
  };

  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>{date}</Modal2.Title>
      <Modal2.ModalSubContent>
        <Modal2.ModalInput
          placeholder='제목을 작성해주세요.'
          message={errors.title ? '제목을 입력해주세요.' : ''}
        />
        <InputDropdown />
        {errors.tags && (
          <p className='text-red-600 text-caption2 px-[20px]'>
            태그를 선택해주세요.
          </p>
        )}
      </Modal2.ModalSubContent>
      <Modal2.ModalContent px='40px' py='5px' className='bg-white'>
        <TiptapEditor content={content} setContent={setContent} />
        {errors.content && (
          <p className='text-red-600 text-caption2 absolute'>
            내용을 작성해주세요.
          </p>
        )}
      </Modal2.ModalContent>
      <div className='mb-2 flex flex-row-reverse'>
        <button
          className='bg-close px-1 py-1.5 rounded-[3px] w-fit h-fit text-caption1 text-white'
          onClick={onSubmit}
          disabled={isPending}
        >
          {isPending ? '작성 중...' : '작성하기'}
        </button>
      </div>
    </Modal2>
  );
};

export default PostFeedModal;
