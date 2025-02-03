import Modal2 from '@/components/molecules/Modal';
import PostHubContentFirst from '@/components/organisms/modals/PostHubContentFirst';
import PostHubContentSecond from '@/components/organisms/modals/PostHubContentSecond';
import { useState } from 'react';

interface PostHubModalProps {
  onClose: () => void;
  onSubmit: (...arg: any) => void;
  onRevise: boolean;
  projectId?: number;
}

const PostHubModal = ({
  onClose,
  onRevise,
  projectId,
  onSubmit,
}: PostHubModalProps) => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);
  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>{onRevise ? '허브 수정' : '새 허브'}</Modal2.Title>

      {step === 1 && <PostHubContentFirst onNext={goToNextStep} />}
      {step === 2 && (
        <PostHubContentSecond
          onPrevious={goToPreviousStep}
          onSubmit={onSubmit}
          onRevise={onRevise}
          projectId={projectId}
        />
      )}
    </Modal2>
  );
};

export default PostHubModal;
