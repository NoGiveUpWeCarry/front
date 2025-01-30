import useHubStore from '@/store/postHubStore';
import { useState } from 'react';

const usePostHubModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetHub = useHubStore((state) => state.resetHub);

  const openPostModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitConfirmation = (onSubmit: () => void) => {
    const confirmSubmit = window.confirm('작성을 완료하시겠습니까?');
    if (confirmSubmit) {
      setIsSubmitted(true);
      onSubmit();
    }
  };
  const closePostModal = () => {
    console.log('isSubmitted: ', isSubmitted);
    if (!isSubmitted) {
      const answer = window.confirm(
        '작성중인 허브가 사라집니다. 정말 나가시겠습니까?'
      );
      if (answer) {
        resetHub();
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
    handleSubmitConfirmation,
  };
};

export default usePostHubModal;
