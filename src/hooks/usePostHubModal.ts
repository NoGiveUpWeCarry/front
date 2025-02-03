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
    // const confirmSubmit = window.confirm('작성을 완료하시겠습니까?');
    // console.log('handleSubmitConfirmation');
    // if (confirmSubmit) {
    console.log('handleSubmitConfirmation');
    setIsSubmitted(true);
    if (typeof onSubmit === 'function') onSubmit();
    setIsModalOpen(false);
    // }
  };
  const closePostModal = () => {
    resetHub();
    setIsModalOpen(false);
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
