import Button from '@/components/atoms/Button';
import ContributionBox from '@/components/molecules/ContributionBox';

const IntroductionTemplate = () => {
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
            <ContributionBox text='👥 팔로워' amount={199} />
            <ContributionBox text='👥 팔로잉' amount={11} />
            <ContributionBox text='💬 피드 작성 수' amount={199} />
            <ContributionBox text='💡 지원 수' amount={2} />
          </div>
        </div>
      </div>
      {/* <div className='h-[166px]'></div>
      <div className='h-[166px]'></div> */}
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
