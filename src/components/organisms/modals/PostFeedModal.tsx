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
      <div className='flex flex-col'>
        <Modal2.Title>{date}</Modal2.Title>
      </div>
      <div className='flex flex-col w-full gap-[20px]'>
        <div className='flex flex-col w-full'>
          <Modal2.ModalInput
            placeholder='제목을 작성해주세요.'
            message={errors.title ? '제목을 입력해주세요.' : ''}
          />
        </div>
        <div className='flex flex-col w-full'>
          <InputDropdown />
          {errors.tags && (
            <p className='text-red-600 text-[14px]'>태그를 선택해주세요.</p>
          )}
        </div>
        <div className='flex flex-col py-[10px] h-[340px] overflow-y-scroll scrollbar-hide'>
          <TiptapEditor content={content} setContent={setContent} />
          {errors.content && (
            <p className='flex flex-col text-red-600 text-[14px] mt-5 absolute'>
              내용을 작성해주세요.
            </p>
          )}
        </div>

        <div className='flex w-full justify-end'>
          <button
            className='bg-close px-[15px] py-[10px] rounded-[5px] text-[12px] text-white'
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? '작성 중...' : '작성하기'}
          </button>
        </div>
      </div>
    </Modal2>
  );
};

export default PostFeedModal;
