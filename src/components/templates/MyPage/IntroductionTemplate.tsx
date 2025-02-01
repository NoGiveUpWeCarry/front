import { STATUS_EMOJI } from '@/constants/userStatus';
import AddProjectModal from '@/components/organisms/modals/AddProjectModal';
import FollowersModal from '@/components/organisms/modals/FollowersModal';
import AddMusicModal from '@/components/organisms/modals/AddMusicModal';
import Button from '@/components/atoms/Button';
import useIntroduction from '@/hooks/mypage/useIntroduction.business';
import useIntroductionUI from '@/hooks/mypage/useIntroduction.ui';
import ArtistWorkList from '@/components/molecules/mypage/ArtistWorkList';
import ProgrammerWorkList from '@/components/molecules/mypage/ProgrammerWorkList';
import { roleItemsKey } from '@/constants/hub/roleItems';
import Contribution from '@/components/organisms/mypage/Contribution';

const IntroductionTemplate = () => {
  const { profileInfo, resetProjectForm } = useIntroduction();
  const {
    addProjectModal,
    followersModal,
    isMusicWorkValid,
    isForUpdate,
    setIsForUpdate,
    tabsStore: { setActiveTab },
    mypageStore: { role, isMyPage },
  } = useIntroductionUI();

  const handleWorks = () => {
    setIsForUpdate(true);
    addProjectModal.open();
  };

  const modalHandlers = {
    openAddProject: addProjectModal.open,
    closeAddProject: () => {
      addProjectModal.close();
      resetProjectForm();
    },
  };

  return (
    <>
      {role === 'Artist' ? (
        <AddMusicModal
          isOpen={addProjectModal.isOpen}
          onClose={modalHandlers.closeAddProject}
        />
      ) : (
        <AddProjectModal
          isOpen={addProjectModal.isOpen}
          onClose={modalHandlers.closeAddProject}
          isForUpdate={isForUpdate}
        />
      )}
      <FollowersModal
        isOpen={!!followersModal.isOpen}
        onClose={followersModal.close}
        type={followersModal.isOpen!}
      />
      <div className='h-[250px] py-[10px] flex items-center gap-[17px]'>
        <div className='flex flex-col gap-[10px] bg-status w-[230px] h-[230px] rounded-[20px] py-4 px-4 relative'>
          <span className='text-[15px] font-semibold text-white'>
            {role} Status
          </span>
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center'>
            <span className='text-[50px]'>
              {STATUS_EMOJI.find((el) =>
                el.label.startsWith(profileInfo?.status as string)
              )?.label.slice(-2)}
            </span>
            <span className='text-white'>{profileInfo?.status}</span>
          </div>
        </div>
        <Contribution
          clickHandler={{
            onFollowersClick: () => followersModal.set('followers'),
            onFollowingClick: () => followersModal.set('following'),
            onFeedClick: () => setActiveTab('피드'),
            onApplyClick: () => setActiveTab('커넥션 허브'),
          }}
        />
      </div>
      {role === 'Artist' ? (
        <ArtistWorkList isMusicWorkValid={isMusicWorkValid} />
      ) : (
        <ProgrammerWorkList
          isMusicWorkValid={isMusicWorkValid}
          role={role as roleItemsKey}
          handleWorks={handleWorks}
        />
      )}
      {isMyPage && profileInfo?.works && profileInfo.works.length < 4 && (
        <div className='flex items-center justify-center h-9'>
          <Button
            width='235px'
            height='36px'
            variants='filled'
            radius='md'
            className='!text-black border border-[#DCDCDC] bg-white'
            onClick={addProjectModal.open}
          >
            + 작업물 추가하기
          </Button>
        </div>
      )}
    </>
  );
};

export default IntroductionTemplate;
