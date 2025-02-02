import Button from '@/components/atoms/Button';
import { useFollow } from '@/hooks/queries/follow.query';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import clsx from 'clsx';

interface IProps {
  isFollowing: boolean;
  nickname: string;
  userId: number;
  onRefetch: () => void;
}

const FollowButton = ({ userId, isFollowing, nickname, onRefetch }: IProps) => {
  const { mutate } = useFollow();

  const handleClick = () => {
    mutate(
      { targetId: userId },
      {
        onSuccess: () => {
          querySuccessHandler('profile-header-info', [nickname]);
          onRefetch();
        },
      }
    );
  };

  return (
    <Button
      width='92px'
      height='29px'
      radius='lg'
      variants='filled'
      className={clsx(
        isFollowing
          ? '!text-[#373A3A] bg-lightgray'
          : 'text-white bg-[#FF7E5F]',
        'text-[15px]'
      )}
      onClick={handleClick}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
