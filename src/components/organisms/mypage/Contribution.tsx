import ContributionBox from '@/components/molecules/ContributionBox';
import useIntroduction from '@/hooks/mypage/useIntroduction.business';

interface IProps {
  clickHandler: {
    onFollowersClick: () => void;
    onFollowingClick: () => void;
    onFeedClick: () => void;
    onApplyClick: () => void;
  };
}

const Contribution = ({ clickHandler }: IProps) => {
  const { profileInfo } = useIntroduction();

  return (
    <div className='flex-1 h-full rounded-[20px] bg-lightgray py-[10px] px-[10px]'>
      <span className='text-[15px] font-medium text-darkgray'>
        PAD Contribution
      </span>
      <div className='grid grid-cols-2 gap-[10px] mt-[15px]'>
        <ContributionBox
          text='👥 팔로워'
          amount={profileInfo?.followerCount!}
          onClick={clickHandler.onFollowersClick}
        />
        <ContributionBox
          text='👥 팔로잉'
          amount={profileInfo?.followingCount!}
          onClick={clickHandler.onFollowingClick}
        />
        <ContributionBox
          text='💬 피드 작성 수'
          amount={profileInfo?.feedCount!}
          onClick={clickHandler.onFeedClick}
        />
        <ContributionBox
          text='💡 지원 수'
          amount={profileInfo?.applyCount!}
          onClick={clickHandler.onApplyClick}
        />
      </div>
    </div>
  );
};

export default Contribution;
