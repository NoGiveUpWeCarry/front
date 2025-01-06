import Button from '@/components/atoms/Button';
import ContributionBox from '@/components/molecules/ContributionBox';
import MyPageProjectCard from '@/components/molecules/MyPageProjectCard';
import { useTabsStore } from '@/store/tabStore';
import { useShallow } from 'zustand/shallow';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

const IntroductionTemplate = () => {
  const [setActiveTab] = useTabsStore(
    useShallow((state) => [state.setActiveTab])
  );

  const githubId = 'chaeyun-sim';

  return (
    <>
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
            <ContributionBox text='👥 팔로워' amount={199} onClick={() => {}} />
            <ContributionBox text='👥 팔로잉' amount={11} onClick={() => {}} />
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

      {/* 작업물 목록 */}
      {githubId ? (
        <Link
          to={`https://github.com/${githubId}`}
          className='flex justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4'
        >
          <GitHubCalendar
            username={githubId}
            blockSize={9.4}
            fontSize={11}
            showWeekdayLabels
            blockMargin={3.2}
          />
        </Link>
      ) : (
        <div className='flex justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4 h-[158px]'>
          hi
        </div>
      )}
      <div className='grid grid-cols-2 gap-5'>
        <MyPageProjectCard />
        <MyPageProjectCard />
        <MyPageProjectCard />
        <MyPageProjectCard />
      </div>
      <div className='flex items-center justify-center h-9'>
        <Button
          width='235px'
          height='36px'
          variants='filled'
          radius='md'
          className='!text-black border border-[#DCDCDC] bg-white'
        >
          + 작업물 추가하기
        </Button>
      </div>
    </>
  );
};

export default IntroductionTemplate;
