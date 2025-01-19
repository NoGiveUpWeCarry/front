import ContributionBox from '@/components/molecules/ContributionBox';
import { useState } from 'react';
import AddProjectModal from '@/components/organisms/modals/AddProjectModal';
import FollowersModal from '@/components/organisms/modals/FollowersModal';
import AddMusicModal from '@/components/organisms/modals/AddMusicModal';
import { useMyPageTabsStore } from '@/store/myTabsStore';
import { useShallow } from 'zustand/shallow';
import { useGetProfileInfo } from '@/hooks/queries/mypage/introduce';
import { useMyPageStore } from '@/store/mypageStore';
import { STATUS_EMOJI } from '@/constants/userStatus';
import Button from '@/components/atoms/Button';
import WorkList from '@/components/organisms/WorkList';
import { ShortProjects } from '@/types/mypage.type';
import { useAddProjectFormStore } from '@/store/addProjectFormStore';

const IntroductionTemplate = () => {
  const [setActiveTab] = useMyPageTabsStore(
    useShallow((state) => [state.setActiveTab])
  );
  const [isMyPage, role] = useMyPageStore(
    useShallow((state) => [state.isMyPage, state.role])
  );
  const { setFormData, resetFormData } = useAddProjectFormStore(
    useShallow((state) => state)
  );

  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState<
    'followers' | 'following' | null
  >(null);

  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const { data: profileInfo } = useGetProfileInfo(ownerId);
  // const { mutate: deleteWork } = useDeleteMusicWork(ownerId);

  // const PROJECT_LIMIT = {
  //   Designer: 4,
  //   Artist: 3,
  //   Programmer: 2,
  // };

  const handleProjectUpdate = (work: ShortProjects) => {
    if (!work) return;
    resetFormData();

    // TODO: 아이디 수정되면 추가하기
    // setFormData('id', work.id);
    setFormData('title', work.title);
    setFormData('description', work.description);
    ['Github', 'Web', 'Android', 'IOS'].map((item) =>
      setFormData(
        item.toLowerCase(),
        work.links.filter((el) => el.type === item)[0]
          ? work.links.filter((el) => el.type === item)[0].url
          : ''
      )
    );
    setIsAddProjectOpen(true);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddProjectOpen(true);
  };

  return (
    <>
      {role === 'Artist' ? (
        <AddMusicModal
          isOpen={isAddProjectOpen}
          onClose={() => {
            setIsAddProjectOpen(false);
            resetFormData();
          }}
        />
      ) : (
        <AddProjectModal
          isOpen={isAddProjectOpen}
          onClose={() => {
            setIsAddProjectOpen(false);
            resetFormData();
          }}
        />
      )}
      <FollowersModal
        isOpen={!!isFollowersOpen}
        onClose={() => setIsFollowersOpen(null)}
        type={isFollowersOpen!}
      />
      <div className='h-[250px] py-[10px] flex items-center gap-[17px]'>
        <div className='flex flex-col gap-[10px] bg-status w-[230px] h-[230px] rounded-[20px] py-4 px-4 relative'>
          <span className='text-[15px] font-semibold text-white'>
            {role} Status
          </span>
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center'>
            <span className='text-[50px]'>
              {STATUS_EMOJI[profileInfo?.status as keyof typeof STATUS_EMOJI]}
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
              onClick={() => setIsFollowersOpen('followers')}
            />
            <ContributionBox
              text='👥 팔로잉'
              amount={profileInfo?.followingCount!}
              onClick={() => setIsFollowersOpen('following')}
            />
            <ContributionBox
              text='💬 피드 작성 수'
              amount={profileInfo?.postCount!}
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
            if (typeof work === 'string') {
              if (work.includes('soundcloud')) {
                return (
                  <WorkList.SoundCloud
                    url={work}
                    // TODO: 여기 수정하기
                    // onDelete={() => deleteWork(url)}
                    onDelete={() => {}}
                  />
                );
              } else if (work.includes('spotify')) {
                return <WorkList.Spotify url={work} onDelete={() => {}} />;
              }
            }
            return null;
          })}
        </WorkList>
      ) : (
        <WorkList>
          {role === 'Programmer' && (
            <WorkList.Github githubId={profileInfo?.githubUsername!} />
          )}
          <WorkList.Projects>
            {profileInfo?.works?.map((work, i) => {
              if (typeof work === 'object') {
                return (
                  <WorkList.ProjectItem
                    key={`${work.title}-${i}`}
                    onClickUpdate={() => handleProjectUpdate(work)}
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
            onClick={handleOpenModal}
          >
            + 작업물 추가하기
          </Button>
        </div>
      )}
    </>
  );
};

export default IntroductionTemplate;
