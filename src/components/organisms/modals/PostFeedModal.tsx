import InputDropdown from '@/components/molecules/InputDropdown';
import Modal2 from '@/components/molecules/Modal';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import useFeedStore from '@/store/postFeedStore';
import {
  useFetchFeed,
  usePostFeed,
  usePutFeed,
} from '@/hooks/queries/feed.query';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePostModal from '@/hooks/usePostModal';
import { querySuccessHandler } from '@/utils/querySuccessHandler';

interface PostFeedModalProps {
  onClose: () => void;
  onSubmit: () => void;
  onRevise?: boolean;
}

const PostFeedModal = ({ onClose, onSubmit, onRevise }: PostFeedModalProps) => {
  const {
    title,
    content,
    tag: tags,
    setContent,
    setTitle,
    setTag,
    resetFeed,
  } = useFeedStore();

  const { id } = useParams<{ id: string }>();
  const {
    data: feedData,
    isSuccess,
    refetch,
  } = useFetchFeed(Number(id), {
    enabled: false,
  });

  const { handleSubmitConfirmation } = usePostModal();

  useEffect(() => {
    if (onRevise && id) {
      refetch();
    }
  }, [onRevise, id, refetch]);

  useEffect(() => {
    if (onRevise && isSuccess && feedData) {
      setTitle(feedData.post.title ?? '');
      setContent(feedData.post.content ?? '');
      setTag(feedData.post.tags ?? []);
    }
  }, [onRevise, isSuccess, feedData, setTitle, setContent, setTag]);

  const { mutate: postFeed, isPending: isPostLoading } = usePostFeed();
  const { mutate: putFeed, isPending: isPutLoading } = usePutFeed();

  const [errors, setErrors] = useState({
    title: false,
    tags: false,
    content: false,
  });

  const handleSubmit = () => {
    const plainText = content.replace(/<[^>]*>?/g, '').trim() === '';
    const hasError = {
      title: title.trim() === '',
      tags: tags.length === 0,
      content: plainText,
    };
    setErrors(hasError);
    if (!hasError.title && !hasError.tags && !hasError.content) {
      if (onRevise && id) {
        onSubmit();
        putFeed(
          { id: Number(id), title, tags, content },
          {
            onSuccess: () => {
              resetFeed();
              onClose();
            },
            onError: (error) => {
              console.error('피드 수정 중 오류 발생:', error);
            },
          }
        );
      } else {
        onSubmit();
        postFeed(
          { title, tags, content },
          {
            onSuccess: () => {
              resetFeed();
              onClose();
              querySuccessHandler('feeds', [true, 'null']);
            },
            onError: (error) => {
              console.error('폼 제출 실패:', error);
            },
          }
        );
      }
    } else {
      console.log('폼 검증 실패:', hasError);
    }
  };

  return (
    <Modal2 onClose={onClose}>
      <div className='flex flex-col'>
        <Modal2.Title>피드 작성</Modal2.Title>
      </div>
      <div className='flex flex-col w-full gap-[20px]'>
        <div className='flex flex-col w-full'>
          <Modal2.ModalInput
            placeholder='제목을 작성해주세요.'
            message={errors.title ? '제목을 입력해주세요.' : ''}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-full'>
          <InputDropdown />
          {errors.tags && (
            <p className='text-red-600 text-[14px]'>태그를 선택해주세요.</p>
          )}
        </div>
        <div className='flex flex-col h-[440px] overflow-y-scroll scrollbar-hide'>
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
            onClick={() => handleSubmitConfirmation(handleSubmit)}
            disabled={isPostLoading || isPutLoading}
          >
            {isPostLoading || isPutLoading ? '작성 중...' : '작성하기'}
          </button>
        </div>
      </div>
    </Modal2>
  );
};

export default PostFeedModal;
