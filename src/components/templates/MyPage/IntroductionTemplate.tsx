import Button from '@/components/atoms/Button';
import ContributionBox from '@/components/molecules/ContributionBox';
import { useTabsStore } from '@/store/tabStore';
import { useShallow } from 'zustand/shallow';
import WorkList from '@/components/organisms/WorkList';
import { useState } from 'react';
import AddProjectModal from '@/components/organisms/modals/AddProjectModal';
import FollowersModal from '@/components/organisms/modals/FollowersModal';
import { useFollowsStore } from '@/store/followsStore';
import AddMusicModal from '@/components/organisms/modals/AddMusicModal';

const IntroductionTemplate = () => {
  const [setActiveTab] = useTabsStore(
    useShallow((state) => [state.setActiveTab])
  );
  const [setFollows] = useFollowsStore(
    useShallow((state) => [state.setFollows])
  );

  const [role] = useState<'Programmer' | 'Designer' | 'Artist'>('Artist');
  const [countWorks, setCountWorks] = useState(0);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);

  const PROJECT_LIMIT = {
    Designer: 4,
    Artist: 3,
    Programmer: 2,
  };

  const handleFollow = (type: 'wer' | 'ing') => {
    if (type === 'wer') {
      // 로직
      // setFollows()
    } else {
      // 로직
      // setFollows()
    }
    setIsFollowersOpen(true);
  };

  return (
    <>
      {isAddProjectOpen &&
        (role === 'Artist' ? (
          <AddMusicModal onClose={() => setIsAddProjectOpen(false)} />
        ) : (
          <AddProjectModal onClose={() => setIsAddProjectOpen(false)} />
        ))}
      {isFollowersOpen && (
        <FollowersModal onClose={() => setIsFollowersOpen(false)} />
      )}
      <div className='h-[250px] py-[10px] flex items-center gap-[17px]'>
        <div className='flex flex-col gap-[10px] bg-status w-[230px] h-[230px] rounded-[20px] py-4 px-4 relative'>
          <span className='text-[15px] font-semibold text-white'>
            Programmer Status
          </span>
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center'>
            <span className='text-[50px]'>💻</span>
            <span className='text-white'>작업중</span>
          </div>
        </div>
        <div className='flex-1 h-full rounded-[20px] bg-lightgray py-[10px] px-[10px]'>
          <span className='text-[15px] font-medium text-darkgray'>
            PAD Contribution
          </span>
          <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
            <ContributionBox
              text='👥 팔로워'
              amount={199}
              onClick={() => handleFollow('wer')}
            />
            <ContributionBox
              text='👥 팔로잉'
              amount={11}
              onClick={() => handleFollow('ing')}
            />
            <ContributionBox
              text='💬 피드 작성 수'
              amount={199}
              onClick={() => setActiveTab('피드')}
            />
            <ContributionBox
              text='💡 지원 수'
              amount={2}
              onClick={() => setActiveTab('커넥션 허브')}
            />
          </div>
        </div>
      </div>

      {/* 프로젝트 예시 시작 */}
      {role == 'Artist' && (
        <WorkList>
          <WorkList.SoundCloud url='https://soundcloud.com/rudeadyet/ony-if-you-stayed?in=sc-playlists-kr/sets/dreamy-folk&si=fe25f7c999a844678e9ce1a0121b6061&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' />
          <WorkList.Spotify url='https://open.spotify.com/playlist/37i9dQZF1E4A4Wx1igYfpM?si=STijBj6ET82XA_jOJKnUzQ' />
          {/* <WorkList.Spotify url='https://open.spotify.com/artist/6YVMFz59CuY7ngCxTxjpxE?si=_sK-4EzWS8WDKMbLJwKjvQ' /> */}
        </WorkList>
      )}
      {role == 'Programmer' && (
        <WorkList>
          <WorkList.Github />
          <WorkList.Projects>
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
          </WorkList.Projects>
        </WorkList>
      )}
      {role == 'Designer' && (
        <WorkList>
          <WorkList.Projects>
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
            <WorkList.ProjectItem
              url=''
              platforms={[]}
              title=''
              description=''
            />
          </WorkList.Projects>
        </WorkList>
      )}
      {/* 프로젝트 예시 끝 */}

      {countWorks < PROJECT_LIMIT[role] && (
        <div className='flex items-center justify-center h-9'>
          <Button
            width='235px'
            height='36px'
            variants='filled'
            radius='md'
            className='!text-black border border-[#DCDCDC] bg-white'
            onClick={() => setIsAddProjectOpen(true)}
          >
            + 작업물 추가하기
          </Button>
        </div>
      )}
    </>
  );
};

export default IntroductionTemplate;
