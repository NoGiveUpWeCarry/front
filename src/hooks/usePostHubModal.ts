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
    setIsSubmitted(true);
    if (typeof onSubmit === 'function') onSubmit();
    setIsModalOpen(false);
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
