import Modal2 from '@/components/molecules/Modal';
import PostHubContentFirst from '@/components/organisms/modals/PostHubContentFirst';
import PostHubContentSecond from '@/components/organisms/modals/PostHubContentSecond';
import { useState } from 'react';

interface PostHubModalProps {
  onClose: () => void;
}

const PostHubModal = ({ onClose }: PostHubModalProps) => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);
  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>새 허브</Modal2.Title>
      {step === 1 && <PostHubContentFirst onNext={goToNextStep} />}
      {step === 2 && (
        <PostHubContentSecond onPrevious={goToPreviousStep} onClose={onClose} />
      )}
    </Modal2>
  );
};

export default PostHubModal;
