import { useState } from 'react';
import useFeedStore from '@/store/postFeedStore';

const usePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetFeed = useFeedStore((state) => state.resetFeed);

  const openPostModal = () => {
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    console.log('isSubmitted: ', isSubmitted);
    if (!isSubmitted) {
      const answer = window.confirm(
        '작성중인 피드가 사라집니다. 정말 나가시겠습니까?'
      );
      if (answer) {
        resetFeed();
      }
      setIsModalOpen(!answer);
    } else {
      setIsModalOpen(false);
    }
  };

  return {
    isModalOpen,
    isSubmitted,
    setIsSubmitted,
    openPostModal,
    closePostModal,
  };
};

export default usePostModal;
