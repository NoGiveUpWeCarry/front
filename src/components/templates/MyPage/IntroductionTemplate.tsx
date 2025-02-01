import { STATUS_EMOJI } from '@/constants/userStatus';
import ContributionBox from '@/components/molecules/ContributionBox';
import AddProjectModal from '@/components/organisms/modals/AddProjectModal';
import FollowersModal from '@/components/organisms/modals/FollowersModal';
import AddMusicModal from '@/components/organisms/modals/AddMusicModal';
import Button from '@/components/atoms/Button';
import WorkList from '@/components/organisms/WorkList';
import useIntroduction from '@/hooks/mypage/useIntroduction.business';
import useIntroductionUI from '@/hooks/mypage/useIntroduction.ui';

const IntroductionTemplate = () => {
  const {
    profileInfo,
    deleteMusic,
    isLoading,
    handleProjectUpdate,
    resetProjectForm,
  } = useIntroduction();
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
        <div className='flex-1 h-full rounded-[20px] bg-lightgray py-[10px] px-[10px]'>
          <span className='text-[15px] font-medium text-darkgray'>
            PAD Contribution
          </span>
          <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
            <ContributionBox
              text='👥 팔로워'
              amount={profileInfo?.followerCount!}
              onClick={() => followersModal.set('followers')}
            />
            <ContributionBox
              text='👥 팔로잉'
              amount={profileInfo?.followingCount!}
              onClick={() => followersModal.set('following')}
            />
            <ContributionBox
              text='💬 피드 작성 수'
              amount={profileInfo?.feedCount!}
              onClick={() => setActiveTab('피드')}
            />
            <ContributionBox
              text='💡 지원 수'
              amount={profileInfo?.applyCount!}
              onClick={() => setActiveTab('커넥션 허브')}
            />
          </div>
        </div>
      </div>
      {role === 'Artist' ? (
        <WorkList>
          {profileInfo?.works?.map((work) => {
            if (isMusicWorkValid(work)) {
              if (work.musicUrl.includes('soundcloud')) {
                return (
                  <WorkList.SoundCloud
                    url={work.musicUrl}
                    onDelete={() => deleteMusic({ workId: work.musicId })}
                  />
                );
              } else if (work.musicUrl.includes('spotify')) {
                return (
                  <WorkList.Spotify url={work.musicUrl} onDelete={() => {}} />
                );
              }
            }
            return null;
          })}
        </WorkList>
      ) : (
        <WorkList>
          {role === 'Programmer' && (
            <WorkList.Github
              githubId={profileInfo?.githubUsername!}
              loading={isLoading}
            />
          )}
          <WorkList.Projects>
            {profileInfo?.works?.map((work, i) => {
              if (!isMusicWorkValid(work)) {
                return (
                  <WorkList.ProjectItem
                    key={`${work.title}-${i}`}
                    onClickUpdate={() => handleProjectUpdate(work, handleWorks)}
                    {...work}
                  />
                );
              }
              return null;
            })}
          </WorkList.Projects>
        </WorkList>
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
