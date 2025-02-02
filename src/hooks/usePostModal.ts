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

  const handleSubmitConfirmation = (onSubmit: () => void) => {
    const confirmSubmit = window.confirm('작성을 완료하시겠습니까?');
    if (confirmSubmit) {
      setIsSubmitted(true);
      onSubmit();
    }
  };

  return {
    isModalOpen,
    isSubmitted,
    setIsSubmitted,
    openPostModal,
    closePostModal,
    handleSubmitConfirmation,
  };
};

export default usePostModal;
