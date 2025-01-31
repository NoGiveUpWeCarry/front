import Button from '@/components/atoms/Button';
import { useFollow } from '@/hooks/queries/follow.query';
import clsx from 'clsx';

interface IProps {
  isFollowing: boolean;
  nickname: string;
  userId: number;
}

const FollowButton = ({ userId, isFollowing, nickname }: IProps) => {
  const { mutate } = useFollow(nickname);
  console.log(userId, nickname);

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
      onClick={() => mutate({ targetId: userId })}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
