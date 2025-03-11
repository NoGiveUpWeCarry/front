import Button from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import PostHubModal from '@/components/organisms/modals/PostHubModal';
import usePostHubModal from '@/hooks/usePostHubModal';
import { ContentsHubToggle } from '@/components/molecules/hub/ContentsHubToggle';
import HubUnitSelect from '@/components/molecules/hub/HubUnitSelect';
import HubTopRoleSelect from '@/components/molecules/hub/HubTopRoleSelect';

export const HubContentsTop = () => {
  const {
    isModalOpen,
    openPostModal,
    closePostModal,
    handleSubmitConfirmation,
  } = usePostHubModal();
  return (
    <div className='flex flex-col items-start gap-[20px]'>
      <div className='flex w-full justify-between items-center border border-gray-300 rounded-lg p-1'>
        <div className='flex items-center gap-[10px]'>
          <ContentsHubToggle />
          <HubTopRoleSelect />
          <HubUnitSelect />
        </div>
        <Button
          width='90px'
          height='50px'
          variants='filled'
          radius='md'
          className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-md'
          onClick={openPostModal}
        >
          <Plus className='mr-2 w-5 h-5' /> 새 허브
        </Button>
      </div>
      {isModalOpen && (
        <PostHubModal
          onClose={closePostModal}
          onSubmit={handleSubmitConfirmation}
          onRevise={false}
        />
      )}
    </div>
  );
};
